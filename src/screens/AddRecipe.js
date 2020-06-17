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
    const [recipeImage, setRecipeImage] = useState("")
    const [imageSource, setImageSource] = useState(null)

    // const [modal, setModal] = useState("")


    const addRecipe = () => {
        fetch("http://192.168.0.5:3000/send-recipe", {
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
                recipeImage
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
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        // const selectImage = ()=> {
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                // let source = ( response.uri );
                // let source = res;
                // // setRecipeImage(data)
                // // setRecipeImage({
                // //     resourcePath: source,

                // // });
                const source = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }
                // handleUpload(newfile)
                setImageSource({
                    imageSource: source
                });
                // setImageSource(source);
            }

        });
        // }
        const handleUpload = (image) => {
            const data = new FormData()
            data.append('file', image)
            setRecipeImage(data.url)
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
                onPress={() => selectFile()}
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