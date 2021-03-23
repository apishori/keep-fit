import { registerRootComponent } from 'expo';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./react-login-signup-ui-template/src/index.css";
import App from "./App";
//import * as serviceWorker from "./react-login-signup-ui-template/node_modules/caniuse-lite/data/features/serviceworkers.js";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

//serviceWorker.unregister();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
