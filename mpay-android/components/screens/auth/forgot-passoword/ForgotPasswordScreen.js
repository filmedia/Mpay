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
class Form extends ValidationComponent {

  constructor(props){
    super(props)
    this.state={
      firstname:'',
      lastname:'',
      phoneNumber:'',
      disableButton:true,
      loadingButton:false
    }
  }
 
  
  onValidate=()=>{
    this.validate({
      firstname: {minlength:2, required: true},
      lastname: {minlength:2, required: true},
      phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true,required:true},
    });

    this.isFormValid()
    ?this.onCreateUser()
    :alert('error')
  }
  
  
   onCreateUser=()=>{
     this.setState({loadingButton:true})
     const {firstname,lastname,phoneNumber}=this.state
     var data={
      firstname,lastname,telephone:phoneNumber,
    }
     AsyncStorage.getItem('account').then(result=>{
      const user=JSON.parse(result)
      post("student",{...data,accountId:user.id})
      .finally(()=>{
        this.setState({loadingButton:false})
       firebase.default.auth().signInAnonymously().then(()=>{
        showMessage({
          message: `Felicitation ${firstname}!`,
          description:"Vous venez de creer un compte MPAY-INUKA",
          type: "info",
          backgroundColor: "#234A85"
        });
       })
      })
    })
    
    // AsyncStorage.getItem('account').then(value=>{
    //   const account=JSON.parse(value)
    //   var data={
    //     studentId,firstname,lastname,sexe,telephone:phoneNumber,email,option,level,vacation
    //   }
      

      
    // })
  }

  componentDidMount(){
    AsyncStorage.getItem("account").then(result=>{
    const account=JSON.parse(result)
     this.setState({phoneNumber:account.telephone})
    })
  }


render(){
  const {studentId,firstname,lastname,sexe,phoneNumber,address,email,option,level,vacation}=this.state
  return (<ScrollView>
     <View style={[styles.mainContainer]}>
      <Paragraph>Veuillez saisir les infromations suivantes pour verification.</Paragraph>

      <TextInput label="Prénom*" value={firstname} 
        ref="firstname"
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(firstname)=>this.setState({firstname})} 
        error={this.isFieldInError('firstname')}
       
      />
        <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('firstname')}>
         {'Veuillez fournir votre prenom!'}
        </HelperText>
 
       <TextInput  label="Nom de famille*" value={lastname} 
       ref="lastname"
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(lastname)=>this.setState({lastname})} 
        error={this.isFieldInError('lastname')}
       
        />
 
       <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('lastname')}>
         {'Veuillez fournir votre nom de famille!'}
       </HelperText>
      
 
 
       
      
       <TextInput label="Telephone*" value={phoneNumber} 
       ref="phoneNumber"
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(phoneNumber)=>this.setState({phoneNumber})} 
        keyboardType="phone-pad" 
        error={this.isFieldInError('phoneNumber')}
        
        />
         <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('phoneNumber')}>
         {'Veuillez fournir un numero de telephone valide!'}
       </HelperText>
       
 
       
     
 
 
    
        
     
       <Button loading={this.state.loadingButton} onPress={()=>this.onValidate()}
       style={{backgroundColor:'#234A85',padding:5,borderWidth:2}} labelStyle={{color:'#fff'}}>Verifier</Button>
       </View>
       
     </ScrollView>
   );
}
};


export default Form;