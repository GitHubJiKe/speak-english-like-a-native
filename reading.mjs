export const voices = [
    "UK English Female",
    "UK English Male",
    "US English Female",
    // "US English Male",
];

const defaultReadConfig = {
    pitch: 1, // 音高
    rate: 1, // 频率
    volume: 1, // 音量
};
/**
 *
 * @param {*} content english content
 * @param {*} callbackConfig  {onstart:function,onend:function}
 */
export function readEnglish(content, callbackConfig) {
    const voice = voices[1];
    const config = callbackConfig
        ? { ...callbackConfig, ...defaultReadConfig }
        : defaultReadConfig;
    responsiveVoice.speak(content, voice, config);
}
