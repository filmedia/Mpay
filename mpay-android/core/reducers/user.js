import {USER_CHANGE_STATE,STAFF_STATE,STUDENT_STATE,CLEAR_DATA} from '../constants'
const initialState={
    user:[],
    currentUser:[],
    account:[]
}


 const user=(state=initialState,action)=>{
    switch (action.type) {
        case USER_CHANGE_STATE:
            return {...state,currentUser:[action.user]}
        case STUDENT_STATE:
            return {...state,user:[action.user]}
        case STAFF_STATE:
            return {...state,user:[action.user]}
        case CLEAR_DATA:
            return initialState
        
        default:
            return state
    }
}

export {user}