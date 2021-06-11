import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import {DefaultTheme,Provider as PaperProvider,Button} from 'react-native-paper'
import AuthScreen from './components/screens/auth/index'
import MainScreen from './components/screens/main/Main'
import EditStudentProfile  from './components/screens/main/profile/EditProfileStudent'
import Profile  from './components/screens/main/profile'
import EditStaffProfile  from './components/screens/main/profile/EditProfileStaff'
import DrawerContent from './components/extend-components/DrawerContent'
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Thunk from 'redux-thunk'
import {connect} from 'react-redux'
import {applyMiddleware,createStore,bindActionCreators} from 'redux'
import {auth} from './core/actions/authActions'
import Reducer from './core/reducers'
import firebase from './firebase'
import CreateUserScreen from './components/screens/create-user/CreateUserScreen'

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

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state={
      isRegistered:false,
      loading:false,
      auth:false
    }
  }


componentDidMount=()=>{
     // this.props.auth()
      
    this.setState({loading:true})
    firebase.default.auth().onAuthStateChanged(user=>{
      if(user){
        this.setState({isRegistered:true})
      }else{
         this.setState({isRegistered:false})
      }
      this.setState({loading:false})
    })

    AsyncStorage.getItem('auth').then((result)=>{
       
        this.setState({auth:JSON.parse(result)})
    })
  }

  

  render(){
   //console.error(this.props.auth);
    return (
    
        <NavigationContainer>

        <View style={{flex:1,marginTop:30}}>
          <StatusBar style="auto" />
       
          <>
          {
           this.state.isRegistered
              ?!this.state.auth
              ?<Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>} initialRouteName="Home"  
              
              drawerStyle={{
                backgroundColor: '#234A85',
                width: 240,
                
              }}>
                 
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

            :<Stack.Navigator initialRouteName="CreateUser">
             <Stack.Screen  name="CreateUser"  component={CreateUserScreen}  options={{headerShown:true,title:'Inscription'}}
            />
          </Stack.Navigator>
              
              
              :<AuthScreen/>
             
          }
          </>
        </View>
        </NavigationContainer>
   
      );
    }
  }



  const mapStateToProps = (state) => ({
    auth:state.authState.auth,
  })
  
  const mapDispatchToProps=dispatch=>bindActionCreators({auth},dispatch)
  
  export default connect(mapStateToProps,mapDispatchToProps)(Main)