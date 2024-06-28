

function renderHighlights() {
    document.querySelectorAll('.highlight').forEach(e => {
        e.addEventListener('mouseenter', () => {
            const zhContent = e.getAttribute('title')
            const zhEle = document.createElement('span')
            zhEle.id = 'zhContent'
            zhEle.innerText = zhContent
            zhEle.className = 'tooltips'
            e.appendChild(zhEle)
        })
        e.addEventListener('mouseleave', () => {
            const zhEle = e.querySelector('#zhContent')
            e.removeChild(zhEle)
        })
    })
}

renderHighlights()