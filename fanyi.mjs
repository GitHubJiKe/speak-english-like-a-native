const APP_ID = "20240219001966997";
const APP_KEY = "wihILJ4pkBH6h1aQg3rK";

function genSign(word) {
    // appid+q+salt+密钥的MD5值
    return CryptoJS.MD5(`${APP_ID}${word}${Date.now()}${APP_KEY}`).toString();
}
export function jsonp(url, callbackName = "callback") {
    return new Promise((resolve, reject) => {
        // 创建全局回调函数
        // @ts-ignore
        window[callbackName] = function (data) {
            resolve(data);
            // 清理
            document.body.removeChild(script);
            // @ts-ignore
            delete window[callbackName];
        };

        // 创建 script 标签并添加到页面
        const script = document.createElement("script");
        script.src = `${url}&callback=${callbackName}`;
        document.body.appendChild(script);

        // 设置超时处理
        script.onerror = function () {
            reject(new Error(`JSONP request to ${url} failed`));
            // 清理
            document.body.removeChild(script);
            // @ts-ignore
            delete window[callbackName];
        };
    });
}
export async function translate(word) {
    const API = "https://fanyi-api.baidu.com/api/trans/vip/translate";
    const query = `q=${word}&from=en&to=zh&appid=${APP_ID}&salt=${Date.now()}&sign=${genSign(
        word,
    )}`;
    const res = await jsonp(`${API}?${query}`, "callback");

    return res;
}
