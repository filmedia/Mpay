import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme,Provider as PaperProvider,Button,Title,Caption} from 'react-native-paper'



 function Landing() {
  return (
    <View style={styles.container}>
      <Title>Welcome</Title>
      <Caption>To</Caption>
      <Title>MPAY-INUKA</Title> 
      <Button>Register</Button>
      <Button>Login</Button>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Landing