import React, { useState, Component } from "react";
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import { Navigation } from "./Router";
import {useSelector,useDispatch} from 'react-redux'
import ProfileView from './Profile';
import { useNavigation} from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

const UpdateProfile = () => {
    const [profilePicSrc, setProfilePic] = useState('')
	const [first, setFirstName] = useState('')
	const [last, setLastName] = useState('')
    const [height, setHeight] = useState(0)
    const [sex, setSex] = useState('')
	const [weight, setWeight] = useState(0)
	const [birthday, setBirthday] = useState('')
    const [username, setUsername] = useState("")

    const login = useSelector(state => {
        return state.loginData.loginID;
    })
    
    const token = useSelector(state => {
		return state.loginToken.token;
    })
    
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);
    
        if (!result.cancelled) {
          setProfilePic(result.uri);
        }
    };

    const updateProfile = () => {
        const UPDATE = {
            "first_name": first,
            "last_name": last,
            "username": username,
            "weight": weight,
            "height": height,
            "sex": sex,
            "birthday": birthday,
            "profile_pic": profilePicSrc
        };

        const UPDATEPROFILE = `http://127.0.0.1:8000/users/${login}/`;
    
             axios.request({
                url: UPDATEPROFILE,
                method: "put", 
                data: UPDATE,
                headers: { 
                    "Authorization": `Token ${token}`
			}})
            .then(data => {
                console.log(data);
                console.log('updated');
            })
            .catch(error => {
                console.error(error); 
                console.log('update error');
            })
            navigation.navigate('profile')
    }

    return(
        <View style={{flex:1}}>
            <Text style = {styles.sectionTitle}>Update Profile</Text>
              <View style = {styles.form}>

              <TextInput
                  onChangeText={first => setFirstName(first)}
                  label='First Name'
                  placeholder='Enter first name'
              />

            <TextInput
                  onChangeText={last => setLastName(last)}
                  label='Last Name'
                  placeholder='Enter last name'
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
               {/* <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChangeText={first => setFirstName(first)} type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChangeText={last => setLastName(last)} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Weight</label>
                    <input type="number" onChangeText={weight => setWeight(weight)}className="form-control" placeholder="Weight" />
                </div>

                <div className="form-group">
                    <label>Height</label>
                    <input type="number" onChangeText={height => setLastName(height)} className="form-control" placeholder="Height" />
                </div>

                <div className="form-group">
                    <label>Sex At Birth</label>
                    <DropDownPicker items={[
                            {label: 'Female', value: 'female'},
                            {label: 'Male', value: 'male'}
                        ]}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        onChangeItem={item => setSex(item.value)}
                        placeholder="Select"
                        dropDownStyle={{backgroundColor: '#fafafa'}}/>
                </div>

                <div className="form-group">
                    <label>Birthday</label>
                    <input type="date" onChangeText={birthday=> setBirthday(birthday)} className="form-control" placeholder="Birthday" />
                    </div> */}

                <Button
                onPress={() => pickImage()}
                title='Upload profile image'
                />
                <Button
                title="Update Profile"
                onPress={() => updateProfile()}
                />
           </View>
        </View>
    );
}



const Update = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='profile'
				component={ProfileView}
				options={{headerShown:false}}
			/>
		</Stack.Navigator>
	)
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

export default UpdateProfile
