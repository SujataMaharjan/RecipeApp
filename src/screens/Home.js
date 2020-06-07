import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Menu, Searchbar, FAB, Card, Provider } from 'react-native-paper';

import FormButton from '../components/FormButton';

export default function HomeScreen({ navigation }) {
  // state = {
  //   visible: false,
  //   search: '',
  // };

  const [search, setSearch] = useState("")
  const [modal, setModal] = useState(false)
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