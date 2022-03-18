import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  //for routing after login,
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  //acces to the login state of the app
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const FireBaseAPIKey = "AIzaSyAWbOqrQJ6m5nVwQ3v1IPaDbtOr7ICsmgQ";
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    //optional: add validation
    setIsLoading(true);

    let url;
    if (isLogin) {
      //url for login
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FireBaseAPIKey}`;
    } else {
      //url for sign up
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FireBaseAPIKey}`;
    }
    let options = {
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "text/plain",
      },
    };

    console.log(options);
    //request to firebase for login/signup
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        //firebase responded
        setIsLoading(false);
        if (res.ok) {
          //action was successfuly processed
          return res.json();
        } else {
          //in case the API sign up throws an error
          res.json().then((data) => {
            let errorMessage = "Authentification failed!";
            //create msgs for each err message
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            //change with state
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        //success token get
        //transform expiresIn from milisec into seconds and then into date
        let time = parseInt(data.expiresIn) * 1000;
        time = new Date().getTime() + time;
        const expirationTime = new Date(time);
        authCtx.login(data.idToken, expirationTime.toISOString());
        //redirect, replace so the user cannot use the backbutton
        history.replace("/Transactions");
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Request is being processed...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
