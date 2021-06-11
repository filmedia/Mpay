

import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,ScrollView,Picker,AsyncStorage } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Snackbar,Icon,RadioButton,Divider  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
import {post,update} from '../../../../core/helpers/apiAction'
import ValidationComponent from 'react-native-form-validator';
import SelectDropdown from 'react-native-select-dropdown'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchStaffData} from '../../../../core/actions/fetchData'
class Form extends ValidationComponent {

  constructor(props){
    super(props)
    const {user}=this.props.route.params
    this.state={
      
    
      firstname:user.firstname,
      lastname:user.lastname,
      sexe:user.sexe,
      phoneNumber:user.telephone,
      email:user.email,
      address:user.address,
      staff_type:user.staff_type,
      disableButton:true,
      visibleSnack:false,
      loadingButton:false
    }
  }

   onDismissSnackBar = () => this.setState({visibleSnack:false},()=>{
     this.props.navigation.goBack()
   });
 
  
  onValidate=()=>{
    this.validate({
      firstname: {minlength:2, required: true},
      lastname: {minlength:2, required: true},
      email: {email: true,required:true},
      phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true,required:true},
      sexe: {required: true},
      option: {required: true},
      level: {required: true},
      staff_type: {required: true},
     
    });

    this.isFormValid()
    ?this.onUpdateUser()
    :null
  }
  
  
  

   onUpdateUser=()=>{
    this.setState({loadingButton:true})
     const {firstname,lastname,sexe,telephone,email,staff_type,address}=this.state
    const id= this.props.route.params.user.id
     var data={
      firstname,lastname,sexe,telephone,email,staff_type,address
    }
  
     update(`staff/${id}`,data)
     .then(()=>{
    })
    .finally(()=>{
      this.setState({loadingButton:false})
      this.setState({visibleSnack:true})
    })
    this.props.fetchStaffData()
    //this.props.navigation.goBack()
   
  }

render(){
  this.props.navigation.setOptions({
    title:'Modifier profil'
   })
  const {firstname,lastname,sexe,phoneNumber,address,email,staff_type}=this.state
  return (
  <View>
      
  <ScrollView>
     <View style={[styles.mainContainer]}>
    
      
 
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
      
 
 <RadioButton.Group value={sexe} onValueChange={sexe => {this.setState({sexe})}}
 ref="sexe" 
   >
     
     <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
     <Paragraph style={{color:this.isFieldInError('sexe')?'#A6211D':"#234A85"}}>Sexe*</Paragraph>
       <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
         <Paragraph style={{color:'#234A85'}}>Masculin</Paragraph>
         <RadioButton value="M"   theme={themes.rdButtonTheme} />
       </View>
       <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
         <Paragraph style={{color:'#234A85'}}>Feminin</Paragraph>
         <RadioButton value="F" theme={themes.rdButtonTheme} />
       </View>
     </View>
     </RadioButton.Group>
 
       <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('sexe')}>
       {'Veuillez selectionner votre sexe!'}
       </HelperText>
       <Divider style={{height:1.5}}/>
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
       
 
       <TextInput label="Email*" value={email} 
       ref="email"
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(email)=>this.setState({email})} 
        keyboardType="email-address"  
        error={this.isFieldInError('email')}
       
        />
 
     <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('email')}>
     {'Veuillez fournir un email valide!'}
       </HelperText>
 
      <TextInput label="Adresse complete" value={address} 
      ref="address"
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(address)=>this.setState({address})} 
        //keyboardType="phone-pad"  
     />
 
 <SelectDropdown
          ref="staff_type"
        buttonStyle={{width:'100%'}}
        defaultButtonText={'Type de personnel*'}
        renderCustomizedButtonChild={
          (selectedItem)=>(<Paragraph style={{color:'#234A85',fontSize:17}}>{!staff_type ?selectedItem:staff_type}</Paragraph>)
        }
          data={['Personnel Administratif','Personnel Academique','Stagiaire','Autre']}
          onSelect={(selectedItem, index) => {
            this.setState({staff_type:selectedItem})
          }}
       />
 
        <Divider style={{height:1.5}}/>
        <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('staff_type')}>
        {"Veuillez selectionner un type de personnel!"}
       </HelperText>

        
     
       <Button loading={this.state.loadingButton}  onPress={()=>this.onValidate()}
       style={{backgroundColor:'#234A85',padding:5,borderWidth:2}} labelStyle={{color:'#fff'}}>Enregister</Button>
      
       </View>
       
     </ScrollView>
     <Snackbar
           duration={3000}
        visible={this.state.visibleSnack}
        onDismiss={this.onDismissSnackBar}
        
        style={{backgroundColor:'#234A85'}}
        >
        Le profil a été mis à jour.
      </Snackbar>
     </View>
   );
}
};




const mapDispatchToProps=dispatch=>bindActionCreators({fetchStaffData},dispatch)

export default connect(null,mapDispatchToProps)(Form)