const settings = {
    'action_ids': {
        'idx-test': 'start',
        // 'start': 'action_id_11',
        'log_work': 'end'
    },
    localStorage: {
        key: 'IDX-jira-time-tracker'
    },
    issueSelector: '#key-val',
    issueKey: 'data-issue',
    trackingButton: {
        id: 'idx-track-time',
        inProgress: {
            true: {
                innerHTML: 'Pause Tracking Time',
                class: 'active'
            },
            false: {
                innerHTML: 'Start Tracking Time'
            }
        }
    },
    trackingGroup: {
        id: 'timetrack'
    },
    popup: {
        selector: 'jira-spy'
    },
    logWork: {
        id: 'log-work',
        input: {
            id: 'log-work-time-logged'
        }
    }
}

export { settings }
