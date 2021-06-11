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
import {fetchStudentData} from '../../../../core/actions/fetchData'
class Form extends ValidationComponent {

  constructor(props){
    super(props)
    const {user}=this.props.route.params
    this.state={
      
      studentId:user.studentId,
      firstname:user.firstname,
      lastname:user.lastname,
      sexe:user.sexe,
      phoneNumber:user.telephone,
      email:user.email,
      address:user.address,
      level:user.level,
      vacation:user.vacation,
      option:user.option,
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
      studentId: {numbers: true,minlength:5,required:true},
    });

    this.isFormValid()
    ?this.onUpdateUser()
    :alert('error')
  }
  
  
  

   onUpdateUser=()=>{
     this.setState({loadingButton:true})
     const {studentId,accountId,firstname,lastname,sexe,telephone,email,option,level,vacation,address}=this.state
    const id= this.props.route.params.user.id
     var data={
      studentId,firstname,lastname,sexe,telephone,email,option,level,vacation,address
    }
  
     update(`student/${id}`,data)
     .then(()=>{
    })
    .finally(()=>{
      this.setState({loadingButton:false})
      this.setState({visibleSnack:true})
    })
    this.props.fetchStudentData()
    //this.props.navigation.goBack()
   
  }

render(){
  this.props.navigation.setOptions({
    title:'Modifier profil'
   })
  const {studentId,firstname,lastname,sexe,phoneNumber,address,email,option,level,vacation}=this.state
  return (
  <View>
      
  <ScrollView>
     <View style={[styles.mainContainer]}>
    
       <TextInput label="Code etudiant*" value={studentId}
       ref="studentId" 
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(studentId)=>this.setState({studentId})} 
        keyboardType="phone-pad"  
        error={this.isFieldInError('studentId')}
       />
 
         <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('studentId')}>
         {"Veuillez fournir votre code d'etudiant!"}
        </HelperText>
 
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
 
     <TextInput label="Option*" value={option} 
     ref="option"
        style={[styles.inputStyle]}
        theme={themes.inputTheme}
        onChangeText={(option)=>this.setState({option})} 
        error={this.isFieldInError('option')}
        
 
     />
     <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('option')}>
     {'Veuillez fournir une option!'}
       </HelperText>
 
    
        
          <SelectDropdown
          ref="level"
        buttonStyle={{width:'100%'}}
        defaultButtonText={'Niveau*'}
        renderCustomizedButtonChild={
          (selectedItem)=>(<Paragraph style={{color:'#234A85',fontSize:17}}>{!level ?selectedItem :level}</Paragraph>)
        }
          data={['1ère année','2ème année','3ème année','4ème année','Licence UQAM','Maîtrise']}
          onSelect={(selectedItem, index) => {
            this.setState({level:selectedItem})
            
          }}
       />
 
        <Divider style={{height:1.5}}/>
        <HelperText type="error" style={styles.errorText} visible={this.isFieldInError('level')}>
        {"Veuillez selectionner un niveau d'etude!"}
       </HelperText>
       <SelectDropdown
          ref="vacation"
        buttonStyle={{width:'100%'}}
        defaultButtonText={'Vacation'}
        renderCustomizedButtonChild={
          (selectedItem)=>(<Paragraph style={{color:'#234A85',fontSize:17}}>{!vacation ?selectedItem :vacation}</Paragraph>)
        }
        
          data={['Matin','Median','Soir']}
          onSelect={(selectedItem, index) => {
            this.setState({vacation:selectedItem})
          
          }}
       />
     
       <Button loading={this.state.loadingButton} onPress={()=>this.onValidate()}
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




const mapDispatchToProps=dispatch=>bindActionCreators({fetchStudentData},dispatch)

export default connect(null,mapDispatchToProps)(Form)