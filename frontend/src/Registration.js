import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

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

        const navigation = useNavigation()

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
                "profile_picture": profilePic
            };
    
            const ADMINLOGIN = `http://127.0.0.1:8000/users/register/`;
    
            axios.post(ADMINLOGIN, REG)
            .then(data => {
                console.log(data);
                console.log('registered');
                navigation.navigate('login')
            })
            .catch(error => {
                console.error(error); 
                console.log('register error');
            })
        }
    
        /*useEffect (() => {
        });*/

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });
        
            console.log(result);
        
            if (!result.cancelled) {
              setPic(result.uri);
            }
        };

        return (
          //  <View style={styles.login}>
          <View style={{flex:1}}>
              <Text style = {styles.sectionTitle}>Sign Up</Text>
              <View style = {styles.form}>
              <TextInput
                  onChangeText={username => setUsername(username)}
                  label='Username'
                  placeholder='Enter username'
              />
              <TextInput
                  onChangeText={first => setFirst(first)}
                  label='First Name'
                  placeholder='Enter first name'
              />
              <TextInput
                  onChangeText={last => setLast(last)}
                  label='Last Name'
                  placeholder='Enter last name'
              />
              <TextInput
                  onChangeText={email => setEmail(email)}
                  label='Email'
                  placeholder='Enter email'
              />
              <TextInput
                  secureTextEntry={true}
                  onChangeText={password => setPassword(password)}
                  label='Password'
                  placeholder='Enter password'
              />
              <TextInput
                  onChangeText={weight => setWeight(weight)}
                  label='Weight'
                  placeholder='Enter weight'
              />
              <TextInput
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
              <TextInput
                  type = "date"
                  onChangeText={birthday=> setBirthday(birthday)}
                label='Birthday'
                placeholder="format='YYYY-MM-DD'"
              />
              <Button
                onPress={() => pickImage()}
                title='Upload profile image'
              />
              <Button
                title="Sign Up"
                onPress={() => getReg()}
              />
              <Button
                title="Already registered? Sign In"
                onPress={() => navigation.navigate('login')}
              />
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