import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

const UpdateProfile = () => {
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

    return(
          <View>
                <h3>Update Profile</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
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
                //onPress={() => }
                />
           </View>
    );
}

const styles = StyleSheet.create({
    login: {
        paddingRight: 500,
        paddingLeft: 500,
    }
})

export default UpdateProfile