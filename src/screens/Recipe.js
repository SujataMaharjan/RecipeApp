import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Title, Card} from 'react-native-paper';

export default function Recipe(props) {
    const {_id,name,description,ingridients,recipeImage} = props.route.params.item
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={['#4c669f', '#3b5998']}
                style={{ height: "10%" }}
            />
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140 / 2, marginTop: -50 }}
                    source={{ uri: recipeImage }}
                />
            </View>
            <View style={{alignItems:"center", margin:5}}>
            <Title>{name}</Title>
            <Text style={{fontSize:15}}>Description: {description}</Text>
            <Text style={{fontSize:15}}>Ingridients: {ingridients}</Text>
                </View>
                <Card style={styles.myCard}>
                <View style={styles.cardContent}>

                    </View>
                </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    myCard:{
        margin:3
    },
    cardContent:{
        flexDirection:"row"
    }
})