

import * as React from 'react';
import {  View,Text,ImageBackground,StyleSheet,AsyncStorage } from 'react-native';
import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Avatar,Icon,Modal,
Portal,Provider  } from 'react-native-paper';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';
import {styles,themes} from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {post} from '../../../core/helpers/apiAction'
import ValidationComponent from 'react-native-form-validator';
import { render } from 'react-dom';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchCurrentAccount,fetchCurrentUser} from '../../../core/actions/fetchData'
import firebase from '../../../firebase'
import { get } from '../../../core/helpers/apiAction';
import { showMessage, hideMessage } from "react-native-flash-message";

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
      disableButton:false,
      visibleModal:false,
      loadingButton:false,
      loadingButton2:false

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
  

 componentDidMount(){
   if(this.props.currentUser){
     setTimeout(this.showModal,1500)
   }
 }

  showModal = () => this.setState({visibleModal:true});
   hideModal = () => this.setState({visibleModal:false});
 
  onLogin=()=>{
    var data={
      telephone:this.state.phoneNumber,
      password:this.state.password
    }
   
    
    this.validate({
      phoneNumber: {minlength:7, maxlength:15, required: true,numbers:true},
      password: {minlength:8, maxlength:24, required: true},
     
    });

    this.setState({loadingButton:true})
    this.isFormValid()
    ?get(`login/${JSON.stringify(data)}`)
    .then(user=>{
      if(user.length==1){
        //AsyncStorage.removeItem()
        AsyncStorage.setItem('account',JSON.stringify(user[0]))
        firebase.default.auth().signInAnonymously().then(e=>{
          this.setState({loadingButton:false})
          showMessage({
            message: `Content de vous revoir parmis nous!`,
            type: "info",
            backgroundColor: "#234A85"
          });
        })
      }else{
        this.setState({loadingButton:false})
        showMessage({
          message: "Desolé! Nous n’avons pas pu vous identifier.",
          description: "Vérifier votre mot de passe ou votre identifient",
          type: "danger",
        });
      }
    })
    
    
    
    //alert('valide')
    // ?post("account",data)
    // .then(response=>{
    //   AsyncStorage.setItem('account',JSON.stringify(response)).then(()=>{
    //     this.props.navigation.navigate('Verification',{phoneNumber})
    //   })
    // })
    // .catch(error=>alert(error))
    :null

  }

  onQuicklyLogin=()=>{
    this.setState({loadingButton2:true})
      this.hideModal()
      firebase.default.auth().signInAnonymously().then(e=>{
        this.setState({loadingButton2:false})
        showMessage({
          message: `Content de vous revoir parmis nous!`,
          type: "info",
          backgroundColor: "#234A85"
        });
      })
  }

  render(){
    const {firstname,lastname,photoUrl}=this.props.user!==undefined ?this.props.user:[]
    const {telephone}=this.props.currentUser!==undefined?this.props.currentUser:[]
    return (
      <>
       <ImageBackground style={{flex:1}} 
       resizeMode="cover"
       source={require('../../../assets/image/bg4.jpg')}>
            <View style={[styles.bgContainer]}>
            <View style={{alignItems:'center',height:100}}>
            <Text style={{color:'#fff',fontSize:40}}>MPAY-INUKA</Text>
            <Text style={{color:'#fff',fontSize:25}}>Connexion</Text>
            
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
   
         <Caption onPress={()=>this.props.navigation.navigate('ForgotPassword')} 
         style={{fontWeight:'bold',textDecorationLine:"underline",color:'#BCBBBB',textAlign:'center',margin:10}}>
        J'ai oublié le mot de passe
      </Caption>
         
         
           
         <Button loading={this.state.loadingButton} disabled={this.state.disableButton} onPress={()=>this.onLogin()} 
      style={{backgroundColor:!this.state.disableButton ?'#234A85':'transparent',padding:5,borderWidth:2,borderColor:'#234A85'}} labelStyle={{color:'#fff'}}>
        Se connecter
      </Button>

         </View>
         <View style={styles.bottomStyle}>
        <Caption style={{color:"#BCBBBB",textAlign:'center'}}>Vous n'avez pas encore de compte ? 
        <Caption onPress={()=>this.props.navigation.navigate('Register')} style={{fontWeight:'bold',textDecorationLine:"underline",color:'#BCBBBB'}}>Inscrivez-vous</Caption></Caption>
      
        </View>
      
   
        <Modal onDismiss={this.hideModal} visible={this.state.visibleModal} style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{backgroundColor:'#fff',padding:20,alignItems:'center',width:300,borderRadius:5}}>
            <Paragraph onPress={this.hideModal} style={{position:'absolute',right:5}}>
              <MaterialCommunityIcons name="close" size={20}/>
              </Paragraph>
            <Title>Connexion</Title>
            <View>
            <Avatar.Image size={100} source={{uri:photoUrl}} />
            </View>
           <Paragraph>{`${firstname} ${lastname}`}</Paragraph>
           <Caption>{"+509"+telephone}</Caption>

           <Button loading={this.state.loadingButton2} onPress={()=>this.onQuicklyLogin()}>Connecter</Button>
          </View>
         
        </Modal>
    
      
    </ImageBackground>
    </>
     );
  }

};



const mapStateToProps = (state) => ({
  currentUser:state.userState.currentUser[0],
  user:state.userState.user[0]
  
})

const mapDispatchToProps=dispatch=>bindActionCreators({fetchCurrentUser},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen)

