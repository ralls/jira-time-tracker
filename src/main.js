import IdxLocalStorage from './classes/localStorage'
import Issue from './classes/issue'
import utilities from './utilities'
import { settings } from './settings'
import * as methods from './methods'
import moment from 'moment'

new Issue({
    storage: IdxLocalStorage,
    settings,
    utilities,
    ...methods,
    moment
}).setup()
