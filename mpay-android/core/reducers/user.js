import {USER_CHANGE_STATE,CURRENT_ACCOUNT_CHANGE_STATE} from '../constants'
const initialState={
    user:[],
    account:[]
}


 const user=(state=initialState,action)=>{
    switch (action.type) {
        case USER_CHANGE_STATE:
            return {...state,user:[action.user]}
        case CURRENT_ACCOUNT_CHANGE_STATE:
            return {...state,account:[action.account]}
        default:
            return state
    }
}

export {user}