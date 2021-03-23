import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View,Button } from 'react-native';
import HomeScreen from "./src/HomeScreen";
import Profile from "./src/Profile";
import Search from "./src/Search";
import Cals from "./src/Cals";
import UploadStreamScreen from "./src/UploadStreamScreen";
import VideoPlayer from "./src/VideoPlayer";
import UploadVideoScreen from "./src/UploadVideoScreen";
import {MaterialIcons} from '@expo/vector-icons'
import {reducer} from './src/reducer'
import {Provider,useSelector} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStore,combineReducers} from 'redux'
import Routers from './src/Router'
import {NavigationContainer,DefaultTheme,useNavigation,DarkTheme,useTheme} from '@react-navigation/native'
import { render } from 'react-dom';
import './react-login-signup-ui-template/node_modules/bootstrap/dist/css/bootstrap.min.css';
window.React = React
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./src/Login";
import Register from "./src/Registration";
import "./src/components/index.css";

const rooReducer = combineReducers({
  cardData:reducer
})

const store = createStore(rooReducer)
const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const RootHome = ()=>{
  const {colors} = useTheme()
  return(
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
  )
}



export function Navigation() {

  return (
 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="rootHome" component={RootHome} options={{headerTitle: "KeepFit", headerShown: false}} />
          <Stack.Screen name="search" component={Search} options={{headerTitle: "Search"}} />
          <Stack.Screen name="videoplayer" component={VideoPlayer} options={{headerTitle: "Exercise"}} />
          <Stack.Screen name="upload" component={UploadVideoScreen} options={{headerTitle: "Upload Video"}} />
          <Stack.Screen name="stream" component={UploadStreamScreen} options={{headerTitle: "Start Stream"}} />
        </Stack.Navigator>
      </NavigationContainer>
   
  );
}


function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/home" component={HomeScreen} />
          </Switch>
        </div>
      </div>
    </div></Router>
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
