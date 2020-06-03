import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View, Text, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>Home Screen</Text> */}
      <Button mode="contained" onPress={() => navigation.navigate('Home')}>
    Login
  </Button>
      {/* <Button title="Login" onPress={() => navigation.navigate('HomeScreen')} /> */}
    </View>
  );
};