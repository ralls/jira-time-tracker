(function () {
    const action_ids = {
        'idx-test': 'start',
        // 'start': 'action_id_11',
        'log_work': 'end'
    }

    const state = {
        active: []
    }

    const getters = {
        action: action_ids => value => Object.keys(action_ids).filter(key => action_ids[key] === value),
        issueByName: state => name => state.active.filter(issue => issue.name === name)
    }

    const actions = {
        start: () => {
            if (!getters.issueByName(vars.issue)) {
                mutations.add(vars.issue)
            }
        },
        getIssue: id => {
            const issue = document.querySelector(id)
            if (issue) {
                return issue.getAttribute('data-issue-key')
            }
            return false
        },
        startProgress: () => { }
    }

    const mutations = {
        add: (payload) => {
            // state.active.push(payload)
            console.log('state? %o', state)
            console.log('payload: %o', payload)
        }
    }

    const handleEvent = (e) => {
        if (e.target && 'id' in e.target) {
            const action = getters.action(e.target.id)
            if (action) {
                console.log('yay!')
            }
        }
    }

    const events = {
        handleClick: function (e) {
            console.log('click handled. %o', e)
        }
    }

    const utilities = {
        _createElement: (tagName, text = '', options = {}) => {
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
        },
        createStartButton: () => {
            const parent = document.getElementById('opsbar-opsbar-transitions')
            const li = utilities._createElement('li', '', { 'class': 'toolbar-group pluggable-ops' })
            const button = utilities._createElement('button', 'Track Time', { 'id': 'idx-test', 'class': 'toolbar-trigger issueaction-workflow-transition' })
            li.appendChild(button)
            parent.appendChild(li)
            button.addEventListener('click', events.handleClick)
            return true
        },
        setup: () => {
            utilities.createStartButton()
        }
    }

    const vars = {
        'issue': actions.getIssue('#key-val')
    }

    if (vars.issue) {
        utilities.setup();
    }
})()
