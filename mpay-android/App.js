import { StatusBar } from 'expo-status-bar';
import {createStackNavigator} from '@react-navigation/stack'
import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import {DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper'
import AuthScreen from './components/screens/auth/index'
import MainScreen from './components/screens/main/Main'
import EditStudentProfile  from './components/screens/main/profile/EditProfileStudent'
import Profile  from './components/screens/main/profile'
import EditStaffProfile  from './components/screens/main/profile/EditProfileStaff'
import DrawerContent from './components/extend-components/DrawerContent'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {applyMiddleware,createStore} from 'redux'
import Reducer from './core/reducers'
import firebase from './firebase'
import FlashMessage from "react-native-flash-message";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
 

const theme = {
    ...DefaultTheme,
    colors: {
    ...DefaultTheme.colors,
    primary: '#234A85',
    accent: 'yellow',
    error:'#A6211D'
  },
};
const Stack=createStackNavigator()
const Drawer = createDrawerNavigator();
const store=createStore(Reducer,applyMiddleware(Thunk))

const ProfileScreen=()=>{
  return(
 <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen  name="Profile"  component={Profile} options={{headerShown:true}}/>
    <Stack.Screen  name="EditStaffProfile" component={EditStaffProfile} options={{headerShown:true}}/>
    <Stack.Screen  name="EditStudentProfile" component={EditStudentProfile} options={{headerShown:true}}
    />
  </Stack.Navigator> 
  )
}

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isRegistered:false,
      loading:false
    }
  }

  componentWillMount=async()=>{
      
    this.setState({loading:true})
    firebase.default.auth().onAuthStateChanged(user=>{
      if(user){
        this.setState({isRegistered:true})
      }else{
         this.setState({isRegistered:false})
      }
      this.setState({loading:false})
    })
   
  }

  render(){
    return (
     <Provider store={store}>

     
      <PaperProvider theme={theme}>
        <NavigationContainer>

        <View style={{flex:1,marginTop:30}}>
          <StatusBar style="auto" />
       
          <>
          {
            !this.state.loading
            ?this.state.isRegistered
              
              ?<Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>} initialRouteName="Home"  
              
             >
                 
                <Drawer.Screen name="Home" options={{drawerLabel:'MPAY INUKA'}}  
               component={()=><Stack.Navigator initialRouteName="Main">
              <Stack.Screen  name="Main"  component={MainScreen} options={{headerShown:true}}/>
              <Stack.Screen  name="EditStaffProfile" component={EditStaffProfile} options={{headerShown:true}}/>
              <Stack.Screen  name="EditStudentProfile"  component={EditStudentProfile}  options={{headerShown:true,title:'Modifier profile'}}
              />
            </Stack.Navigator>} />
                <Drawer.Screen name="Profile" component={ProfileScreen}  options={{headerShown:false,title:'Profil'}} />
                <Drawer.Screen name="Settings" component={()=>null} />
              </Drawer.Navigator>
              
              
              :<AuthScreen/>
            :<BarIndicator size={70} color="#234A85"/>
          }
          </>
          <FlashMessage position="top" />
        </View>
        </NavigationContainer>
      </PaperProvider>
      </Provider>
      );
    }
  }


  
