import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
    const [picture,setPicture] = useState("")
    // const [modal, setModal] = useState("")

    selectFile = () => {
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
                this.setState({
                    resourcePath: source,
                });
            }
        });
        // const handleUpload = (image)=>{
        //     const data = new FormData()
        //     data.append('file', image)
        //     data.append()
        // }
    };

    return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <FormInput
                labelName='Name'
                value={name}
                onChangeText={recipe_name => setName(recipe_name)}
            />
            <FormInput
                labelName='instructions'
                value={instructions}
                onChangeText={ins => setInstructions(ins)}
            />
            <FormInput
                labelName='ingridients'
                value={ingridients}
                onChangeText={ing => setIngridients(ing)}
            />

            <FormInput
                labelName='description'
                value={description}
                onChangeText={desc => setDescription(desc)}
            />
            <FormInput
                labelName='notes'
                value={notes}
                onChangeText={recipe_notes => setNotes(recipe_notes)}
            />
            <FormButton
                title="Upload"
                icon="upload"
                modeValue="contained"
                onPress={this.selectFile} 
            />

            <FormButton
                title="Save"
                icon="content-save"
                modeValue="contained"
                onPress={() => console.log("save")} 
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