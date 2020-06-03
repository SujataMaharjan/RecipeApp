import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import Add_Recipe from './src/screens/Add_Recipe';
// import {Profile} from './Profile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerTitle: 'My Recipe', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerTitle: 'My Recipe', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerTitle: 'My Recipe', headerTitleAlign: 'center' }}
        />
        <Stack.Screen
          name="Add_Recipe"
          component={Add_Recipe}
          options={{ headerTitle: 'My Recipe', headerTitleAlign: 'center' }}
        />
        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'My Recipe' }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}