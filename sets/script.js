const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

const workbook = xlsx.readFile(path.join(__dirname, "./sets.xls"));
const importsArr = [];
const exportNames = [];

workbook.SheetNames.forEach((name) => {
    const worksheet = workbook.Sheets[name];
    const jsonObj = xlsx.utils.sheet_to_json(worksheet);
    const res = {
        en: "",
        zh: "",
        id: Number(name.replace("Sheet", "")),
        dialogue: [],
        vocabulary: [],
        exercise: [],
    };
    jsonObj.forEach((item, idx) => {
        const { Title, Dialogue, Vocabulary, Exercise, Answer } = item;
        if (Title && idx === 0) {
            res.en = Title;
        }
        if (Title && idx === 1) {
            res.zh = Title;
        }
        if (Dialogue)
            res.dialogue.push(
                Dialogue.split(":").map((v) => v.replace(/\n/g, " ")),
            );
        if (Vocabulary) res.vocabulary.push(Vocabulary.split(":"));
        if (Exercise && Answer) {
            const dotLen = (Exercise.replace(/\./g, "").match(/…/g) || [])
                .length;
            let splitStr = "";
            for (let index = 0; index < dotLen; index++) {
                splitStr += "…";
            }
            const [start, end] = Exercise.replace(/\./g, "").split(splitStr);
            res.exercise.push(
                [
                    start.replace(/\n/g, " "),
                    "${" + Answer + "}",
                    end ? end.replace(/\n/g, " ") : "",
                ].filter((v) => !!v),
            );
        }
    });

    const code = `export const set${res.id} = ${JSON.stringify(res)};`;

    fs.writeFileSync(path.join(__dirname, `set${res.id}.mjs`), code);
    importsArr.push(`import { set${res.id} } from "./sets/set${res.id}.mjs"`);
    exportNames.push(`set${res.id}`);
});
// export const catalogue = [set1, set2];

fs.writeFileSync(
    path.join(__dirname, "../data.mjs"),
    importsArr.join("\n") +
        "\n" +
        `export const catalogue = [${exportNames.join(",")}]`,
);
