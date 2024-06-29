import { readEnglish } from "./reading.mjs";
const playingMap = {};

export function createIcon(content) {
    const icon = document.createElement("img");
    icon.className = "icon";
    icon.src = "/unplay.svg";
    const onStart = () => {
        playingMap[content] = true;
    };
    const onEnd = () => {
        playingMap[content] = false;
        icon.src = "/unplay.svg";
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
            icon.src = "/playing.svg";
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
