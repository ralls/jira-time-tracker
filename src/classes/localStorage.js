class IdxLocalStorage {

    constructor() {
        this._issues = {}
    }

    get(idxKey, callback) {
        chrome.storage.sync.get(idxKey, function (items) {
            if (!chrome.runtime.error) {
                if (items[idxKey]) {
                    items = JSON.parse(items[idxKey])
                }
                callback(items)
            } else {
                callback(null)
            }
        })
    }

    set(idxKey, value, callback) {
        for (const key in this._issues) {
            const type = this._issues[key].type

            if ((key === idxKey) && [Array, Object].includes(type)) {
                // window.localStorage.setItem(idxKey, JSON.stringify(value))
                chrome.storage.sync.set({ [idxKey]: JSON.stringify(value) })

                return value
            }
        }
        // window.localStorage.setItem(idxKey, value)
        chrome.storage.sync.set({ [idxKey]: value }, () => {
            callback(true)
        })
    }

    remove(idxKey) {
        chrome.storage.sync.remove(idxKey)
    }

    addProperty(key, type, defaultValue) {
        type = type || String

        this._issues[key] = { type }

        if (!window.localStorage[key] && defaultValue !== null) {
            window.localStorage.setItem(key, [Array, Object].includes(type) ? JSON.stringify(defaultValue) : defaultValue)
        }
    }

    _process(type, value) {
        // I fundamentally disagree with eslint's rules on switch formatting...
        /* eslint-disable */
        switch (type) {
            case Boolean:
                return value === 'true'
            case Number:
                return parseInt(value, 10)
            case Array:
                try {
                    const array = JSON.parse(value)
                    return Array.isArray(array) ? array : []
                } catch (e) {
                    return []
                }
            case Object:
                try {
                    return JSON.parse(value)
                } catch (e) {
                    return {}
                }
            default:
                return value
        }
        /* eslint-enable */
    }
}

export default new IdxLocalStorage()
