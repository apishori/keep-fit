import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View,ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Input,Button } from 'react-native-elements';

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
          <ScrollView style={{marginTop: 48, flex:1}}>
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
                style={styles.input2}
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
              <Input
                  type = "date"
                  onChangeText={birthday=> setBirthday(birthday)}
                label='Birthday'
                placeholder="format='YYYY-MM-DD'"
              />
              <DropDownPicker items={[
                            {label: 'Female', value: 'F'},
                            {label: 'Male', value: 'M'},
                            {label: 'Other', value: 'O'}
                        ]}
                        containerStyle={{height: 54}}
                        style={{backgroundColor: '#fafafa', marginLeft: 32, marginRight:32, marginBottom: 16}}
                        itemStyle={{
                            // justifyContent: 'flex-start', 
                            // width: 128
                        }}
                        onChangeItem={item => setSex(item.value)}
                        placeholder="Select Sex"
                        dropDownStyle={{backgroundColor: '#fafafa'}}/>
              
              <Button
                onPress={() => pickImage()}
                title='Upload profile image'
                style={{marginLeft: 16, marginRight: 16, marginBottom: 8}}
              />
              <Button
                title="Sign Up"
                onPress={() => getReg()}
                style={{marginLeft: 16, marginRight: 16, marginBottom: 8}}
              />
              <Button
                title="Already registered? Sign In"
                type="clear"
                onPress={() => navigation.navigate('login')}
                style={{marginLeft: 16, marginRight: 16, marginBottom: 8}}
              />
           </View>
        </ScrollView>
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
        // alignItems:"flex-start"
    },
    rowContainer: {
      flexDirection: 'row'
    }
})

export default SignUp;