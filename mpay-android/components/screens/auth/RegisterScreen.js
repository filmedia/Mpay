import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,AsyncStorage } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
import {post} from '../../../core/helpers/apiAction'
import ValidationComponent from 'react-native-form-validator';
import { render } from 'react-dom';
import firebase from '../../../firebase'
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
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
import { showMessage, hideMessage } from "react-native-flash-message";

const policyText=`J'ai lu et j'accepte les Conditions Générales d'Utilisation et la Politique de Protection des Données Personnelles.`
const passwordErrorText=`Seuls les lettres(a-z), chiffres (0-9), tirets(-) ou traits de soulignement (_) sont autorisés,
et doit avoir au moin 8 caracteres.`
const confirmErrorText="Le mot de passe de confirmation doit être le même."

const telErrorText="Numéro de téléphone invalide."

class RegisterScreen extends ValidationComponent{

  constructor(props){
    super(props)
    this.state={
      phoneNumber:'',
      password:'',
      confirmPassword:'',
      checkPolicy:'unchecked',
      visiblePassword2:false,
      visiblePassword1:false,
      disableButton:false,
      loadingButton:false

    }
  }
 
  // componentDidMount(){
  //   this.props.navigation.navigate('CreateUser')
  // }
 
 
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

  onValidateConfirmPassword=(confirmPassword)=>{
    this.setState({confirmPassword},()=>{
      this.validate({confirmPassword: {equalPassword:this.state.password}})
    })
  }

  onCheckPolicy=()=>{
    if(this.state.checkPolicy=="unchecked"){
      this.setState({checkPolicy:'checked'},()=>{
        this.setState({disableButton:true})
      })
    }else{
      this.setState({checkPolicy:'unchecked'},()=>{
        this.setState({disableButton:false})
      })
    }
   
  }

  onVisiblePassword1 = () =>{
    this.setState({visiblePassword1:this.state.visiblePassword1?false:true})
  };
  onVisiblePassword2 = () =>{
    this.setState({visiblePassword2:this.state.visiblePassword2?false:true})
  };
  
  

 

 
  onRegister=()=>{
    
    
    this.validate({
      phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true},
      password: {minlength:8, maxlength:24, required: true},
      confirmPassword: {equalPassword:this.state.password}

    });

    var data={
      telephone:this.state.phoneNumber,
      password:this.state.password
    }
  

    this.setState({loadingButton:true})
    this.isFormValid()
    ?post('account',data).then(response=>{
      AsyncStorage.setItem('account',JSON.stringify(response))
      this.setState({phoneNumber:'',password:'',confirmPassword:'',loadingButton:false})
      //console.log(response)
      this.props.navigation.navigate('CreateUser')
    })
    .catch((e)=>{
     
      this.setState({loadingButton:false})
      showMessage({
        message: "Desolé! Ce numero est déjà utilisé.",
        description: "Veuillez utiliser un autre numero.",
        type: "danger",
      });
    })
    :null

  }

  render(){

    return (
       <ImageBackground style={{flex:1}} 
       resizeMode="cover"
       source={require('../../../assets/image/bg2.jpg')}>
           <View style={[styles.bgContainer,{backgroundColor:'transparent'}]}>
           <View style={{alignItems:'center',height:100}}>
               <Text style={{color:'#fff',fontSize:40}}>MPAY-INUKA</Text>
               <Caption style={{color:'#fff'}}>Inscrivez-vous</Caption>
           </View>
         <TextInput ref="phoneNumber" label="Telephone" value={this.state.phoneNumber}
         error={this.isFieldInError('phoneNumber')}
          style={[styles.inputStyle]}
          theme={themes.inputTheme}
          onChangeText={(tel)=>this.onValidatePhoneNumber(tel)} keyboardType="phone-pad"
          
          left={<TextInput.Icon color={'#E1CB06'}  name="phone" 
         
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
           value={this.state.password}
           style={[styles.inputStyle]}
           onChangeText={(password)=>this.onValidatePassword(password)}
           theme={themes.inputTheme}
           secureTextEntry={!this.state.visiblePassword1}
           left={<TextInput.Icon color={'#E1CB06'}name={"key-variant"} />}
           
           
           right={<TextInput.Icon color={'#E1CB06'} onPress={()=>{this.onVisiblePassword1()
         
           }} name={this.state.visiblePassword1 ?"eye" :'eye-off'} />}
           error={this.isFieldInError('password')}

          
           />
   
   
         <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('password')}>
           {passwordErrorText}
         </HelperText>
   
         <TextInput label="Confirmer le mot de passe" 
         ref="confirmPassword"
          autoCapitalize={'none'}
         value={this.state.confirmPassword} 
         onChangeText={(password)=>this.onValidateConfirmPassword(password)}
         style={[styles.inputStyle]}
          theme={themes.inputTheme}
          secureTextEntry={!this.state.visiblePassword2}
          left={<TextInput.Icon color={'#E1CB06'} name={"key-variant"} />}
          right={<TextInput.Icon color={'#E1CB06'} onPress={()=>{this.onVisiblePassword2()}} 
          name={this.state.visiblePassword2 ?"eye" :'eye-off'} />}
          error={this.isFieldInError('confirmPassword')}
          />
         
         <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('confirmPassword')}>
           {confirmErrorText}
         </HelperText>
         
         <Checkbox.Item style={{flexDirection:'row-reverse'}} 
         
         theme={themes.inputTheme}
          label={policyText}
          labelStyle={{fontSize:14,color:'#BCBBBB',textDecorationLine:'underline'}}
           status={this.state.checkPolicy} 
           onPress={()=>this.onCheckPolicy()}
           />
           
         <Button loading={this.state.loadingButton} disabled={!this.state.disableButton}  onPress={()=>this.onRegister()}
         style={{backgroundColor:this.state.disableButton ?'#234A85':'transparent',padding:5,borderWidth:2,borderColor:'#234A85'}} labelStyle={{color:'#fff'}}>
           S'inscrire
           </Button>
         
         </View>
         <View style={styles.bottomStyle}>
   
           <Caption style={{color:"#BCBBBB",textAlign:'center'}}>Vous avez déjà un compte ? 
           <Caption onPress={()=>this.props.navigation.navigate('Login')} style={{fontWeight:'bold',textDecorationLine:"underline",color:'#BCBBBB'}}>Connectez-vous</Caption></Caption>
         
           </View>
       </ImageBackground>
     );
  }

};


export default RegisterScreen;