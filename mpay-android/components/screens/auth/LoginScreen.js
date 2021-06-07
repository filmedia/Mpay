

import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,AsyncStorage } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {post} from '../../../core/helpers/apiAction'
import ValidationComponent from 'react-native-form-validator';
import { render } from 'react-dom';


const policyText=`J'ai lu et j'accepte les Conditions Générales d'Utilisation et la Politique de Protection des Données Personnelles.`
const passwordErrorText=`Seuls les lettres(a-z), chiffres (0-9), tirets(-) ou traits de soulignement (_) sont autorisés,
et doit avoir au moin 8 caracteres.`
const confirmErrorText="Le mot de passe de confirmation doit être le même."

const telErrorText="Numéro de téléphone invalide."

class LoginScreen extends ValidationComponent{

  constructor(props){
    super(props)
    this.state={
      phoneNumber:'',
      password:'',
      visiblePassword1:false,
      disableButton:false

    }
  }

 
 
  onValidatePhoneNumber=(phoneNumber)=>{
    this.setState({phoneNumber},()=>{
      this.validate({phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true}})
    })
  }
  onValidatePassword=(password)=>{
    this.setState({password},()=>{
      this.validate({password: {minlength:8, maxlength:24, required: true}})
    })
  }

 

  onVisiblePassword1 = () =>{
    this.setState({visiblePassword1:this.state.visiblePassword1?false:true})
  };
  

 

 
  onLogin=()=>{
    var data={
      telephone:this.state.phoneNumber,
      password:this.state.password
    }
   
    
    this.validate({
      phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true},
      password: {minlength:8, maxlength:24, required: true},
     
    });
    this.isFormValid()
    ?alert('valide')
    // ?post("account",data)
    // .then(response=>{
    //   AsyncStorage.setItem('account',JSON.stringify(response)).then(()=>{
    //     this.props.navigation.navigate('Verification',{phoneNumber})
    //   })
    // })
    // .catch(error=>alert(error))
    :null

  }

  render(){

    return (
       <ImageBackground style={{flex:1}} 
       resizeMode="cover"
       source={require('../../../assets/image/bg4.jpg')}>
            <View style={[styles.bgContainer]}>
            <View style={{alignItems:'center',height:100}}>
            <AntDesign name="user" size={80} color="#fff"/>
            <Text style={{color:'#fff',fontSize:25}}>Connexion</Text>
            
        </View>
         <TextInput ref="phoneNumber" label="Telephone" value={this.state.phoneNumber} 
         error={this.isFieldInError('phoneNumber')}
          style={[styles.inputStyle]}
          theme={themes.inputTheme}
          onChangeText={(tel)=>this.onValidatePhoneNumber(tel)} keyboardType="phone-pad"
          right={<TextInput.Icon color={'#E1CB06'}  name="phone" 
          render={props =>{
            return <TextInputMask
            {...props}
            mask="+[509] [00] [00] [00] [00]"
          />
          }    
         }
         />}
          
          />
         <HelperText type="error" visible={this.isFieldInError('phoneNumber')}>
           {telErrorText}
         </HelperText>
   
           <TextInput
           ref="password"
          autoCapitalize={'none'}
           label="Password"
           style={[styles.inputStyle]}
           onChangeText={(password)=>this.onValidatePassword(password)}
           theme={themes.inputTheme}
           secureTextEntry={!this.state.visiblePassword1}
           right={<TextInput.Icon color={'#E1CB06'} onPress={()=>{this.onVisiblePassword1()
         
           }} name={this.state.visiblePassword1 ?"eye" :'eye-off'} />}
           error={this.isFieldInError('password')}
           />
   
   
         <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('password')}>
           {passwordErrorText}
         </HelperText>
   
         <Caption onPress={()=>alert('')} 
         style={{fontWeight:'bold',textDecorationLine:"underline",color:'#BCBBBB',textAlign:'center',margin:10}}>
        J'ai oublié le mot de passe
      </Caption>
         
         
           
         <Button disabled={this.state.disableButton} onPress={()=>this.onLogin()} 
      style={{backgroundColor:!this.state.disableButton ?'#234A85':'transparent',padding:5,borderWidth:2,borderColor:'#234A85'}} labelStyle={{color:'#fff'}}>
        Se connecter
      </Button>

         </View>
         <View style={styles.bottomStyle}>
        <Caption style={{color:"#BCBBBB",textAlign:'center'}}>Vous n'avez pas encore de compte ? 
        <Caption onPress={()=>this.props.navigation.navigate('Register')} style={{fontWeight:'bold',textDecorationLine:"underline",color:'#BCBBBB'}}>Inscrivez-vous</Caption></Caption>
      
        </View>
      
    </ImageBackground>
     );
  }

};


export default LoginScreen;