import React, { useState } from 'react';
import { Title, RadioButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function RegisterScreen({ navigation }) {
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Title component="h1" variant="h5">
                Register
        </Title>
            <FormInput
                labelName='First Name'
                value={firstName}
                onChangeText={userFName => setFName(userFName)}
            />

            <FormInput
                labelName='Last Name'
                value={lastName}
                onChangeText={userLName => setLName(userLName)}
            />
            <Text style={{ fontSize: 16 }}>Gender</Text>
            <RadioButton.Group
                onValueChange={gender => setGender(gender)}
            // gender={this.state.gender}
            >
                <RadioButton.Item label="Male" value={gender} />
                <RadioButton.Item label="Female" value={gender} />
                <RadioButton.Item label="Other" value={gender} />

            </RadioButton.Group>

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
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};