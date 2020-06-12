import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Menu, Searchbar, FAB, Card, Text } from 'react-native-paper';

import FormButton from '../components/FormButton';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

//   const searchRecipe = () => {
//     fetch("http://192.168.0.6:3000/searchAPI", {
//         method: "GET",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name,
//           description,
//           ingridients,
//           instructions,
//           notes,
//           picture
//         })
//     }).then(res => res.json())
//         .then(data => {
//             console.log(data)
//             Alert.alert("User added!")
//             navigation.navigate("Home")
//         })
// }

const fetchData = () => {
  fetch("http://192.168.0.6:3000/get-recipe")
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
              <Image
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                  source={{ uri: item.picture }}

              />
              <View style={{ marginLeft: 10 }}>
                  <Text >{item.name}</Text>
                  <Text >{item.description}</Text>
              </View>

          </View>
      </Card>

  )
})
  return (
    <View style={{flex:1}}>
      <Card style={styles.myMenu}>
      <Menu
            visible={modal}
            onDismiss={() => {
              setModal(false)
            }}
            anchor={<FormButton
              style={styles.menuButton}
              title='Menu'
              modeValue="contained"
              onPress={() => setModal(true)}>
            </FormButton>}
          >
            <Menu.Item onPress={() => navigation.navigate('Home')} title="Search Recipe" />
            <Menu.Item onPress={() => navigation.navigate('AddRecipe')} title="Add Recipe" />
            <Menu.Item onPress={() => navigation.navigate('Login')} title="Logout" />
          </Menu>
          </Card>
        <View style={styles.cardView}>
      <Card style={styles.myCard}>
          <Searchbar
            placeholder="Search"
            value={search}
            onChangeText={search_text => setSearch(search_text)}
          />
          <FormButton
            title='Go'
            modeValue="contained"
            onPress={() => navigation.navigate('SearchResult')}>
          </FormButton>


      </Card>
      </View>
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
      {/* <Card style={styles.myCard} > */}
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={() => navigation.navigate('AddRecipe')}
        />
      {/* </Card> */}
    </View>
  );
};

const styles = StyleSheet.create({
  myMenu:{
    alignItems:"flex-end",
    marginBottom:5
  },

  myCard: {
    margin: 5,
    padding: 5
  },
  inputStyle: {
    margin: 5
  },
 
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  // cardView:{
  //   flexDirection:"row"
  // }
})