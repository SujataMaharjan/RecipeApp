import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text } from 'react-native-paper';

import FormButton from '../components/FormButton';

export default function SearchResult({ navigation }) {
    const data = [
        { id: "1", name: "Pie", ingridents: "tomato, flour", pic: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" },
        { id: "2", name: "Pasta", ingridents: "tomato, flour", pic: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" },
        { id: "3", name: "Donut", ingridents: "choc, flour", pic: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" },
    ]
    const recipeList = ((item) => {
        return (
            <Card style={styles.myCard}
            onPress={()=>navigation.navigate("Recipe",{item})} 
            >
                <View>
                    <Text>{item.name} </Text>
                </View>
            </Card>

        )
    })
    return (
        <View style={styles.cardView}>
            <FlatList
            data={data}
            renderItem={({item})=>{
               return recipeList(item)
            }}
            keyExtractor={item=> item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
        padding: 5
    },
    cardView:{
        flexDirection:"row"
    }
})