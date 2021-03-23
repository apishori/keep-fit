import React, { Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

export default class SignUp extends Component {
    render() {
        return (
          //  <View style={styles.login}>
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Birthday</label>
                    <input type="date" className="form-control" placeholder="Birthday" />
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
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <label>Profile Picture</label>
                    <div>
                        <input type="file" className="form-group" placeholder="Image" />
                    </div> 
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
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


