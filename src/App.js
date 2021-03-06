import React from "react";
import { useUserContext } from "./context/auth/user";

function App() {
  const { user, GoogleSignIn, signOut, loading } = useUserContext();

  const Welcome = (props) => {
    return (
      <div>
        <h3>Welcome </h3>
      </div>
    );
  };
  const Login = (props) => {
    return (
      <div>
        <h3>Login</h3>
      </div>
    );
  };

  return (
    !loading && (
      <div>
        {user ? <Welcome /> : <Login />}
        <button onClick={GoogleSignIn}>Google Sign In</button>
        <button onClick={signOut}>Google SignOut</button>
      </div>
    )
  );
}
export default App;
