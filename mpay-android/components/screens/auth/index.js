import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper'
import LandingScreen from './LandingScreen'
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'

import CreateUser from '../create-user/CreateUserScreen'
import ForgotPasswordScreen from './forgot-passoword/ForgotPasswordScreen'
import ResetPassowordScreen from './forgot-passoword/ResetPassowordScreen'
import VerificationScreen from './VerificationScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchStudentData,fetchStaffData,fetchCurrentUser} from '../../../core/actions/fetchData'
import firebase from '../../../firebase'


const Stack = createStackNavigator();

class Auth extends React.Component{
  componentDidUpdate(){
    if(this.props.currentUser!==undefined){
      this.props.currentUser.user_type=="student"||this.props.currentUser.user_type=="none"
      ?this.props.fetchStudentData()
      :this.props.fetchStaffData()
     }
  }
  componentDidMount(){
    this.props.fetchCurrentUser()
  }

  render(){
    return (
     <View style={{flex:1}}>
     <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:true,title:'Mot de passe oublié'}} />
        <Stack.Screen name="ResetPassword" component={ResetPassowordScreen} options={{headerShown:true,title:'Reinitialiser Mot de passe oublié'}} />
        <Stack.Screen name="Verification" component={VerificationScreen} 
        options={{
          title: 'Verification',
          headerStyle: {
            backgroundColor: '#234A85',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',textAlign:'center'
          },
        }}
         />
        
        <Stack.Screen name="CreateUser" component={CreateUser} 
        options={{
          title: 'Inscription',
          headerStyle: {
            backgroundColor: '#234A85',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',textAlign:'center'
          },
        }} />
      </Stack.Navigator>
     </View>
      
      
      );
    }
  }

  const mapStateToProps = (state) => ({
    currentUser:state.userState.currentUser[0],
    user:state.userState.user[0]
    
  })
  
  const mapDispatchToProps=dispatch=>bindActionCreators({fetchCurrentUser,fetchStudentData,fetchStaffData},dispatch)
  
  export default connect(mapStateToProps,mapDispatchToProps)(Auth)
  
  

  
