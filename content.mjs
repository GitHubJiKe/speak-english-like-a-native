import { catalogue } from "./data.mjs";
import { fanyiSelection } from "./fanyi.mjs";
import { createIcon } from "./icon.mjs";

function getCurrentContent() {
    return catalogue.find(
        (item) => item.id === location.search.replace("?id=", ""),
    );
}

const current = getCurrentContent();

function setDocTitle() {
    if (current) {
        document.title = current.en;
    }
}

function setPageTitle() {
    if (current) {
        document.querySelector("h1").innerText = current.en;
        document.querySelector("h2").innerText = current.zh;
    }
}

function setDialog() {
    if (current) {
        const { dialogue } = current;
        const dialogueEle = document.querySelector("#dialogue");

        dialogue.forEach((item) => {
            const { name, zh, sentences } = item;
            const nameEle = document.createElement("div");
            nameEle.innerText = name;
            nameEle.className = "dialouge-name";
            const contentEleList = sentences.map((v) => {
                const { content, isBold, zh } = v;
                const contentEle = document.createElement("label");
                contentEle.innerText = content;
                if (isBold) {
                    contentEle.className = "bold-text highlight";
                    contentEle.title = zh;
                }

                return contentEle;
            });

            const sencenceEle = document.createElement("p");

            sencenceEle.className = "sentence";
            const contentEle = document.createElement("div");
            contentEle.className = "content";
            contentEle.setAttribute("data-zh", zh);
            contentEle.append(...contentEleList);
            const icon = createIcon(contentEle.innerText);
            sencenceEle.append(nameEle, contentEle, icon);
            dialogueEle.appendChild(sencenceEle);
        });
    }
}

function setVocabulary() {
    if (current) {
        const { vocabulary } = current;
        const vocabularyEle = document.querySelector("#vocabulary");
        const vocabularyItems = vocabulary.map((item) => {
            const { phrases, meaning } = item;
            const phrasesELe = document.createElement("div");
            phrasesELe.innerText = phrases;
            phrasesELe.className = "phrases bold-text";
            const meaningEle = document.createElement("div");
            meaningEle.innerText = meaning;
            meaningEle.className = "meaning";
            const icon = createIcon(`${phrases}:${meaning}`);
            meaningEle.appendChild(icon);
            const container = document.createElement("p");
            container.className = "vocabulary-item";
            container.append(phrasesELe, meaningEle);

            return container;
        });

        vocabularyEle.append(...vocabularyItems);
    }
}

function setExercise() {
    if (current) {
        const { exercise } = current;
        const exerciseEle = document.querySelector("#exercise");
        const exerciseELes = exercise.map((item, idx) => {
            const labelElesAndTexts = item.map((v) => {
                if (v.startsWith("${") && v.endsWith("}")) {
                    const match = v.match(/\${([\s\S]*?)}/);
                    const blankEle = document.createElement("div");
                    blankEle.className = "blank";
                    blankEle.setAttribute("contenteditable", "true");
                    if (match && match[1]) {
                        blankEle.setAttribute("data-answer", match[1]);
                    }
                    return { ele: blankEle, text: match[1] };
                }
                const labelEle = document.createElement("text");
                labelEle.innerText = v;
                return { ele: labelEle, text: v };
            });

            const exerciseELe = document.createElement("p");
            exerciseELe.setAttribute("data-idx", idx + 1);
            exerciseELe.className = "exercise-item";
            const labelEles = labelElesAndTexts.map((v) => v.ele);
            const content = labelElesAndTexts.map((v) => v.text).join(" ");
            const icon = createIcon(content);
            exerciseELe.append(...labelEles, icon);

            return exerciseELe;
        });

        exerciseEle.append(...exerciseELes);
    }
}

function checkAnswers() {
    document.querySelector("#checkAnswers").addEventListener("click", () => {
        document.querySelectorAll(".blank").forEach((ele) => {
            const result = ele.textContent;
            const answer = ele.getAttribute("data-answer");
            if (!result) {
                return ele.classList.add("empty");
            }

            ele.classList.remove("empty");

            if (result === answer) {
                ele.classList.remove("incorrect");
                ele.classList.add("correct");
            } else {
                ele.classList.remove("correct");
                ele.classList.add("incorrect");
            }
        });
    });
}
const getId = () => Number(location.search.replace(QUERY_FIELD, ""));
const QUERY_FIELD = "?id=";
function nextSet() {
    document.querySelector("#nextSet").addEventListener("click", () => {
        const id = getId();
        if (id === 100) {
            return alert("Already Last One!");
        }
        location.replace(
            `${location.origin}${location.pathname}${QUERY_FIELD}${id + 1}`,
        );
    });
}
function previousSet() {
    document.querySelector("#previousSet").addEventListener("click", () => {
        const id = getId();
        if (id === 1) {
            return alert("Already First One!");
        }
        location.replace(
            `${location.origin}${location.pathname}${QUERY_FIELD}${id - 1}`,
        );
    });
}

setDocTitle();
setPageTitle();
try {
    setDialog();
    setVocabulary();
    setExercise();
} catch (error) {
    console.error(error);
}
checkAnswers();
fanyiSelection();
nextSet();
previousSet();
