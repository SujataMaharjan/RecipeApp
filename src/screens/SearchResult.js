import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function SearchResult({ navigation }) {
    // const data = [
    //     { _id: "1", name: "Pie", description: "This is pie", ingridents: "tomato, flour", instructions: "Bake", notes:"", picture: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" },
    //     { _id: "2", name: "Pasta", description: "This is pasta", ingridents: "tomato, flour", instructions: "Cook", notes:"", picture: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" },
    //     { _id: "3", name: "Donut", description: "This is donut", ingridents: "choc, flour", instructions: "Bake", notes:"Toppings", picture: "https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" },
    // ]
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        fetch("http://192.168.0.6:3000/search-API", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(results => {
                setData(results)
                setLoading(false)
            }).catch(err => {
                Alert.alert("Something went wrong")
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    const recipeList = ((item) => {
        return (
            <Card style={styles.myCard}
                onPress={() => navigation.navigate("Recipe", { item })}
            >
                <View>
                    {/* <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item.picture }}

                    /> */}
                    <View style={{ marginLeft: 10 }}>
                        <Text >{item.strMeal}</Text>
                        <Text >{item.strInstructions}</Text>
                    </View>

                </View>
            </Card>

        )
    })

    return (
        <View style={styles.cardView}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return recipeList(item)
                }}
                keyExtractor={item => item._id}
                onRefresh={() => fetchData()}
                refreshing={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    myCard: {
        margin: 5,
        padding: 5
    },
    cardView: {
        flexDirection: "row"
    }
})