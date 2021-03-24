import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default class UpdateProfile extends Component {
    render() {
        return (
          //  <View style={styles.login}>
            <form>
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

                <div className="form-group">
                    <label>Profile Picture</label>
                    <div>
                        <input type="file" className="form-group" placeholder="Image" />
                    </div> 
                </div>

                <button type="submit" className="btn btn-primary btn-block">Update Profile</button>
            </form>
           //</View>
        );
    }
}

const styles = StyleSheet.create({
    login: {
        paddingRight: 500,
        paddingLeft: 500,
    }
})


