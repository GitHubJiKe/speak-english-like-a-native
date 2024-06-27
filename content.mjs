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

setDocTitle()
setPageTitle()