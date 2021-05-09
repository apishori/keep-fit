import React, { useEffect, useState } from 'react';
import {StyleSheet, Modal, View, Text, Button } from 'react-native';
import HomeScreen from "./src/HomeScreen";
import Profile from "./src/Profile";
import Search from "./src/Search";
import Cals from "./src/Cals";
import ExerciseCalendar from "./src/ExerciseCalendar";
import UploadVideoScreen from "./src/UploadVideoScreen";
import {MaterialIcons} from '@expo/vector-icons'
import reducer from './src/reducer'
import loginReducer from './src/loginReducer' 
import likedReducer from './src/likedReducer' 
import resultReducer from './src/resultReducer'
import searchReducer from './src/searchReducer'
import exerciseReducer from './src/exerciseReducer'
import tokenReducer from './src/tokenReducer'
import {Provider,useSelector,configureStore} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStore,combineReducers} from 'redux'
import {NavigationContainer,DefaultTheme,useNavigation,DarkTheme,useTheme} from '@react-navigation/native'
import Login from "./src/Login";
import axios from 'axios';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

const rooReducer = combineReducers({
  cardData:reducer,
  cardData2: likedReducer,
  loginData:loginReducer,
  loginToken:tokenReducer,
  result:resultReducer,
  searchType:searchReducer,
  exercise:exerciseReducer,
})
const store = createStore(rooReducer)
const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const Reminder = () => {
  const loginID = useSelector(state => {
    return state.loginData.loginID;
  });
  const token = useSelector(state => {
		return state.loginToken.token;
	});

  const [isChecking, setIsChecking] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const setAlertMessage = () => {
    
  };

  const checkForReminder = () => {
    // console.log("in checkForReminder")
    const GET_ = `http://127.0.0.1:8000/`;

    axios.get(GET_, {
      headers: `Authorization: ${token}`
    })
    .then(result => {
      console.log(result)
      // set alert message
      setAlertVisible(!isAlertVisible);
    })
    .catch(error => {
      console.error(error)
    })
  };

  useEffect(() => {
		if (loginID != "") {
      // console.log("called checkForReminder")
      checkForReminder();
		}
	}, [isChecking]);

  useEffect(() => {
    const check = setInterval(() => {
      setIsChecking(!isChecking);
      console.log(isChecking)
    }, 1000 * 60 * 30); // every 30 min
  
    return () => clearInterval(check);
  }, []);
  
  return (
    <Modal
      visible={isAlertVisible}
      transparent={true}
      animationType='slide'    
    >
      <View
        style={styles.reminderView}
        backgroundColor='white'
        opacity={1.0}
      >
        <Text>
          {"Reminder Content"}
        </Text>
        <Button
          onPress={() => setAlertVisible(!isAlertVisible)}
        />
      </View>
    </Modal>
  );
};

export function Navigation() {
  const {colors} = useTheme();

  return (
    <>
      <Reminder/>
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
          } else if(route.name === 'calendar') {
            iconName = 'date-range'
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
        <Tabs.Screen name="calendar" component={ExerciseCalendar} />
      </Tabs.Navigator>
    </>
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
  },
  reminderModalView: {
    padding: '20%',
  },
  reminderView: {
    padding: '15%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
    // flex: 1,
  }
});

export default AppWrapper;