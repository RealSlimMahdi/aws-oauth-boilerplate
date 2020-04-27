import React from "react";
import { Auth } from "aws-amplify";

const GloginButton = () => {
  return (
    <div>
      <button onClick={() => Auth.federatedSignIn({ provider: "Google" })}>Google Login</button>
    </div>
  );
};

export default GloginButton;
