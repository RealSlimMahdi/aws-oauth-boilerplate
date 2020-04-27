import React from "react";
import { Auth } from "aws-amplify";

const LogoutButton = () => {
  return (
    <div>
      <button onClick={() => Auth.signOut({ global: true })}>SignOut</button>
    </div>
  );
};

export default LogoutButton;
