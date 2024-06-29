import { readEnglish } from "./reading.mjs";
import { getRoutePath } from "./util.mjs";
const playingMap = {};

export function createIcon(content) {
    const routePath = getRoutePath();
    const UNPLAY_ICON_URL = `${routePath}unplay.svg`;
    const PLAYING_ICON_URL = `${routePath}playing.svg`;
    const icon = document.createElement("img");
    icon.className = "icon";
    icon.src = UNPLAY_ICON_URL;
    const onStart = () => {
        playingMap[content] = true;
    };
    const onEnd = () => {
        playingMap[content] = false;
        icon.src = UNPLAY_ICON_URL;
    };
    icon.addEventListener("click", () => {
        const existPlaying = Object.keys(playingMap)
            .map((v) => playingMap[v])
            .some((v) => v === true);

        if (
            (playingMap[content] === undefined ||
                playingMap[content] === false) &&
            !existPlaying
        ) {
            readEnglish(content, {
                onend: onEnd,
                onstart: onStart,
            });
            icon.src = PLAYING_ICON_URL;
        } else if (
            playingMap[content] === true &&
            responsiveVoice.isPlaying()
        ) {
            responsiveVoice.cancel();
            onEnd();
        }
    });

    return icon;
}
