const xlsx = require("xlsx")
const path = require("path")
const fs = require('fs')

const workbook = xlsx.readFile(path.join(__dirname, './sets.xls'))
workbook.SheetNames.forEach(name => {
    const worksheet = workbook.Sheets[name]
    const jsonObj = xlsx.utils.sheet_to_json(worksheet)
    const res = {
        en: "",
        zh: "",
        id: Number(name.replace('Sheet', '')),
        dialogue: [],
        vocabulary: [],
        exercise: []
    }
    jsonObj.forEach((item, idx) => {
        const { Title, Dialogue, Vocabulary, Exercise, Answer } = item;
        if (Title && idx === 0) {
            res.en = Title
        }
        if (Title && idx === 1) {
            res.zh = Title
        }
        if (Dialogue) res.dialogue.push(Dialogue.split(':'))
        if (Vocabulary) res.vocabulary.push(Vocabulary.split(':'))
        if (Exercise && Answer) {
            const dotLen = (Exercise.replace(/\./g, '').match(/…/g) || []).length;
            let splitStr = ''
            for (let index = 0; index < dotLen; index++) {
                splitStr += '…'
            }
            const [start, end] = Exercise.replace(/\./g, '').split(splitStr)
            res.exercise.push([start, '${' + Answer + "}", end])
        }
    })


    const code = `export const set${res.id} = ${JSON.stringify(res)};`


    fs.writeFileSync(path.join(__dirname, `set${res.id}.mjs`), code)
})