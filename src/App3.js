import React, { useState, useEffect } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const App3 = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isUserloggedIn, setIsUserloggedIn] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

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
      setUserDetails({});
    }
  };

  const logout = () => {
    setIsUserloggedIn(false);
  };

  return (
    <div className="g-signin2" data-onsuccess="onSignIn">
      {isUserloggedIn && <h3>Welcome mr {userDetails.givenName}</h3>}
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_SECRET_CODE}
        fields="first_name,last_name,email,picture"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        buttonText="LogIn"
        isSignedIn={true}
      />
      <GoogleLogout buttonText="LogOut" onLogoutSuccess={logout} />
    </div>
  );
};

export default App3;
