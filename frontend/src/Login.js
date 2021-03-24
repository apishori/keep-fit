import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import Root, { Navigation } from "./Router";
import App from "./Router";
import { withRouter, Route } from "react-dom";
import { push } from 'react-redux';
import axios from "axios";

class Login extends Component { 
    handleClick(){
        async (dispatch) => {
            try {
                const response = await axios.post('login/', { username: this.state.username, password: this.state.password });
                console.log('Returned data:', response);
            } catch (e) {
                console.log(`Axios request failed: ${e}`);
            }
        }
    }
    render() {
        return (
            <form>

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input name = "username" type="text" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name = "password" type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={() => {this.handleClick()}}>Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="forgot-password">password?</a>
                </p>
            </form>
        );
    }
}
  
export default Login;

const styles = StyleSheet.create({
    login: {
        paddingRight: 500,
        paddingLeft: 500,
    }
})

