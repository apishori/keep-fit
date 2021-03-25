import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Root, { Navigation } from "./Router";
import App from "./Router";
import { withRouter, Route } from "react-dom";
import { push } from 'react-redux';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input, Button } from 'react-native-elements';
import axios from "axios";
import {useNavigation ,useTheme} from '@react-navigation/native';
import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native'


const Login = () => { 
    const navigation = useNavigation();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const getLogin = () => {
        const LOGIN = {
            "username": username,
            "password": password
        };

        const ADMINLOGIN = 'http://127.0.0.1:8000/users/login/';

        axios.post(ADMINLOGIN, LOGIN)
        .then(data => {
            console.log(data);
            console.log('logged in');
        })
        .catch(error => {
            console.error(error); 
            console.log('log in error');
        })
    }

    useEffect (() => { 
        getLogin(); 
    });

    const [isVisible, setIsVisible] = useState(true);
    const LoggedIn = () => {
        navigation.navigate('home');
        setIsVisible(!isVisible);
    }

    return(
        <> 
        <Modal
          animationType='slide'
          transparent={false}
          visible={isVisible}
        >
            <View style={{flex:1}}>
            <View style={styles.Username}>
              <Text style = {styles.sectionTitle}>Log In</Text>
              <View style = {styles.form}>
              <Input
                  onChangeText={username => setUsername(username)}
                  label='Username'
                  placeholder='Enter username'
              />
              <Input
                  secureTextEntry={true}
                  onChangeText={password => setPassword(password)}
                  label='Password'
                  placeholder='Enter password'
              />

              </View>
              <View style = {{paddingLeft:24,paddingRight:24}}>
              <Button
                title="Sign In"
                onPress={()=> LoggedIn()}
                style = {{paddingBottom:24}}
              />
              <Button 
                    title="Forgot Password">
              </Button>
              </View>
            </View>
            </View>

        </Modal>
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