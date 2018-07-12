import Popup from './classes/popup'
import { getters, mutations } from './methods/'
import utilities from './utilities'
import { settings } from './settings'
import moment from 'moment'

new Popup({
    getters,
    utilities,
    mutations,
    settings,
    moment
}).init()
