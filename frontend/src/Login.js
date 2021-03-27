import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { push, useDispatch, useSelector, useStore } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import axios from "axios";
import {useNavigation ,useTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native'
import Registration from './Registration'
import ForgotPassword from "./ForgotPassword";

const Stack = createStackNavigator()

const LoginWrapper = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='login'
                component={Login}
            />
            <Stack.Screen
                name='register'
                component={Registration}
            />
            <Stack.Screen
                name='forgotpw'
                component={ForgotPassword}
            />
        </Stack.Navigator>
    )
}

const Login = () => { 
    const navigation = useNavigation();
    const dispatch = useDispatch()
    //const [login, setLogin] = useState('')
    /*const loginID = useSelector(state => {
        console.log(state)
        return state.loginData;
    })*/
    const [isVisible, setIsVisible] = useState(true);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getLogin = () => {
        const LOGIN = {
            "username": username,
            "password": password
        };

        const ADMINLOGIN = 'http://127.0.0.1:8000/users/login/';

        axios.post(ADMINLOGIN, LOGIN)
        .then(() => {
            setUsername('')
            setPassword('')
        })
        .then(data => {
            //console.log('logged in');
            dispatch({ type: 'setLogin', payload: username })
            //setIsVisible(!isVisible);
            //setLogin(username);
            navigation.navigate('Keep-Fit');
        })
        .catch(error => {
            console.error(error); 
            //console.log('log in error');
        })
    }

    const LoggedIn = () => {
        getLogin();
    }

    const forgotPW = () => {
        navigation.navigate('forgotpw')
    }
/*
    useEffect(() => {
        if (login == '') {
            //navigation.navigate('profile')
            setIsVisible(true)
        }
    })
     <Modal
                animationType='slide'
                transparent={false}
                visible={isVisible}
            >
  */      
    return(
        <> 
           
            <View style={{flex:1}}>
            <View style={styles.Username}>
              <Text style = {styles.sectionTitle}>Log In</Text>
              <View style = {styles.form}>
              <Input
                  onChangeText={username => setUsername(username)}
                  label='Username'
                  placeholder='Enter username'
                  value={username}
              />
              <Input
                  secureTextEntry={true}
                  onChangeText={password => setPassword(password)}
                  label='Password'
                  placeholder='Enter password'
                  value={password}
              />

              </View>
              <View style = {{paddingLeft:24,paddingRight:24}}>
              <Button
                title="Sign In"
                onPress={()=> LoggedIn()}
                style = {{paddingBottom:24}}
              />
              <Button 
                    title="Forgot Password"
                    onPress={() => forgotPW()}
              >
              </Button>
              </View>
            </View>
            </View>

      </>
    )
  }

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: 'bold',
        marginTop:32
        
     },
     videosWrapper: {
        paddingTop: 48,
        paddingHorizontal: 16,
    },
    form:{
        paddingTop: 32,
        paddingBottom: 24,
        alignItems:"flex-start",
        paddingLeft:24,
         paddingRight:24
    }
})

export default Login