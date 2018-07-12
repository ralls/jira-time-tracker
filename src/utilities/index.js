const createElement = (tagName, text = '', options = {}) => {
    let el = document.createElement(tagName)
    if (Object.keys(options).length) {
        Object.keys(options).forEach(key => {
            // el[key] = options[key]
            el.setAttribute(key, options[key])
        })
    }
    if (text.length) {
        const textNode = document.createTextNode(text)
        el.appendChild(textNode)
    }
    return el
}

export default {
    createElement
}
