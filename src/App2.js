import React from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Route } from "react-router-dom";
import useAmplifyAuth from "./context/auth2/useAmplifyAuth";

export const UserContext2 = React.createContext();



function App2() {
  // const { user, loading, GoogleSignIn, signOut } = useUserContext();

  const {
    state: { user },
    handleSignout,
  } = useAmplifyAuth();

  console.log(user);

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
  const Mycontainer = (props) => {
    return <>{user ? <Welcome /> : <Login />}</>;
  };
  const SignInBtn = (props) => {
    return <button onClick={() => Auth.federatedSignIn({ provider: "Google" })}>Google Sign In</button>;
  };
  const SignOutBtn = (props) => {
    return <button onClick={handleSignout}>Google SignOut</button>;
  };

  return !user ? (
    <>
      <SignInBtn />
      <br />
      <SignOutBtn />
    </>
  ) : (
    <UserContext2.Provider value={{ user }}>
      <Router>
        <div className="app-container">
          <Route exact path="/" component={Mycontainer} />
          {/* <Route
          path="/markets/:marketId"
          component={({ match }) => <MarketPage user={user} marketId={match.params.marketId} />}
        /> */}
          <SignInBtn />
          <SignOutBtn />
        </div>
      </Router>
    </UserContext2.Provider>
  );
}
export default App2;
