import React, { useState } from 'react';
import { Title } from 'react-native-paper';
import { View, StyleSheet, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = (props) => {
    fetch("http://192.168.0.6:3000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            Alert.alert("Login successful!")
            navigation.navigate("Home")
        }).catch((err) => {
            console.error("err" + err);
            Alert.alert("Something went wrong!")

        });
}

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Title style={styles.titleText}>
        Login
        </Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
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