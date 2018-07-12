class Popup {
    constructor({ getters = {}, storage = {}, mutations = {}, utilities = {}, settings = {}, moment = {} }) {
        this.getters = getters
        this.storage = storage
        this.mutations = mutations
        this.utilities = utilities
        this.settings = settings
        this.moment = moment
        this.entries = null
        this.container = undefined
    }

    init () {
        try {
            this.container = document.getElementById(this.settings.popup.selector)
            if (!this.container) {
                throw new Error('could not find the container.')
            }
            this.loadData(function () {
                this.createDisplay()
            }.bind(this))
        } catch (error) {
            console.error(error)
        }
    }

    loadData (callback) {
        this.getters.fromStorage(result => {
            this.entries = result
            callback(result)
        })
    }

    getTargetIssue (el) {
        const issue = el.getAttribute(this.settings.issueKey)
        if (issue) {
            return issue
        }
        return false
    }

    reset (el) {
        if (el.target) {
            const issueId = this.getTargetIssue(el.target)
            if (this.entries[issueId]) {
                this.entries[issueId] = []
                this.mutations.toStorage(this.entries, function () {
                    this.createDisplay()
                }.bind(this))
            }
        }
    }

    clear (el) {
        if (el.target) {
            const issueId = this.getTargetIssue(el.target)
            if (this.entries[issueId]) {
                delete this.entries[issueId]
                this.mutations.toStorage(this.entries, function () {
                    this.createDisplay()
                }.bind(this))
            }
        }
    }

    createDisplay () {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild)
        }
        const table = this.utilities.createElement('table')
        const thead = this.utilities.createElement('thead')
        const tbody = this.utilities.createElement('tbody')
        const tr = this.utilities.createElement('tr')
        let headers = ['Issue #', 'Time Spent', 'Options']
        headers.map(function (item) {
            const th = this.utilities.createElement('th', item)
            tr.appendChild(th)
        }.bind(this))
        thead.appendChild(tr)
        table.appendChild(thead)
        Object.entries(this.entries).map(function (entry) {
            if (entry[0] === 'undefined') {
                return
            }
            const newTr = this.utilities.createElement('tr')
            const issueTd = this.utilities.createElement('td')
            const buttonTd = this.utilities.createElement('td')
            const resetButton = this.utilities.createElement('button', 'Reset', {
                'class': 'idx-js-btn idx-js-btn--primary',
                'data-issue': entry[0]
            })
            const clearButton = this.utilities.createElement('button', 'Delete', {
                'class': 'idx-js-btn idx-js-btn--danger',
                'data-issue': entry[0]
            })
            const anchor = this.utilities.createElement('a', entry[0], {
                href: `http://jira.idx.local/browse/${entry[0]}`,
                target: '_blank'
            })
            resetButton.addEventListener('click', this.reset.bind(this))
            clearButton.addEventListener('click', this.clear.bind(this))

            const time = entry[1].reduce((carry, entry) => {
                if (entry.start && entry.end) {
                    carry = carry + (entry.end - entry.start)
                }
                return carry
            }, 0)
            let data = this.moment.duration(time, 'seconds')
            data = data._data
            const formatted = `${data.days}d ${data.hours}h ${data.minutes}m ${data.seconds}s`

            const td = this.utilities.createElement('td', formatted)
            issueTd.append(anchor)
            newTr.appendChild(issueTd)
            buttonTd.appendChild(resetButton)
            buttonTd.appendChild(clearButton)
            newTr.appendChild(td)
            newTr.appendChild(buttonTd)
            tbody.appendChild(newTr)
            table.appendChild(tbody)
        }.bind(this))
        this.container.appendChild(table)
    }
}

export { Popup as default }
