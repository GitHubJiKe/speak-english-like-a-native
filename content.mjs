import { catalogue } from './data.mjs'


function getCurrentContent() {
    return catalogue.find(item => item.id === location.search.replace('?id=', ''))
}

const current = getCurrentContent()

function setDocTitle() {
    if (current) {
        document.title = current.en
    }
}

function setPageTitle() {
    if (current) {
        document.querySelector('h1').innerText = current.en
        document.querySelector('h2').innerText = current.zh
    }
}

function setDialog() {
    if (current) {
        const { dialogue } = current;
        const dialogueEle = document.querySelector('#dialogue');

        dialogue.forEach(item => {
            const { name, zh, sentences } = item;
            const nameEle = document.createElement('div')
            nameEle.innerText = name;
            nameEle.className = 'dialouge-name';
            const contentEleList = sentences.map(v => {
                const { content, isBold, zh } = v;
                const contentEle = document.createElement('label')
                contentEle.innerText = content;
                if (isBold) {
                    contentEle.className = 'bold-text highlight'
                    contentEle.title = zh
                }

                return contentEle
            })

            const sencenceEle = document.createElement('div')
            sencenceEle.className = 'sentence'
            const contentEle = document.createElement('div')
            contentEle.className = 'content'
            contentEle.setAttribute('data-zh', zh)
            contentEle.append(...contentEleList)
            sencenceEle.append(nameEle, contentEle)
            dialogueEle.appendChild(sencenceEle)
        })
    }
}

function setVocabulary() {
    if (current) {
        const { vocabulary } = current;
        const vocabularyEle = document.querySelector('#vocabulary');
        const vocabularyItems = vocabulary.map(item => {
            const { phrases, meaning } = item;
            const phrasesELe = document.createElement('div')
            phrasesELe.innerText = phrases
            phrasesELe.className = 'phrases bold-text'
            const meaningEle = document.createElement('div')
            meaningEle.innerText = meaning
            meaningEle.className = 'meaning'

            const container = document.createElement('div')
            container.className = 'vocabulary-item'
            container.append(phrasesELe, meaningEle)

            return container
        })

        vocabularyEle.append(...vocabularyItems)
    }
}

function setExercise() {
    if (current) {
        const { exercise } = current;
        const exerciseEle = document.querySelector('#exercise');
        const exerciseELes = exercise.map((item, idx) => {
            const labelEles = item.map(v => {
                if (v.startsWith('${') && v.endsWith("}")) {
                    const blankEle = document.createElement('text')
                    blankEle.className = 'blank'
                    blankEle.setAttribute('contenteditable', 'true')
                    return blankEle
                }
                const labelEle = document.createElement('text')
                labelEle.innerText = v;
                return labelEle;
            })

            const exerciseELe = document.createElement('div')
            exerciseELe.setAttribute('data-idx', idx + 1)
            exerciseELe.className = 'exercise-item'
            exerciseELe.append(...labelEles)

            return exerciseELe
        })

        exerciseEle.append(...exerciseELes)
    }
}

setDocTitle()
setPageTitle()
setDialog()
setVocabulary()
setExercise()
checkAnswers()

function checkAnswers() {
    document.querySelector('#checkAnswers').addEventListener("click", () => {
        console.log('checkAnswers');
    })
}