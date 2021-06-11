
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import StudentForm from './StudentForm'
import StaffForm from './StaffForm'

const Tab = createMaterialTopTabNavigator();

export default function MyTabs(props) {
    
  return (
    <Tab.Navigator
      initialRouteName="Student"
      tabBarOptions={{
        activeTintColor: '#234A85',
        labelStyle: { fontSize: 12 },
        showIcon:true,
        indicatorStyle:{backgroundColor:'#234A85'},
        style: {padding:1 },
      }}
    >
      <Tab.Screen
        name="Student"
        component={()=>{return <StudentForm {...props}/>}}
        options={{
            tabBarLabel: 'Etudiant',
            tabBarIcon: ({ color }) => {
                return <FontAwesome5 name="user-graduate" color={color} size={26} />
            },
          }}
      />
      <Tab.Screen
        name="Others"
        component={()=>{return <StaffForm {...props}/>}}
        options={{ tabBarLabel: 'Personel',
        tabBarIcon: ({ color }) => {
            return <FontAwesome5 name="user-tie" color={color} size={26} />
        }
     }}
      />
     
    </Tab.Navigator>
  );
}