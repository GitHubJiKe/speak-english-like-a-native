import { catalogue } from "./data.mjs";

import { fanyiSelection } from "./fanyi.mjs";

fanyiSelection();

function renderCatalogue() {
    const catalogueEle = document.querySelector("#Catalogue");
    catalogue.forEach((item, idx) => {
        const pEle = document.createElement("a");
        const routePath = location.origin.includes("localhost")
            ? "/"
            : "/speak-english-like-a-native/";
        pEle.href = `${routePath}content?id=${item.id}`;
        pEle.className = "catalogue";
        pEle.innerHTML = `<div style="margin-right:1rem;">Set(${
            idx + 1
        })</div><div class="english">${item.en}</div><div class="chinese">${
            item.zh
        }</div>`;
        catalogueEle.append(pEle);
    });
}

renderCatalogue();
