
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text,View,TouchableOpacity} from 'react-native'
import {Paragraph,Caption,Title,Appbar} from 'react-native-paper'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchStaffData,fetchStudentData,fetchCurrentUser,clearData} from '../../../core/actions/fetchData'
import DashboardScreen from './dashboard'

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
class Main extends Component {
 
  componentDidUpdate(){
    if(this.props.currentUser!==undefined){
      this.props.currentUser.user_type=="student"||this.props.currentUser.user_type=="none"
      ?this.props.fetchStudentData()
      :this.props.fetchStaffData()
     }
  }
  componentDidMount(){
    this.props.fetchCurrentUser()
  }
    render() {
      this.props.navigation.setOptions({
        header:()=>(
          <View style={{backgroundColor:'#234A85',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
             <MaterialCommunityIcons name="menu" color={"#fff"} size={30} />
            </TouchableOpacity>

            <TouchableOpacity>
             <MaterialCommunityIcons name="message-text-outline" color={"#fff"} size={25} />
            </TouchableOpacity>
            
          </View>
        ),
      })
        return (
        
            <Tab.Navigator
              initialRouteName="Dashboard"
             
              tabBarOptions={{
                activeTintColor: '#234A85',
                showLabel:false
              }}
            >
              <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
               
                options={{
                  tabBarLabel: 'Dashboard',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="view-dashboard" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Pay"
              
                component={()=>null}
                options={{
                  tabBarLabel: 'Pay',
                  
                  tabBarIcon: ({ color, size }) => (
                      <View style={{width:80,height:80,backgroundColor:'#234A85',
                      justifyContent:'center',alignItems:'center',padding:5}}>
                           <MaterialCommunityIcons name="qrcode-scan" color={"#fff"} size={40} />
                      </View>
                  ),
                }}
              />
              <Tab.Screen
                name="Profile"
                component={()=>null}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="history" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          );
    }
}


const mapStateToProps = (state) => ({
  currentUser:state.userState.currentUser[0],
  
})

const mapDispatchToProps=dispatch=>bindActionCreators({fetchStaffData,fetchStudentData,fetchCurrentUser,clearData},dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(Main)