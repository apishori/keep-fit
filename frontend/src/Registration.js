import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Root, { Navigation } from "./Router";
import App from "./Router";
import { withRouter, Route } from "react-dom";
import { push } from 'react-redux';
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview';
import { Input, Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import {useNavigation ,useTheme} from '@react-navigation/native';
import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native'

const SignUp = () => {

        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [first, setFirst] = useState('')
        const [last, setLast] = useState('')
        const [email, setEmail] = useState('')
        const [weight, setWeight] = useState(0)
        const [height, setHeight] = useState(0)
        const [sex, setSex] = useState('')
        const [birthday, setBirthday] = useState('')
        const [profilePic, setPic] = useState('')

        const getReg = () => {
            const REG = {
                "username": username,
                "first_name": first,
                "last_name": last,
                "email": email,
                "password": password,
                "weight": weight,
                "height": height,
                "sex": sex,
                "birthday": birthday,
                "profile_pic": profilePic
            };
    
            const ADMINLOGIN = 'http://127.0.0.1:8000/users/register/';
    
            axios.post(ADMINLOGIN, REG)
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
            getReg(); 
        });

        return (
          //  <View style={styles.login}>
          <View style={{flex:1}}>
          <View style={styles.Username}>
              <Text style = {styles.sectionTitle}>Sign Up</Text>
              <View style = {styles.form}>
              <Input
                  onChangeText={username => setUsername(username)}
                  label='Username'
                  placeholder='Enter username'
              />
              <Input
                  onChangeText={first => setFirst(first)}
                  label='First Name'
                  placeholder='Enter first name'
              />
              <Input
                  onChangeText={last => setLast(last)}
                  label='Last Name'
                  placeholder='Enter last name'
              />
              <Input
                  onChangeText={email => setEmail(email)}
                  label='Email'
                  placeholder='Enter email'
              />
               <Input
                  secureTextEntry={true}
                  onChangeText={password => setPassword(password)}
                  label='Password'
                  placeholder='Enter password'
              />
              <Input
                  onChangeText={weight => setWeight(weight)}
                  label='Weight'
                  placeholder='Enter weight'
              />
              <Input
                  onChangeText={height => setHeight(height)}
                  label='Height'
                  placeholder='Enter height'
              />
              <DropDownPicker items={[
                            {label: 'Female', value: 'F'},
                            {label: 'Male', value: 'M'},
                            {label: 'Other', value: 'O'}
                        ]}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        onChangeItem={item => setSex(item.value)}
                        placeholder="Select Sex"
                        dropDownStyle={{backgroundColor: '#fafafa'}}/>
              <Input
                  type = "date"
                  onChangeText={birthday=> setBirthday(birthday)}
                  label='Birthday'
                  placeholder="format='YYYY-MM-DD'"
              />
              <Input
                  onChangeText={profilePic => setPic(profilePic)}
                  label='Profile Pic'
                  placeholder='Enter file name'
              />
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
           </View>
        </View>
        </View>
        )
    };

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

export default SignUp; 
