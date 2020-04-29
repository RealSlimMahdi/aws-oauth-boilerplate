import React, { useEffect, useReducer } from "react";
import { Auth, Hub } from "aws-amplify";
import userReducer from "./userReducer";
import UserContext from "./UserContext";

// Create a context that will hold the values that we are going to expose to our components.
// Don't worry about the `null` value. It's gonna be *instantly* overriden by the component below
// export const UserContext = createContext(null);

// Create a "controller" component that will calculate all the data that we need to give to our
// components bellow via the `UserContext.Provider` component. This is where the Amplify will be
// mapped to a different interface, the one that we are going to expose to the rest of the app.
export const UserProvider = (props) => {
  // Initial State
  const initialUserState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    isAuthenticating: false,
    errors: null,
  };

  //   const [user, setUser] = React.useState(null);
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  console.log("Enter User Provider");

  useEffect(() => {
    // Set loading to true
    dispatch({ type: "LOADING" });

    // Check if User exists
    Auth.currentAuthenticatedUser()
      .then((user) => dispatch({ type: "LOGIN_USER", payload: user }))
      .catch((err) => console.log(err));

    // set listener for auth events
    Hub.listen("auth", async (data) => {
      //   setImmediate(() => dispatch({ type: "LOADING" }));
      const { payload } = data;
      if (payload.event === "signIn") {
        setImmediate(() => checkUser(dispatch));
        // setImmediate(() => dispatch({ type: "LOGIN_USER", payload: payload.data }));
      } else if (payload.event === "signOut") {
        setImmediate(() => dispatch({ type: "SIGNOUT_USER" }));
      }
    });
    // we check for the current user unless there is a redirect to ?signedIn=true
    if (!window.location.search.includes("?signedin=true")) {
      checkUser(dispatch);
    }
    dispatch({ type: "NOT_LOADING" });
  }, []);

  async function checkUser() {
    dispatch({ type: "LOADING" });
    try {
      const user = await Auth.currentAuthenticatedUser();
      dispatch({ type: "LOGIN_USER", payload: user });
    } catch (err) {
      dispatch({ type: "AUTH_ERROR", payload: err });
    }
    dispatch({ type: "NOT_LOADING" });
  }

  async function signOut() {
    dispatch({ type: "LOADING" });
    await Auth.signOut({ global: true });
    dispatch({ type: "NOT_LOADING" });
  }

  const GoogleSignIn = () => {
    Auth.federatedSignIn({ provider: "Google" });
  };

  // Make sure to not force a re-render on the components that are reading these values,
  // unless the `user` value has changed. This is an optimisation that is mostly needed in cases
  // where the parent of the current component re-renders and thus the current component is forced
  // to re-render as well. If it does, we want to make sure to give the `UserContext.Provider` the
  // same value as long as the user data is the same. If you have multiple other "controller"
  // components or Providers above this component, then this will be a performance booster.
  //   React.useMemo(() => ({ userState, checkUser, signOut, GoogleSignIn }), [userState]);

  // Finally, return the interface that we want to expose to our other components
  return (
    <UserContext.Provider
      value={{
        user: userState.user,
        loading: userState.loading,
        isAuthenticated: userState.isAuthenticated,
        isAuthenticating: userState.isAuthenticating,
        errors: userState.errors,
        signOut,
        checkUser,
        GoogleSignIn,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// We also create a simple custom hook to read these values from. We want our React components
// to know as little as possible on how everything is handled, so we are not only abtracting them from
// the fact that we are using React's context, but we also skip some imports.
export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("`useUser` hook must be used within a `UserProvider` component");
  }
  return context;
};
