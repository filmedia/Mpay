import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet, AsyncStorage} from 'react-native'
import {Paragraph,Caption,Title,Avatar,Drawer,Divider,Dialog,Portal,Button} from 'react-native-paper'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchCurrentAccount,fetchCurrentUser} from '../../core/actions/fetchData'
import firebase from '../../firebase'
function DrawerContent(props) {
    const [active, setActive] = React.useState('');
    const [visibleDialog, setVisibleDialog] = React.useState('');
    const theme={colors:{ text:'#fff'} }
    React.useCallback(()=>{
        props.fetchCurrentAccount()
        props.fetchCurrentUser()
    })

    const {id,user_type}=props.account!==undefined ?props.account :[]
    const {firstname,lastname,photoUrl,telephone}=props.user!==undefined ?props.user :[]
    const showDialog = () => setVisibleDialog(true);

  const hideDialog = () => setVisibleDialog(false);

  const onSignOut=()=>{
    firebase.default.auth().signOut().then(()=>{
        //AsyncStorage.clear()
    })
    hideDialog()
    // update(`user/${firebase.auth().currentUser.uid}`,
    // {"status":'logged out'})

    // //Restart()
    // setVisibleAlertLogout(false)
}
    return (
        
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}
             style={{flexDirection:'row',alignItems:'center',padding:10}}>
        <Avatar.Image size={60} source={{uri:photoUrl}} />
               
               <View style={{marginLeft:10}}>
                <Paragraph   style={{fontWeight:'bold',textTransform:'capitalize'}}>{`${firstname} ${lastname}`}</Paragraph>
                <Caption >{'+509'+telephone}</Caption>
               </View>

            </TouchableOpacity>
            <Divider/>
            <Drawer.Section  style={{}}>
            <Drawer.Item
                style={{color:'red'}}
                label="Accueil"
                active={active === 'first'}
                onPress={() => props.navigation.navigate('Home')}
                icon="home"
               
            />
            <Drawer.Item
                label="Profil"
                active={active === 'second'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="account"
                
            />
            <Drawer.Item
                label="Parametres"
                active={active === 'second'}
                //onPress={() => props.navigation.navigate('Profile')}
                icon="settings"
                
            />
            <Drawer.Item
                label="Support"
                active={active === 'second'}
                //onPress={() => props.navigation.navigate('Profile')}
                icon="help"
               
            />
            
            <Drawer.Item
                label="Securité Politique de confidentialité"
                active={active === 'second'}
                //onPress={() => props.navigation.navigate('Profile')}
                icon="security"
                
            />
            
            </Drawer.Section>
            </DrawerContentScrollView>

            <Drawer.Section >
            <Drawer.Item
                
                label="Deconnexion"
                active={active === 'first'}
                onPress={() => showDialog()}
                icon="logout"
                theme={{colors:{ text:'red'} }}
            />
            
            </Drawer.Section>
            <Portal>
        <Dialog visible={visibleDialog}  onDismiss={hideDialog}>
          <Dialog.Title>Deconnexion ?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Êtes vous sur de vouloir vous déconnecter ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Annuler</Button>
            <Button onPress={onSignOut}>Oui</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
        </View>
    )
}

const styles=StyleSheet.create({

})
const mapStateToProps = (state) => ({
    account:state.userState.account[0],
    user:state.userState.user[0]
    
  })
  
  const mapDispatchToProps=dispatch=>bindActionCreators({fetchCurrentAccount,fetchCurrentUser},dispatch)
  
  export default connect(mapStateToProps,mapDispatchToProps)(DrawerContent)

