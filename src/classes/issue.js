class Issue {
    constructor ({ storage = null, settings = {}, utilities = {}, actions = {}, getters = {}, mutations = {}, moment = {} }) {
        this.issueId = undefined
        this.storage = storage
        this.settings = settings
        this.utilities = utilities,
        this.actions = actions
        this.getters = getters
        this.mutations = mutations
        this.entries = null
        this.timeSpent = 0
        this.moment = moment
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
        const content = document.getElementById('opsbar-jira.issue.tools')
        // const parent = this.utilities.createElement('div', '', { id: this.settings.trackingGroup.id })
        const parent = this.utilities.createElement('li', '', {
            'id': this.settings.trackingGroup.id,
            'class': 'toolbar-item'
        })
        const button = this.utilities.createElement(
            'button',
            this.settings.trackingButton.inProgress[this.inProgress()].innerHTML,
            {
                'id': this.settings.trackingButton.id,
                'class': 'toolbar-trigger',
                'data-issue': this.issueId
            }
        )
        button.addEventListener('click', this.handleClick.bind(this))
        parent.appendChild(button)
        content.prepend(parent)
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

    getTimeWorked () {
        const time = this.entries[this.issueId].reduce((carry, entry) => {
          carry += entry.end - entry.start
          return carry
        }, 0)
        let { _data } = this.moment.duration(time, 'seconds')
        return `${_data.days}d ${_data.hours}h ${_data.minutes}m`
    }

    setTimeWorked () {
        // Give Jira some time to load the log work from xhr.
        setTimeout(() => {
            const logWorkInput = document.getElementById(this.settings.logWork.input.id)
            if (logWorkInput && this.entries[this.issueId]) {
                const formattedTime = this.getTimeWorked()
                logWorkInput.value = formattedTime
            }
        }, 500)
    }

    launchLogWork () {
        const logWork = document.getElementById(this.settings.logWork.id)
        if (logWork) {
            logWork.click()
            this.setTimeWorked()
        }
    }

    handleClick (e) {
        if (this.inProgress()) {
            this.endProgress()
            // If shift+click, try to launch the 'log work' button.
            if (e.shiftKey) {
                this.launchLogWork()
            }
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
                button.classList.add('btn-success')
            } else {
                button.classList.remove('btn-success')
            }
        }
    }
}

export { Issue as default }
