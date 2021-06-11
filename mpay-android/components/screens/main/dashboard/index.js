import React from 'react'
import {View,Text} from 'react-native'
import {Paragraph,Title,Caption} from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'
const moment =require('moment')
function Dashboard() {
    const [timer,setTimer]=React.useState(moment().format('h:mm:ss a'))

    React.useEffect(()=>{
        setInterval(
            ()=>setTimer(moment().format('h:mm:ss a'))
        , 1000);
    })

    return (
        <View style={{padding:10,flex:1}}>
            <View>
            <View  style={{flexDirection:'row',justifyContent:'space-between',margin:5}}>
            <Title>Dashboard</Title>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <MaterialCommunityIcons name="clock-outline" size={18}/>
            <Paragraph > { timer}</Paragraph>
            </View>
            </View>
            
            </View>
            
            <LinearGradient colors={['#234A85', '#234A85', '#E1E2E4']} style={{backgroundColor:'#234A85',padding:10,justifyContent:'space-between',borderRadius:10}}>
                <View style={{}}>

                <Caption style={{color:'#fff'}}>Balance</Caption>
               
                </View>
                <View>

                <Text style={{color:'#fff',fontSize:60}}>0.00 HTG</Text>
                <Paragraph>{moment().format('MMMM Do YYYY')}</Paragraph>
                </View>
            </LinearGradient>
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Paragraph>Aucune activité pour aujourd'hui</Paragraph>
            </View>
        </View>
    )
}

export default Dashboard
