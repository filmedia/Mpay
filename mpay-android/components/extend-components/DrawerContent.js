import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import {Paragraph,Caption,Title,Avatar,Drawer} from 'react-native-paper'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchCurrentAccount,fetchCurrentUser} from '../../core/actions/fetchData'

function DrawerContent(props) {
    const [active, setActive] = React.useState('');
    const theme={colors:{ text:'#fff'} }
    React.useCallback(()=>{
        props.fetchCurrentAccount()
        props.fetchCurrentUser()
    })

    const {id,user_type}=props.account!==undefined ?props.account :[]
    const {firstname,lastname,photoUrl}=props.user!==undefined ?props.user :[]
    
    return (
        
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
            <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
        <Avatar.Image size={60} source={{uri:photoUrl}} />
               
               <View style={{marginLeft:10}}>
                <Paragraph  theme={theme} style={{fontWeight:'bold',textTransform:'capitalize'}}>{`${firstname} ${lastname}`}</Paragraph>
                <Caption theme={theme}>{user_type=='student'?'Etudiant':'Personel'}</Caption>
               </View>

            </View>
            <Drawer.Section  style={{}}>
            <Drawer.Item
                style={{color:'red'}}
                label="Accueil"
                active={active === 'first'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="home"
                theme={theme}
            />
            <Drawer.Item
                label="Profil"
                active={active === 'second'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="account"
                theme={theme}
            />
            <Drawer.Item
                label="Parametres"
                active={active === 'second'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="settings"
                theme={theme}
            />
            <Drawer.Item
                label="Support"
                active={active === 'second'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="help"
                theme={theme}
            />
            
            <Drawer.Item
                label="Securité Politique de confidentialité"
                active={active === 'second'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="security"
                theme={theme}
            />
            
            </Drawer.Section>
            </DrawerContentScrollView>

            <Drawer.Section >
            <Drawer.Item
                la
                label="Deconnexion"
                active={active === 'first'}
                onPress={() => props.navigation.navigate('Profile')}
                icon="logout"
                theme={{colors:{ text:'red'} }}
            />
            
            </Drawer.Section>

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

