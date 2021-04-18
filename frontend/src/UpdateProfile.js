import React, { useState, Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
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
    const [profilePicSrc, setProfilePic] = useState("")
	const [first, setFirstName] = useState("")
    //const [username, setUsername] = useState("")
	const [last, setLastName] = useState("")
    const [height, setHeight] = useState(0)
    const [sex, setSex] = useState("")
	const [weight, setWeight] = useState(0)
	const [birthday, setBirthday] = useState("")
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
            //"username": username,
            "last_name": last,
            "weight": weight,
            "height": height,
            "sex": sex,
            "birthday": birthday,
            "profile_pic": profilePicSrc
        };

        const UPDATEPROFILE = 'http://127.0.0.1:8000/users/${username}';
    
            axios.post(UPDATEPROFILE, UPDATE)
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
          <View>
                <h3>Update Profile</h3>

            {/*<div className="form-group">
                    <label>Username</label>
                    <input onChange={username => setUsername(username)} type="text" className="form-control" placeholder="Username" />
                 </div> */}

                <div className="form-group">
                    <label>First name</label>
                    <input onChange={first => setFirstName(first)} type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Weight</label>
                    <input type="number" className="form-control" placeholder="Weight" />
                </div>

                <div className="form-group">
                    <label>Height</label>
                    <input type="number" className="form-control" placeholder="Height" />
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
                        placeholder="Select"
                        dropDownStyle={{backgroundColor: '#fafafa'}}/>
                </div>

                <div className="form-group">
                    <label>Birthday</label>
                    <input type="date" className="form-control" placeholder="Birthday" />
                </div>

                <Button
                onPress={() => pickImage()}
                title='Upload profile image'
                />
                <Button
                title="Update Profile"
                onPress={() => updateProfile()}
                />
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
    }
})

export default UpdateProfile