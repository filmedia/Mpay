import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,ScrollView,Picker,AsyncStorage } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon,RadioButton,Divider  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
import {post} from '../../../../core/helpers/apiAction'
import ValidationComponent from 'react-native-form-validator';
import SelectDropdown from 'react-native-select-dropdown'
import firebase from '../../../../firebase'
import { showMessage, hideMessage } from "react-native-flash-message";

const passwordErrorText=`Seuls les lettres(a-z), chiffres (0-9), tirets(-) ou traits de soulignement (_) sont autorisés,
et doit avoir au moin 8 caracteres.`
const confirmErrorText="Le mot de passe de confirmation doit être le même."


class Form extends ValidationComponent {

  constructor(props){
    super(props)
    this.state={
      firstname:'',
      lastname:'',
      phoneNumber:'',
      disableButton:true,
      loadingButton:false,
      visiblePassword2:false,
      visiblePassword1:false,
    }
  }
 
  
  onValidate=()=>{
    this.validate({
      firstname: {minlength:2, required: true},
      lastname: {minlength:2, required: true},
      phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true,required:true},
    });

    this.isFormValid()
    ?this.onRegister()
    :alert('error')
  }
  
  onVisiblePassword1 = () =>{
    this.setState({visiblePassword1:this.state.visiblePassword1?false:true})
  };
  onVisiblePassword2 = () =>{
    this.setState({visiblePassword2:this.state.visiblePassword2?false:true})
  };
  
 
  onRegister=()=>{
    
    
   
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

  componentDidMount(){
    AsyncStorage.getItem("account").then(result=>{
    const account=JSON.parse(result)
     this.setState({phoneNumber:account.telephone})
    })
  }


render(){
 
  return (<ScrollView>
     <View style={[styles.mainContainer]}>
    

      
      
 
 
       
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
 
    
       <Button loading={this.state.loadingButton} onPress={()=>this.onValidate()}
       style={{backgroundColor:'#234A85',padding:5,borderWidth:2}} labelStyle={{color:'#fff'}}>Modifier</Button>
       </View>
       
     </ScrollView>
   );
}
};


export default Form;