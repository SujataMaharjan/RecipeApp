import React, { useState } from 'react';
import { Title } from 'react-native-paper';
import { View, StyleSheet, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function LoginScreen({ navigation }) {
  const postURL = "http://192.168.0.5:3000/login";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function userLogin() {
    fetch(postURL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        if (data) {
          Alert.alert("Login successful!")
          navigation.navigate("Home")
        }
        else {
          Alert.alert("Login unsuccessful!")
          navigation.navigate("Login")
        }
      }).catch((err) => {
        console.error("err" + err);
        Alert.alert("Something went wrong!")
      })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Title style={styles.titleText}>
        Login
        </Title>
      <FormInput
        labelName='Email'
        value={email}
        keyboardType="email-address"
        onChangeText={val => setEmail(val)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={val => setPassword(val)}
      />
      <FormButton
        title='Login'
        modeValue='contained'
        onPress={() => userLogin()}
      />
      <FormButton
        title='Not a member? Register here'
        modeValue='text'
        uppercase={false}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonLabel: {
    fontSize: 20
  },
  titleText: {
    fontSize: 30,
    marginBottom: 25
  },
  navButtonText: {
    fontSize: 16
  }
});