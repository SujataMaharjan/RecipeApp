import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';


export default function newRecipe({ navigation, route }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [ingridients, setIngridients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [notes, setNotes] = useState("")
    // const [picture,setPicture] = useState("")
    const [modal, setModal] = useState("")

    const pickFromGallery = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (granted) {
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
        } else {
            Alert.alert("Please give permission")
        }
    }
    const pickFromCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if (granted) {
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })
        } else {
            Alert.alert("Please give permission")
        }
    }

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
                icon="upload"
                modeValue="contained"
                onPress={() => setModal(true)}>
                Upload Image
             </FormButton>

            <FormButton
                icon="content-save"
                modeValue="contained"
                onPress={() => console.log("save")}>
                Save
            </FormButton>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(false)
                }}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                        <FormButton icon="camera"
                            modeValue="contained"
                            onPress={() => pickFromCamera()}>
                            Camera
                        </FormButton>
                        <FormButton
                            icon="image-area"
                            modeValue="contained"
                            onPress={() => pickFromGallery()}>
                            Gallery
                        </FormButton>
                    </View>
                    <FormButton
                        onPress={() => setModal(false)}>
                        Cancel
                </FormButton>
                </View>
            </Modal>

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