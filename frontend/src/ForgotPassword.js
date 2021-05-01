import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
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

const ForgotPassword = () => {
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigation = useNavigation()

    const getUpdatedPassword = () => {
        const CHANGEPASS = {
            "username": username,
            "email": email,
            "password": password
        };

        const UPDATEPASSWORD = `http://127.0.0.1:8000/users/forgot_password/`;

        axios.post(UPDATEPASSWORD, CHANGEPASS)
        .then(data => {
            console.log(data);
            console.log('logged in');
        })
        .catch(error => {
            console.error(error); 
            console.log('log in error');
        })
      
        navigation.navigate('login')
    }

    useEffect (() => { 
        //getUpdatedPassword(); 
    });


        return (
          //  <View style={styles.login}>
          <View style={{flex:1}}>
          <View style={styles.Username}>
              <Text style = {styles.sectionTitle}>Forgot Password</Text>
              <View style = {styles.form}>
              <Input
                  onChangeText={username => setUsername(username)}
                  label='Username'
                  placeholder='Enter username'
              />
              <Input
                  onChangeText={email => setEmail(email)}
                  label='Email'
                  placeholder='Enter email'
              />
              <Input
                  secureTextEntry={true}
                  onChangeText={password => setPassword(password)}
                  label='New Password'
                  placeholder='Enter password'
              />

              </View>
              <Button
                title="Create New Password"
                onPress={() => getUpdatedPassword()}
              />
  
          </View>
      </View>
           //</View>
        );
 }


const styles = StyleSheet.create({
    login: {
        paddingRight: 500,
        paddingLeft: 500,
    }, 

    sectionTitle: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: 'bold',
        
     },
     videosWrapper: {
        paddingTop: 48,
        paddingHorizontal: 16,
    },
    form:{
        paddingTop: 32,
        paddingBottom: 24,
        alignItems:"flex-start"
    }
})

export default ForgotPassword
