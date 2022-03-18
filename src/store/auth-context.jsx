import React, { useState, useEffect, useCallback } from "react"

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,

  // functions to change the state
  login: (token) => { },
  logout: () => { }
});

//calculate the token expiration to input in localstorage and auto-logout
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime
  return remainingDuration;
}

//look into localstorage and get token only if it is valid
const retreieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  //token expired in 1 hour
  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return { token: storedToken, duration: remainingTime }
}
//wrapper that has access to the above context
export const AuthContextProvider = (props) => {
  //check localstorage for token timer validity
  const tokenData = retreieveStoredToken();
  //when app starts, check localstorage for token and if so, set the token
  //localstorage is sync api
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  //mange state of data
  const [token, setToken] = useState(initialToken)
  //infer if user is logged in based on the token existance
  const userIsLoggedIn = !!token;

  //functions to change the token state
  const logoutHandler = useCallback(() => {
    setToken(null)
    //delete the token from localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    //delete logoutTimer Timeout
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token)
    //localstorage for token for autologin
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    //calculate the remaining time for auto-logout
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime)
  };

  //if there is a valid token at the start, set the timer accordingly
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration)
    }
  }, [tokenData, logoutHandler])

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext