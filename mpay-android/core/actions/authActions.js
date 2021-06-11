import React from 'react'
import {AsyncStorage} from 'react-native'
import {LOGIN,LOGOUT} from '../constants'
import {post} from '../helpers/apiAction'

export const register=()=>{
    
        const fetchUrl=`https://e798dae2db7d.ngrok.io/api/${'account'}`;
       post('account',data)
        
       
      
}
export const auth=()=>{
        return dispatch=>{
                dispatch(LOGOUT) 
                AsyncStorage.getItem('auth',(result)=>{
                        if(result==='true'){
                                dispatch(LOGIN)
                        }else{
                                dispatch(LOGOUT)    
                        }
                })
        }
}
export const login=()=>{
        return dispatch=>{
                //AsyncStorage.setItem("auth","true").then(()=>{
                        dispatch(LOGIN)
                //})
        }
}

export const logout=()=>{
        return dispatch=>{
               // AsyncStorage.setItem("auth","false").then(()=>{
                        dispatch(LOGOUT)
                //})
        }
}