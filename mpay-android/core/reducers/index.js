import {combineReducers} from 'redux'
import {user} from './user'
import {auth} from './auth'

const Reducer=combineReducers({
    userState:user,
    authState:auth
})

export default Reducer

