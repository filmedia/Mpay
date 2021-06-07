import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper'
import LandingScreen from './LandingScreen'
import RegisterScreen from './RegisterScreen'
import LoginScreen from './LoginScreen'

import CreateUser from '../create-user/CreateUserScreen'
import VerificationScreen from './VerificationScreen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Auth extends React.Component{
 
  render(){
    return (
     <View style={{flex:1}}>
     <Stack.Navigator initialRouteName="CreateUser">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
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


  
