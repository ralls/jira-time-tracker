class Issue {
    constructor ({ storage = null, settings = {}, utilities = {}, actions = {}, getters = {}, mutations = {} }) {
        this.issueId = undefined
        this.storage = storage
        this.settings = settings
        this.utilities = utilities,
        this.actions = actions
        this.getters = getters
        this.mutations = mutations
        this.entries = null
        this.timeSpent = 0
    }

    initialize (callback) {
        this.issueId = this.actions.getIssue(this.settings.issueSelector)
        this.get(function (result) {
            this.entries = result
            if (!this.entries) {
                this.entries = {}
                this.save()
            }
            callback(true)
        }.bind(this))
    }

    save () {
        // Put this into a setter / mutation.
        this.mutations.toStorage(this.entries, () => {
            this.toggleButton()
        })
    }

    get (callback) {
        this.getters.fromStorage(value => callback(value))
    }

    inProgress () {
        if (!this.entries.hasOwnProperty(this.issueId)) {
            return false
        }
        return this.entries[this.issueId].filter(entry => {
            return entry.start && entry.end === null
        }).length > 0
    }

    createStartButton() {
        const content = document.getElementById('content')
        const parent = this.utilities.createElement('div', '', { id: this.settings.trackingGroup.id })
        const button = this.utilities.createElement(
            'button',
            this.settings.trackingButton.inProgress[this.inProgress()].innerHTML,
            {
                'id': this.settings.trackingButton.id,
                'class': 'btn-light',
                'data-issue': this.issueId
            }
        )
        button.addEventListener('click', this.handleClick.bind(this))
        parent.appendChild(button)
        content.appendChild(parent)
        return true
    }

    /**
     * Pulls the issueID from localStorage. If nothing found, sets one up.
     */
    setup () {
        this.initialize(function () {
            if (this.issueId) {
                this.createStartButton()
            }
        }.bind(this))
    }

    startProgress () {
        if (!this.entries[this.issueId]) {
            this.entries[this.issueId] = []
        }
        this.entries[this.issueId].push({
            start: Math.floor(Date.now() / 1000),
            end: null
        })
        this.save()
    }

    endProgress () {
        this.entries[this.issueId] = this.entries[this.issueId].reduce((result, obj) => {
            if (obj.start && obj.end === null) {
                obj.end = Math.floor(Date.now() / 1000)
            }
            result.push(obj)
            return result
        }, [])
        this.save()
    }

    handleClick (e) {
        if (this.inProgress()) {
            this.endProgress()
        } else {
            this.startProgress()
        }
    }

    toggleButton () {
        const button = document.getElementById(this.settings.trackingButton.id)
        if (button) {
            const progress = this.inProgress()
            button.innerHTML = this.settings.trackingButton.inProgress[progress].innerHTML
            if (progress) {
                button.classList.remove('btn-light')
                button.classList.add('btn-success')
            } else {
                button.classList.remove('btn-success')
                button.classList.add('btn-light')
            }
        }
    }
}

export { Issue as default }
