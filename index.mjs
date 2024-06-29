import { fanyiSelection } from "./fanyi.mjs";
import { createIcon } from "./icon.mjs";

fanyiSelection();

function addIcons() {
    document.querySelectorAll("p").forEach((ele) => {
        const icon = createIcon(ele.innerText);
        ele.appendChild(icon);
    });
}

addIcons();
