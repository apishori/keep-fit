import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Root, { Navigation } from "./Router";
import App from "./Router";
import { withRouter, Route } from "react-dom";
import { push } from 'react-redux';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input, Button } from 'react-native-elements';
import {useSelector} from 'react-redux'
import axios from "axios";
import ProfileView from './Profile';
import {useNavigation ,useTheme} from '@react-navigation/native';
import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native'
import UpdateProfile from "./UpdateProfile";


const ChangePassword = () => {
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const login = useSelector(state => {
		return state.loginData.loginID;
	})
	const token = useSelector(state => {
		return state.loginToken.token
	})
    const navigation = useNavigation()

    const getUpdatedPassword = () => {
        const CHANGEPASS = {
            "password": password
        };

        const UPDATEPASSWORD = `http://127.0.0.1:8000/users/${username}/update_password/`;

        axios.request({
			url: UPDATEPASSWORD,
			method: "post",
            data: CHANGEPASS,
			headers: { 
				"Authorization": `Token ${token}`,
		}})
        .then(data => {
            console.log(data);
            console.log('Password Changed');
        })
        .catch(error => {
            console.error(error); 
            console.log('Password Change Error');
        })

        navigation.navigate('profile')
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

export default ChangePassword