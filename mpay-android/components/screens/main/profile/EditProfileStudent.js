// import * as React from 'react';
// import {  View,Text,ImageBackground,StyleSheet,ScrollView,Picker,AsyncStorage } from 'react-native';
// import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon,RadioButton  } from 'react-native-paper';
// import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
// import {styles,themes} from './styles'
// import {post,update} from '../../../../core/helpers/apiAction'
// import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
// import {fetchCurrentAccount,fetchCurrentUser} from '../../../../core/actions/fetchData'
// function Form (props) {
//   //console.error(props.route.params);

//   const {user}=props.route.params
  
//   const [studentId, setStudentId] = React.useState(user.studentId);
//   const [firstname, setFirstName] = React.useState(user.firstname);
//   const [lastname, setLastName] = React.useState(user.lastname);
//   const [sexe, setSexe] = React.useState(user.sexe);
//   const [telephone, setTelephone] = React.useState(user.telephone);
//   const [email, setEmail] = React.useState(user.email);
  
//   const [address, setAddress] = React.useState(user.address);
//   const [option, setOption] = React.useState(user.option);
//   const [level, setLevel] = React.useState(user.level);
//   const [vacation, setVacation] = React.useState(user.vacation);

//   const [validateFirstName,setValidateFirstName]=React.useState(false)
//   const [validateLastName,setValidateLastName]=React.useState(false)
//   const [validateEmail,setValidateEmail]=React.useState(false)
//   const [validatePostal,setValidatePostal]=React.useState(false)
//   const [validateOption,setValidateOption]=React.useState(false)
//   const [validateSexe,setValidateSexe]=React.useState(false)
//   const [validateStudentId,setValidateStudentId]=React.useState(false)
//   const [validateTelephone,setValidateTelephone]=React.useState(false)

//   const [disableButton,setDisableButton]=React.useState(true)
 
//   const policyText=`J'ai lu et j'accepte les Conditions Générales d'Utilisation et la Politique de Protection des Données Personnelles.`
//   const passwordErrorText=`Seuls les lettres(a-z), chiffres (0-9), tirets(-) ou traits de soulignement (_) sont autorisés,
//   et doit avoir au moin 8 caracteres.`
//   const confirmErrorText="Le mot de passe de confirmation doit être le même."

//   const telErrorText="Numéro de téléphone invalide."
  
//   React.useLayoutEffect(()=>{
//     props.navigation.setOptions({
//        title:'Modifier profil'
//       })
// })


//   const onValidate=()=>{
    
//     const regexName = /^(([a-zA-Z]{2,32}))$/;
//     const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     const regexPostal=/^\\d{4}$/
//     const regexId=/^(([0-9]{5,32}))$/;
//     const regexTel = /^(([0-9+ ]{7,16}))$/;
    
//     !firstname || !regexName.test(firstname)
//     ?setValidateFirstName(true)
//     :setValidateFirstName(false)

//     !lastname || !regexName.test(lastname)
//     ?setValidateLastName(true)
//     :setValidateLastName(false)

//     !email || !regexEmail.test(email)
//     ?setValidateEmail(true)
//     :setValidateEmail(false)

//     !studentId || !regexId.test(studentId)
//     ?setValidateStudentId(true)
//     :setValidateStudentId(false)

     
//     !option
//     ?setValidateOption(true)
//     :setValidateOption(false)

//     !sexe
//     ?setValidateSexe(true)
//     :setValidateSexe(false)

//         if(telephone){
//         !regexTel.test(telephone)
//         ?setValidateTelephone(true)
//         :setValidateTelephone(false)
//         }else{
//             setValidateTelephone(false) 
//         }
//     if(!validateFirstName&&!validateLastName&&!validateEmail
//       &&!validateStudentId&&!validateOption&&!validateTelephone&&!validateSexe){
      
//     onUpdateUser()
//     }
//   }
//   const onUpdateUser=()=>{
//     var data={
//       studentId,firstname,lastname,sexe,telephone,email,option,level,vacation,
      
//     }
  
//      update(`student/${user.id}`,data)
//     .finally(response=>{
//       props.fetchCurrentUser()
//       props.navigation.goBack()
//     })
   
//   }



//  return (<ScrollView>
//     <View style={[styles.mainContainer]}>
        
//       <TextInput label="Code etudiant*" value={studentId} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setStudentId(val)} 
//        keyboardType="phone-pad"  
//        error={validateStudentId}
//        onFocus={()=>setValidateStudentId(false)}
//       />

//         <HelperText type="error" style={styles.errorText} visible={validateStudentId}>
//         {'error code'}
//        </HelperText>

//      <TextInput label="Prenom*" value={firstname} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setFirstName(val)} 
//        error={validateFirstName}
//        onFocus={()=>setValidateFirstName(false)}
//      />
//        <HelperText type="error" style={styles.errorText} visible={validateFirstName}>
//         {'error prenom'}
//        </HelperText>

//       <TextInput  label="Nom de famille*" value={lastname} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setLastName(val)} 
//        error={validateLastName}
//        onFocus={()=>setValidateLastName(false)}
//        />

//       <HelperText type="error" style={styles.errorText} visible={validateLastName}>
//         {'error nom'}
//       </HelperText>
     

