import React from 'react'
import {AsyncStorage} from 'react-native'
import firebase from '../../firebase'
require('firebase/firestore')
import {USER_CHANGE_STATE,STUDENT_STATE,STAFF_STATE,CLEAR_DATA} from '../constants'
import {get} from '../helpers/apiAction'
export function fetchCurrentUser(){
    return async dispatch=>{
        const user=  await AsyncStorage.getItem('account').then(value=>{  
            return JSON.parse(value)
        })

    get(`account/${user.id}`)
        .then(response=>{
           
            dispatch({type:USER_CHANGE_STATE,user:response})
        })
      .catch(e=>console.error(e))
    }
}

export  function  fetchStudentData(){
    return  async(dispatch,getState)=>{
      const user=  await AsyncStorage.getItem('account').then(value=>{  
            return JSON.parse(value)
        })

        get(`student/${user.id}`)
        .then(response=>{
            
            dispatch({type:STUDENT_STATE,user:response})
        })
       }

}

export  function  fetchStaffData(){
    return  async(dispatch,getState)=>{
      const user=  await AsyncStorage.getItem('account').then(value=>{  
            return JSON.parse(value)
        })
        get(`student/${user.id}`)
        .then(response=>{
            dispatch({type:STAFF_STATE,user:response})
        })
       }

}

export function clearData(){
    return dispatch=>{
        dispatch(CLEAR_DATA)
    }
}