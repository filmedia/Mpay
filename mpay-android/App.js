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
      isLogged:"false",
      loading:true
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('auth').then(value=>{
      this.setState({isLogged:value})
      //alert(value)
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
            this.state.loading
            ?this.state.isLogged=='true'
              
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
              
              
              :<AuthScreen/>
            :<Text>Loading...</Text>
          }
          </>
        </View>
        </NavigationContainer>
      </PaperProvider>
      </Provider>
      );
    }
  }




// import * as React from "react";
// import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from "react-native";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import * as firebase from "firebase";

// // Initialize Firebase JS SDK
// // https://firebase.google.com/docs/web/setup
// try {
//   firebase.initializeApp({
//     apiKey: "AIzaSyC4YKwo05Pe6XgVVzrJMB3MtdhqNzg12nk",
//     authDomain: "projectx-98867.firebaseapp.com",
//     databaseURL: "https://projectx-98867.firebaseio.com",
//     projectId: "projectx-98867",
//     storageBucket: "projectx-98867.appspot.com",
//     messagingSenderId: "802878166500",
//     appId: "1:802878166500:web:9d6ec3f96fc3fad896e3f1",
//     measurementId: "G-BDK7LNQPFF"
//   });
// } catch (err) {
//   // ignore app already initialized error in snack
// }

// export default function App() {
//   const recaptchaVerifier = React.useRef(null);
//   const [phoneNumber, setPhoneNumber] = React.useState();
//   const [verificationId, setVerificationId] = React.useState();
//   const [verificationCode, setVerificationCode] = React.useState();
//   const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;
//   const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
//     ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
//     : undefined);

//   return (
//     <View style={{ padding: 20, marginTop: 50 }}>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaVerifier}
//         firebaseConfig={firebaseConfig}
//       />
//       <Text style={{ marginTop: 20 }}>Enter phone number</Text>
//       <TextInput
//         style={{ marginVertical: 10, fontSize: 17 }}
//         placeholder="+1 999 999 9999"
//         autoFocus
//         autoCompleteType="tel"
//         keyboardType="phone-pad"
//         textContentType="telephoneNumber"
//         onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
//       />
//       <Button
//         title="Send Verification Code"
//         disabled={!phoneNumber}
//         onPress={async () => {
//           // The FirebaseRecaptchaVerifierModal ref implements the
//           // FirebaseAuthApplicationVerifier interface and can be
//           // passed directly to `verifyPhoneNumber`.
//           try {
//             const phoneProvider = new firebase.auth.PhoneAuthProvider();
//             const verificationId = await phoneProvider.verifyPhoneNumber(
//               phoneNumber,
//               recaptchaVerifier.current
//             );
//             setVerificationId(verificationId);
//             showMessage({
//               text: "Verification code has been sent to your phone.",
//             });
//           } catch (err) {
//             showMessage({ text: `Error: ${err.message}`, color: "red" });
//           }
//         }}
//       />
//       <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
//       <TextInput
//         style={{ marginVertical: 10, fontSize: 17 }}
//         editable={!!verificationId}
//         placeholder="123456"
//         onChangeText={setVerificationCode}
//       />
//       <Button
//         title="Confirm Verification Code"
//         disabled={!verificationId}
//         onPress={async () => {
//           try {

//             const credential = firebase.auth.PhoneAuthProvider.credential(
//               verificationId,
//               verificationCode
//             );
//             await firebase.auth().signInWithCredential(credential);
//             showMessage({ text: "Phone authentication successful 👍" });
//           } catch (err) {
//             showMessage({ text: `Error: ${err.message}`, color: "red" });
//           }
//         }}
//       />
//       {message ? (
//         <TouchableOpacity
//           style={[StyleSheet.absoluteFill, { backgroundColor: 0xffffffee, justifyContent: "center" }]}
//           onPress={() => showMessage(undefined)}>
//           <Text style={{color: message.color || "blue", fontSize: 17, textAlign: "center", margin: 20, }}>
//             {message.text}
//           </Text>
//         </TouchableOpacity>
//       ) : undefined}
//     </View>
//   );
// }

  
