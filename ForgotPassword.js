import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

export default class ForgotPassword extends Component {
    render() {
        return (
          //  <View style={styles.login}>
            <form>
                <h3>Forgot Password</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Create New Password</button>
                
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