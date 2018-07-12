import IdxLocalStorage from './classes/localStorage'
import Issue from './classes/issue'
import utilities from './utilities'
import { settings } from './settings'
import * as methods from './methods'

new Issue({
    storage: IdxLocalStorage,
    settings,
    utilities,
    ...methods
}).setup()
