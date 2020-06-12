import React, { useState } from 'react';
import { Title, RadioButton, Text } from 'react-native-paper';
import { View, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function RegisterScreen({ navigation }) {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createAccount = () => {
        fetch("http://192.168.0.6:3000/send-user", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert("User added!")
                navigation.navigate("Login")
            }).catch((err) => {
                console.error("err" + err);
                Alert.alert("Something went wrong!")

            });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Title component="h1" variant="h5">
                Register
        </Title>
            <FormInput
                labelName='First Name'
                value={fname}
                onChangeText={userFName => setFName(userFName)}
            />

            <FormInput
                labelName='Last Name'
                value={lname}
                onChangeText={userLName => setLName(userLName)}
            />
            {/* <Text style={{ fontSize: 16 }}>Gender</Text> */}
            {/* <RadioButton.Group
                onValueChange={gender => setGender(gender)}
            // gender={this.state.gender}
            >
                <RadioButton.Item label="Male" value={gender} />
                <RadioButton.Item label="Female" value={gender} />
                <RadioButton.Item label="Other" value={gender} />

            </RadioButton.Group> */}

            <FormInput
                labelName='Email'
                value={email}
                onChangeText={userEmail => setEmail(userEmail)}
            />
            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={userPassword => setPassword(userPassword)}
            />
            <FormButton
                title='Register'
                modeValue='contained'
                onPress={() => createAccount()}
            />
        </View>
    );
};