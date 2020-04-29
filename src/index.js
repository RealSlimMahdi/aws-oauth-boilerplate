import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./context/auth/user";
import App from "./App";
import App2 from "./App2";
import App3 from "./App3";
import { Amplify } from "aws-amplify";
import configUpdate from "./hostfix";

Amplify.configure(configUpdate);

ReactDOM.render(
  <>
    <h3>Method implemented by: Mahdi</h3>
    <UserProvider>
      <App />
    </UserProvider>
    <hr />
    <h3>Method implemented by: RockYourCode</h3>
    <App2 />
    <hr />
    <h3>Method using react-google-signin</h3>
    <App3 />
  </>,
  document.getElementById("root")
);
