import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const App3 = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isUserloggedIn, setIsUserloggedIn] = useState(false);

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const responseGoogle = (response) => {
    let email = response.profileObj.email.toString().toLowerCase();
    let emaildomain = email.split("@")[1];
    let authorizedDomain = ["roche.com", "gmail.com"];
    let isAuthorizedDomain = authorizedDomain.includes(emaildomain);
    if (isAuthorizedDomain) {
      setIsUserloggedIn(true);
      setUserDetails(response.profileObj);
    }
    if (!isAuthorizedDomain) {
      setIsUserloggedIn(false);
      setUserDetails(null);
    }
    // console.log(response);
    // setIsUserloggedIn(true);
    // setUserDetails(response.profileObj);
  };

  const logout = () => {
    setIsUserloggedIn(false);
    setUserDetails(null);
  };

  return (
    <div>
      {userDetails && <h3>Welcome mr {userDetails.givenName}</h3>}
      <GoogleLogin
        clientId="169777207398-uk4o9l37mrgmfb9inq4so6i8k87qq9ip.apps.googleusercontent.com"
        fields="first_name,last_name,email,picture"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        buttonText="LogIn"
        isSignedIn={true}
        // hostedDomain="gmail.com"
      />
      <GoogleLogout buttonText="LogOut" onLogoutSuccess={logout} />
      <br />
      <hr />
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </div>
  );
};

export default App3;
