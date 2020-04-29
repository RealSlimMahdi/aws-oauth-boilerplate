import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./context/auth/user";
import App from "./App";
import App2 from "./App2";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

ReactDOM.render(
  <>
    <UserProvider>
      <App />
    </UserProvider>
    <hr />
    <App2 />
  </>,
  document.getElementById("root")
);
