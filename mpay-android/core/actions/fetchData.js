import React from 'react'
import {AsyncStorage} from 'react-native'
import firebase from '../../firebase'
require('firebase/firestore')
import {USER_CHANGE_STATE,CURRENT_ACCOUNT_CHANGE_STATE} from '../constants'
import {get} from '../helpers/apiAction'
export function fetchCurrentAccount(){
    return dispatch=>{
    get(`account/${'392fc157-9ca6-4876-b191-9c25b9db0a46'}`)
        .then(response=>{
            
            dispatch({type:CURRENT_ACCOUNT_CHANGE_STATE,account:response})
        })
      .catch(e=>console.error(e))
    }
}

export  function  fetchCurrentUser(){
    return  (dispatch,getState)=>{
      // if(getState().userState.account[0].user_type!==undefined){
        AsyncStorage.getItem('account').then(value=>{
            const account=JSON.parse(value)
            
            //if(account.user_type=="student"){
                get(`student/${1}`)
                .then(response=>{
                    
                    dispatch({type:USER_CHANGE_STATE,user:response})
                })
             .catch(e=>console.error(e))
            // }else{
            //     get(`staff/${1}`)
            //     .then(response=>{
                    
            //         dispatch({type:USER_CHANGE_STATE,user:response})
            //     })
            //  .catch(e=>console.error(e)) 
            // }
        })
        
       }
    
    //}
}