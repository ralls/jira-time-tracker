import moment from 'moment'
import storage from '../classes/localStorage'
import { settings } from '../settings'
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
        return undefined
    }
}

const getters = {
    fromStorage: (callback) => {
        storage.get(settings.localStorage.key, (value => {
            callback(value)
        }))
        // return JSON.parse(storage.get(settings.localStorage.key))
    },
    timeSpent: entries => {
        let seconds = entries.reduce((result, entry) => {
            return result = result + (entry.end - entry.start)
        }, 0)
        return moment.duration(seconds, 'seconds')
    }
    // action: action_ids => value => Object.keys(action_ids).filter(key => action_ids[key] === value),
    // issueByName: state => name => state.active.filter(issue => issue.name === name)
}

const mutations = {
    toStorage: (payload, callback) => {
        storage.set(settings.localStorage.key, JSON.stringify(payload), () => {
            callback(true)
        })
    }
}

export {
    actions,
    getters,
    mutations
}