// <RadioButton.Group value={sexe} onValueChange={newValue => {setSexe(newValue),setValidateSexe(false)}}   >
//     <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
//     <Paragraph style={{color:validateSexe?'#A6211D':"#234A85"}}>Sexe</Paragraph>
//       <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
//         <Paragraph style={{color:'#234A85'}}>Masculin</Paragraph>
//         <RadioButton value="M"   theme={themes.rdButtonTheme} />
//       </View>
//       <View style={{flexDirection:'row-reverse',alignItems:'center'}}>
//         <Paragraph style={{color:'#234A85'}}>Feminin</Paragraph>
//         <RadioButton value="F" theme={themes.rdButtonTheme} />
//       </View>
//     </View>
//     </RadioButton.Group>

//       <HelperText type="error" style={styles.errorText} visible={validateSexe}>
//         {'error sexe'}
//       </HelperText>

//       <TextInput label="Telephone" value={telephone} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setTelephone(val)} 
//        keyboardType="phone-pad" 
//        error={validateTelephone}
//         onFocus={()=>setValidateTelephone(false)}
//        />
//         <HelperText type="error" style={styles.errorText} visible={validateTelephone}>
//         {'error telephone'}
//       </HelperText>

//       <TextInput label="Email*" value={email} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setEmail(val)} 
//        keyboardType="email-address"  
//        error={validateEmail}
//        onFocus={()=>setValidateEmail(false)}
//        />

//     <HelperText type="error" style={styles.errorText} visible={validateEmail}>
//         {'error email'}
//       </HelperText>

//      <TextInput label="Adresse complete" value={address} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setAddress(val)} 
//        //keyboardType="phone-pad"  
//     />

//     <TextInput label="Option*" value={option} 
//        style={[styles.inputStyle]}
//        theme={themes.inputTheme}
//        onChangeText={(val)=>setOption(val)} 
//        error={validateOption}
//        onFocus={()=>setValidateOption(false)}

//     />
//     <HelperText type="error" style={styles.errorText} visible={validateOption}>
//         {'error option'}
//       </HelperText>

   
//         <Picker
//          selectedValue={level}
        
//         style={{ height: 50, width: 150,color:'#234A85',width:'100%' ,}}
//         onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
//         >
//         <Picker.Item label="Niveau*" />
//         <Picker.Item label="Premiere annee" value="l1" />
//         <Picker.Item label="Deuxieme annee" value="l2" />
//         <Picker.Item label="Troisieme annee" value="l3" />
//         <Picker.Item label="Quatrieme annee" value="l4" />
//         <Picker.Item label="Licence UQAM" value="uqam" />
//         <Picker.Item label="Maitrise" value="master" />
//       </Picker>


//       <Picker
//         selectedValue={vacation}
//         style={{ height: 50, width: 150,color:'#234A85',width:'100%' }}
//         onValueChange={(itemValue, itemIndex) => setVacation(itemValue)}
        
//         >
        
//         <Picker.Item label="Vacation*"  />
//         <Picker.Item label="Matin" value="mat" />
//         <Picker.Item label="Median" value="med" />
//         <Picker.Item label="Soir" value="soir" />
//       </Picker>

    
//       <Button  onPress={()=>onValidate()}
//       style={{backgroundColor:'#234A85',padding:5,borderWidth:2}} labelStyle={{color:'#fff'}}>Enregistrer</Button>
//       </View>
      
//     </ScrollView>
//   );
// };






// const mapDispatchToProps=dispatch=>bindActionCreators({fetchCurrentAccount,fetchCurrentUser},dispatch)

// export default connect(null,mapDispatchToProps)(Form)

import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,ScrollView,Picker,AsyncStorage } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon,RadioButton,Divider  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
import {post,update} from '../../../../core/helpers/apiAction'
import ValidationComponent from 'react-native-form-validator';
import SelectDropdown from 'react-native-select-dropdown'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
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
      email:user.telephone,
      address:user.address,
      level:user.level,
      vacation:user.vacation,
      option:user.option,
      disableButton:true
    }
  }

  componentDidMount=()=>{
    console.log(this.props.route.params)
  }
 
  
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
    ?this.onCreateUser()
    :alert('error')
  }
  
  
   onCreateUser=()=>{
     const {studentId,firstname,lastname,sexe,phoneNumber,email,option,level,vacation}=this.state
    AsyncStorage.getItem('account').then(value=>{
      const account=JSON.parse(value)
      var data={
        studentId,firstname,lastname,sexe,phoneNumber,email,option,level,vacation,
        accountId:account.id
      }
       post("student",data)
      .then(response=>{
        AsyncStorage.setItem("auth","true")
      })
      .catch(error=>alert(error))
    })
  }


render(){
  const {studentId,firstname,lastname,sexe,phoneNumber,address,email,option,level,vacation}=this.state
  return (<ScrollView>
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
          (selectedItem)=>(<Paragraph style={{color:'#234A85',fontSize:17}}>{selectedItem}</Paragraph>)
        }
          data={['Premiere année','Deuxieme année','Troisieme année','Quatrieme année','Licence UQAM','Maîtrise']}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
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
          (selectedItem)=>(<Paragraph style={{color:'#234A85',fontSize:17}}>{selectedItem}</Paragraph>)
        }
          data={['Matin','Median','Soir']}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
       />
     
       <Button  onPress={()=>this.onValidate()}
       style={{backgroundColor:'#234A85',padding:5,borderWidth:2}} labelStyle={{color:'#fff'}}>Terminer</Button>
       </View>
       
     </ScrollView>
   );
}
};




const mapDispatchToProps=dispatch=>bindActionCreators({fetchCurrentAccount,fetchCurrentUser},dispatch)

export default connect(null,mapDispatchToProps)(Form)