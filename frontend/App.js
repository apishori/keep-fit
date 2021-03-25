import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Button, Modal } from 'react-native';
import { useState } from 'react';
import HomeScreen from "./src/HomeScreen";
import Profile from "./src/Profile";
import Search from "./src/Search";
import Cals from "./src/Cals";
import UploadVideoScreen from "./src/UploadVideoScreen";
import {MaterialIcons} from '@expo/vector-icons'
import {reducer} from './src/reducer'
import {Provider,useSelector} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStore,combineReducers} from 'redux'
import {NavigationContainer,DefaultTheme,useNavigation,DarkTheme,useTheme} from '@react-navigation/native'
import Login from "./src/Login";

const rooReducer = combineReducers({
  cardData:reducer
})

const store = createStore(rooReducer)
const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()
localStorage.setItem('loginID', -1);

/*const RootHome = ()=>{

  return(

  )
}*/

        /*<Stack.Navigator>
          <Stack.Screen name="rootHome" component={RootHome} options={{headerTitle: "KeepFit", headerShown: false}} />
          <Stack.Screen name="search" component={Search} options={{headerTitle: "Search"}} />
          <Stack.Screen name="videoplayer" component={VideoPlayer} options={{headerTitle: "Exercise"}} />
          <Stack.Screen name="upload" component={UploadVideoScreen} options={{headerTitle: "Upload Video"}} />
          <Stack.Screen name="stream" component={UploadStreamScreen} options={{headerTitle: "Start Stream"}} />
        </Stack.Navigator>*/

export function Navigation() {
  const {colors} = useTheme();
  return ( 
      <NavigationContainer>
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
      </NavigationContainer>
   
  );
}

function App() {
  return (
    <Provider store={store}>
      <Modal
          animationType='slide'
          transparent={false}
          visible={true}
        >
          <View>
            <Login/>
          </View>
        </Modal>
        <Navigation />
    </Provider>
  );
}

export default App;

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