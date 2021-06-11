import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet,View,TouchableOpacity} from 'react-native';

import { HelperText, TextInput,Button,Checkbox,Title,Caption,TextInputMask,Paragraph,Icon  } from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {styles,themes} from './styles'
import firebase from '../../../firebase'

// const client = require('twilio')('ACa0eea2da413f8800cd68505b78118736',
// 'd08aac79de9b5b64df43ef616a0407ea');

const styles1 = StyleSheet.create({
  root: {flex: 1, padding: 20,justifyContent:'center'},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#234A85',
    borderBottomWidth: 2,
  },
});

// const sendSms=()=>{
//   client.messages.create({
//     body: 'Hello from Node',
//     to: '+12345678901',
//     from: '+16108549561'
//  }).then(message => console.log(message))
//    // here you can implement your fallback code
//    .catch(error => console.log(error))
// }

const CELL_COUNT = 5;

const VerificationScreen = (props) => {
  const [value, setValue] = useState('');
  const [disableButton,setDisableButton]=React.useState(false)
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props2, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  React.useLayoutEffect(()=>{
    
    //alert(value.length)
    value.length==5
    ?setDisableButton(false)
    :setDisableButton(true)
   })

  return (
    <SafeAreaView style={styles1.root}>
    <Paragraph>Nous vous avons envoyé un code pour vérifier votre numéro de téléphone</Paragraph>
      <Caption>Envoyé à <Caption style={{fontWeight:'bold'}}>{props.route.params.phoneNumber}</Caption></Caption>
      <CodeField
        ref={ref}
        {...props2}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles1.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles1.cell, isFocused && styles1.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      
     
      <View style={{marginTop:20}}>

    <Button disabled={disableButton} onPress={()=>props.navigation.navigate('CreateUser')} 
      style={{backgroundColor:!disableButton ?'#234A85':'transparent',padding:5,borderWidth:2,borderColor:'#234A85'}} 
      labelStyle={{color:disableButton ?'#234A85':'#fff'}}>Verifier</Button>
        <Caption style={{textAlign:'center',margin:30}}>Je n'ai pas reçu de code</Caption>

        <Button labelStyle={{color:'#234A85'}} onPress={()=>setValue('')}>renvoyer le code</Button>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;