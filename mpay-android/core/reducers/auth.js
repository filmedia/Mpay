import {LOGIN,LOGOUT} from '../constants'
const initialState={
    auth:false
}


export const auth=(state=initialState,action)=>{
    switch (action.type) {
        case LOGIN:
            return{
                ...state,auth:true
            }
        case LOGOUT:
            return{
                ...state,auth:false
            }
        default: return state
        }
    }

