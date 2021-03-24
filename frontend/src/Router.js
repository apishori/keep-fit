import React, { Component } from 'react';
import Login from './Login';
import HomeScreen from './HomeScreen';
import { BrowserRouter as Router, Route } from "react-router-dom"
import {NavigationContainer,DefaultTheme,useNavigation,DarkTheme,useTheme} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'

const Tabs = createBottomTabNavigator()
const Stack = createStackNavigator()

class Root extends Component{
    render(){
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
  

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Login} />
          <Route path="/HomeScreen/:id" component={HomeScreen} />
        </div>
      </Router>
    );
  }

}

export default App;

