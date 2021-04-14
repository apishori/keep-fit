import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useState } from 'react';
import HomeScreen from "./src/HomeScreen";
import Profile from "./src/Profile";
import Search from "./src/Search";
import Cals from "./src/Cals";
import UploadVideoScreen from "./src/UploadVideoScreen";
import {MaterialIcons} from '@expo/vector-icons'
import reducer from './src/reducer'
import loginReducer from './src/loginReducer' 
import resultReducer from './src/resultReducer'
import searchReducer from './src/searchReducer'
import exerciseReducer from './src/exerciseReducer'
import {Provider,useSelector,configureStore} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStore,combineReducers} from 'redux'
import {NavigationContainer,DefaultTheme,useNavigation,DarkTheme,useTheme} from '@react-navigation/native'
import Login from "./src/Login";

const rooReducer = combineReducers({
  cardData:reducer,
  loginData:loginReducer,
  result:resultReducer,
  searchType:searchReducer,
  exercise:exerciseReducer,
})
const store = createStore(rooReducer)
const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

export function Navigation() {
  const {colors} = useTheme();
  return ( 
    <Tabs.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'home') {
          iconName = 'home';
        } else if (route.name === 'search') {
          iconName = 'search';
        } else if (route.name === 'upload') {
          iconName = 'add';
        } else if(route.name === 'cals')  {
          iconName = 'local-fire-department'
        } else if(route.name === 'profile') {
          iconName = 'person'
        }
        // You can return any component that you like here!
        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}
    >
      <Tabs.Screen name="home" component={HomeScreen} />
      <Tabs.Screen name="search" component={Search} />
      <Tabs.Screen name="upload" component={UploadVideoScreen} />
      <Tabs.Screen name="cals" component={Cals} />
      <Tabs.Screen name="profile" component={Profile} />
    </Tabs.Navigator>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name='login'
              component={Login}
              options={{headerShown:false}}
          />
          <Stack.Screen
              name='Keep-Fit'
              component={App}
              options={{headerShown:false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

function App() {
  return (
    <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default AppWrapper;