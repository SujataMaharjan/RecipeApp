import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Text } from 'react-native-paper';


export default function SearchResult({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = () => {
        fetch("http://192.168.0.5:3000/search-API", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(results => {
              console.log(results)
                setData(results.meals_)
                setLoading(false)
            }).catch(err => {
                Alert.alert("Something went wrong")
                console.error(err)
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
                <FlatList>
                    {/* <Image
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                        source={{ uri: item.picture }}

                    /> */}
                    <View style={{ marginLeft: 10 }} key={item.meals_}>
                        <Text >{item.strMeal}</Text>
                        <Text >{item.strInstructions}</Text>
                    </View>

                </FlatList>
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
                keyExtractor={item => item.idMeal}
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