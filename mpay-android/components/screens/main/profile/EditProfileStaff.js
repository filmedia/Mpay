import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,ScrollView,Picker } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon,RadioButton  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
function Form (props) {
 
  const [studentId, setStudentId] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [sexe, setSexe] = React.useState('');
  const [telephone, setTelephone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [postal, setPostal] = React.useState('');
  const [address, setAddress] = React.useState('');
  
  const [type, setType] = React.useState('');
  const [vacation, setVacation] = React.useState('');

  const [validateFirstName,setValidateFirstName]=React.useState(false)
  const [validateLastName,setValidateLastName]=React.useState(false)
  const [validateEmail,setValidateEmail]=React.useState(false)
  const [validatePostal,setValidatePostal]=React.useState(false)
 
  const [validateSexe,setValidateSexe]=React.useState(false)
//   const [validateStudentId,setValidateStudentId]=React.useState(false)
  const [validateTelephone,setValidateTelephone]=React.useState(false)

  const [disableButton,setDisableButton]=React.useState(true)
 
  const policyText=`J'ai lu et j'accepte les Conditions Générales d'Utilisation et la Politique de Protection des Données Personnelles.`
  const passwordErrorText=`Seuls les lettres(a-z), chiffres (0-9), tirets(-) ou traits de soulignement (_) sont autorisés,
  et doit avoir au moin 8 caracteres.`
  const confirmErrorText="Le mot de passe de confirmation doit être le même."

  const telErrorText="Numéro de téléphone invalide."
  
  React.useLayoutEffect(()=>{
    props.navigation.setOptions({
       title:'Modifier profil'
      })
})


  const onValidate=()=>{
    const regexName = /^(([a-zA-Z]{2,32}))$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPostal=/^\\d{4}$/
    const regexId=/^(([0-9]{5,32}))$/;
    const regexTel = /^(([0-9+ ]{7,16}))$/;
    
    !firstname || !regexName.test(firstname)
    ?setValidateFirstName(true)
    :setValidateFirstName(false)

    !firstname || !regexName.test(firstname)
    ?setValidateLastName(true)
    :setValidateLastName(false)

    !email || !regexEmail.test(email)
    ?setValidateEmail(true)
    :setValidateEmail(false)

   
    if(postal){
    !regexPostal.test(postal)
    ?setValidatePostal(true)
    :setValidatePostal(false)
    }else{
        setValidatePostal(false) 
    }
     
   
    !sexe
    ?setValidateSexe(true)
    :setValidateSexe(false)

        if(telephone){
        !regexTel.test(telephone)
        ?setValidateTelephone(true)
        :setValidateTelephone(false)
        }else{
            setValidateTelephone(false) 
        }

  }
 



 return (<ScrollView>
    <View style={[styles.mainContainer]}>
        
      

     <TextInput label="Prenom*" value={firstname} 
       style={[styles.inputStyle]}
       theme={themes.inputTheme}
       onChangeText={(val)=>setFirstName(val)} 
       error={validateFirstName}
       onFocus={()=>setValidateFirstName(false)}
     />
       <HelperText type="error" style={styles.errorText} visible={validateFirstName}>
        {'error prenom'}
       </HelperText>

      <TextInput  label="Nom de famille*" value={lastname} 
       style={[styles.inputStyle]}
       theme={themes.inputTheme}
       onChangeText={(val)=>setLastName(val)} 
       error={validateLastName}
       onFocus={()=>setValidateLastName(false)}
       />

      <HelperText type="error" style={styles.errorText} visible={validateLastName}>
        {'error nom'}
      </HelperText>
     

<RadioButton.Group value={sexe} onValueChange={newValue => {setSexe(newValue),setValidateSexe(false)}}   >
    <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
    <Paragraph style={{color:validateSexe?'#A6211D':"#234A85"}}>Sexe</Paragraph>
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

      <HelperText type="error" style={styles.errorText} visible={validateSexe}>
        {'error sexe'}
      </HelperText>

      <TextInput label="Telephone" value={telephone} 
       style={[styles.inputStyle]}
       theme={themes.inputTheme}
       onChangeText={(val)=>setTelephone(val)} 
       keyboardType="phone-pad" 
       error={validateTelephone}
        onFocus={()=>setValidateTelephone(false)}
       />
        <HelperText type="error" style={styles.errorText} visible={validateTelephone}>
        {'error telephone'}
      </HelperText>

      <TextInput label="Email*" value={email} 
       style={[styles.inputStyle]}
       theme={themes.inputTheme}
       onChangeText={(val)=>setEmail(val)} 
       keyboardType="email-address"  
       error={validateEmail}
       onFocus={()=>setValidateEmail(false)}
       />

    <HelperText type="error" style={styles.errorText} visible={validateEmail}>
        {'error email'}
      </HelperText>

     <TextInput label="Code postal" value={postal} 
       style={[styles.inputStyle]}
       theme={themes.inputTheme}
       onChangeText={(val)=>setPostal(val)} 
       error={validatePostal}
       onFocus={()=>setValidatePostal(false)}
       />

    <HelperText type="error" style={styles.errorText} visible={validatePostal}>
        {'error postal'}
      </HelperText>

     <TextInput label="Adresse complete" value={address} 
       style={[styles.inputStyle]}
       theme={themes.inputTheme}
       onChangeText={(val)=>setAddress(val)} 
       //keyboardType="phone-pad"  
    />

    
   
        

      <Picker
        selectedValue={type}
        style={{ height: 50, width: 150,color:'#234A85',width:'100%' }}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        
        >
        
        <Picker.Item label="Type de personnel*"  />
        <Picker.Item label="Personnel Administratif" value="P-AD" />
        <Picker.Item label="Personnel Academique" value="P-AC" />
        <Picker.Item label="Stagiaire" value="STG" />
      </Picker>

    
      <Button  onPress={()=>onValidate()}
      style={{backgroundColor:'#234A85',padding:5,borderWidth:2}} labelStyle={{color:'#fff'}}>Terminer</Button>
      </View>
      
    </ScrollView>
  );
};


export default Form;