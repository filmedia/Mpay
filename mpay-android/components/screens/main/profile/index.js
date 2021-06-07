import React from 'react'
import {  View,Text,ImageBackground,StyleSheet,ScrollView,Picker } from 'react-native';
import { Avatar,HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Snackbar ,Icon,RadioButton  } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Col, Row, Grid } from "react-native-easy-grid";
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchCurrentAccount,fetchCurrentUser} from '../../../../core/actions/fetchData'
import firebase from '../../../../firebase'
import {post,update} from '../../../../core/helpers/apiAction'

function Profile(props) {
    const [image,setImage]=React.useState(null)
    const [visibleSnack,setVisibleSnack]=React.useState(false)
    const onDismissSnackBar = () => setVisibleSnack(false);

   const onPickFromGallery=async()=>{
  
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        
        if (!result.cancelled) {
        setImage(result.uri)
        onUploadImage(result.uri)
        }
      };

      const onUploadImage= async(image)=>{
       
        //this.setState({uploading:true})
        
       
        const childPath=`users`
        
        const response=await fetch(image)
        const blob=await response.blob()
        const task=firebase.default.storage()
        .ref()
        .child(childPath)
        .put(blob)

        const taskProgress=snapshot=>{
            console.log(`transferred=> ${snapshot.totalBytes-snapshot.bytesTransferred}`);
        }

        const taskError=snapshot=>{
            alert(snapshot)
            console.log('error');
        }

        const taskCompleted=()=>{
            
            task.snapshot.ref.getDownloadURL()
            .then((snapshot)=>{
                setVisibleSnack(true)
               
                // update(`student/${props.user.id}`,{photoUrl:snapshot}).finally(()=>{
                //     props.fetchCurrentUser()
                // })
                //this.props.updateProfile({photoUrl:snapshot})
               
                    //Toast.toastify.show(<TransText dictionary={translate.yourProfileHasBeenUpdated}/>, 2000)
                    //this.setState({uploading:false})
              
                
            })
        }

        task.on("state_changed",taskProgress,taskError,taskCompleted)
    }


      React.useCallback(()=>{
        props.fetchCurrentAccount()
        props.fetchCurrentUser()
    })

    React.useLayoutEffect(()=>{
        props.navigation.setOptions({
           title:'Mon profil'
          })
    })

    const {id,user_type,accountKey}=props.account!==undefined ?props.account :[]
    const {firstname,lastname,email,telephone,status,vacation,photoUrl,option,level,sexe}
    =props.user!==undefined ?props.user :[]

    return (
        <View style={{flex:1}}>
           <View style={{alignItems:'center',padding:4}}>
           <Avatar.Image size={100} source={{uri:image!==null?
            image:photoUrl}} />
           <Button onPress={onPickFromGallery} labelStyle={{color:'#234A85',fontSize:12}}>Modifier photo</Button>
           
            
           </View>
          
           <Grid style={{padding:10}}>
           <Row size={2}>
                <Col size={25}>
                <Paragraph><MaterialCommunityIcons color="#234A85" name="account" size={20}/></Paragraph>
                </Col>
                <Col size={75}>
                <Paragraph style={{textTransform:'capitalize'}}>{`${firstname} ${lastname}`}</Paragraph>
                {
                        user_type=='student'
                        ?<Caption>Etudiant</Caption>
                        :<Caption>{status}</Caption>
                    }
                
                </Col>
           </Row>
           <Row size={2}>
                <Col size={25}>
                <Paragraph><MaterialCommunityIcons color="#234A85" name="gender-male-female" size={20}/></Paragraph>
                </Col>
                <Col size={75}>
                <Paragraph>{sexe=="M" ?"Homme":"Femme"}</Paragraph>
                </Col>
           </Row>
           <Row size={2}>
                <Col size={25}>
                <Paragraph><MaterialCommunityIcons color="#234A85" name="email" size={20}/></Paragraph>
                </Col>
                <Col size={75}>
                <Paragraph>{email}</Paragraph>
                </Col>
           </Row>
           <Row size={2}>
                <Col size={25}>
                <Paragraph><MaterialCommunityIcons color="#234A85" name="phone" size={20}/></Paragraph>
                </Col>
                <Col size={75}>
                <Paragraph>{telephone}</Paragraph>
                </Col>
           </Row>
           {
            user_type=='student'
           ?<Row size={2}>
                <Col size={25}>
                <Paragraph><MaterialCommunityIcons color="#234A85" name="information" size={20}/></Paragraph>
                </Col>
                <Col size={75}>
                <Paragraph>3eme annee {`${option}`}</Paragraph>
                        <Caption>
                            {vacation=="mat"?"Matin" :vacation=="med"?"Median":"Soir"}
                        </Caption>
                </Col>
           </Row>
           :null
           }
           <Row size={2}>
                <Col size={25}>
                <Paragraph><MaterialCommunityIcons color="#234A85" name="key" size={20}/></Paragraph>
                </Col>
                <Col size={75}>
                <Paragraph>{accountKey}</Paragraph>
                
                </Col>
           </Row>
            
           </Grid>
          

           <View style={{flexDirection:'row',justifyContent:'center'}}>

           <Button onPress={()=>props.navigation.navigate( user_type=='student'?'EditStudentProfile'
           :'EditStaffProfile',{user:props.user})} labelStyle={{color:'#234A85'}} >
               Modifier profil
           </Button>
           {/* <Button onPress={()=>props.navigation.navigate('EditStudentProfile')} labelStyle={{color:'#fff'}} style={[styles.buttonStyle,{backgroundColor:'#A6211D'}]}>
               Deconnexion
           </Button> */}
           </View>
           <Snackbar
           duration={6000}
        visible={visibleSnack}
        onDismiss={onDismissSnackBar}
        style={{backgroundColor:'#234A85'}}
        >
        Le profil a été mis à jour.
      </Snackbar>
        </View>
        
    )
}

const styles=StyleSheet.create({
    buttonStyle:{
        backgroundColor:'#234A85',padding:8,borderRadius:0,width:'50%'
    }   
})

const mapStateToProps = (state) => ({
    account:state.userState.account[0],
    user:state.userState.user[0]
    
  })
  
  const mapDispatchToProps=dispatch=>bindActionCreators({fetchCurrentAccount,fetchCurrentUser},dispatch)
  
  export default connect(mapStateToProps,mapDispatchToProps)(Profile)

