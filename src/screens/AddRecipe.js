import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import * as Permissions from 'expo-permissions';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


export default function AddRecipe({ navigation }) {
    //name->state variable, setName->method
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [ingridients, setIngridients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [notes, setNotes] = useState("")
    const [picture, setPicture] = useState("")
    // const [modal, setModal] = useState("")
    

    const addRecipe = () => {
        fetch("http://192.168.0.6:3000/send-recipe", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                ingridients,
                instructions,
                notes,
                picture
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                Alert.alert("Recipe added!")
                navigation.navigate("Home")
            }).catch(err => {
                Alert.alert("Something went wrong")
            })
    }

   const selectFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, res => {
            console.log('Response = ', res);

            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
                alert(res.customButton);
            } else {
                let source = res;
                // setPicture(data)
                // setPicture({
                //     resourcePath: source,

                // });
                let newfile = {
                    uri:source.uri, 
                    type:`img/${source.uri.split(".")[1]}`,
                    name:`img/${source.uri.split(".")[1]}`
                }
                handleUpload(newfile)
            }
            
        });
        const handleUpload = (image)=>{
            const data = new FormData()
            data.append('file', image)
            setPicture(data.url)
        }
    };

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <FormInput
                labelName='Name'
                value={name}
                onChangeText={recipe_name => setName(recipe_name)}
            />
                <FormInput
                    labelName='description'
                    value={description}
                    onChangeText={desc => setDescription(desc)}
                />
                <FormInput
                    labelName='ingridients'
                    value={ingridients}
                    onChangeText={ing => setIngridients(ing)}
                />
            <FormInput
                labelName='instructions'
                value={instructions}
                onChangeText={ins => setInstructions(ins)}
            />

            <FormInput
                labelName='notes'
                value={notes}
                onChangeText={recipe_notes => setNotes(recipe_notes)}
            />
            <FormButton
                title="Upload Image"
                modeValue="contained"
                onPress={() =>selectFile()}
            />

            <FormButton
                title="Save"
                modeValue="contained"
                onPress={() => addRecipe()}
            />

        </View>


    )
}

const styles = StyleSheet.create({

    inputStyle: {
        margin: 5
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white"

    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})