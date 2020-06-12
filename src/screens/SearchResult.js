import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function SearchResult({ navigation }) {
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