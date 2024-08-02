import React, { useContext, useRef, useEffect } from "react";
import styles from "./Login.module.css";
import { login, setCredentials } from "../../api-config/api";
import { useNavigate } from "react-router-dom";
import { JournalAppContext } from "../../store/journal-app-store";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";

function Login() {
  const usernameEle = useRef();
  const passwordEle = useRef();
  const navigate = useNavigate();
  const { handleLogin } = useContext(JournalAppContext);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userName = usernameEle.current.value;
    let password = passwordEle.current.value;
    const User = {
      userName: userName,
      password: password,
    };
    try {
      const response = await login(User);
      setCredentials(response.data);
      handleLogin();
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    usernameEle.current.value = "";
    passwordEle.current.value = "";
  };

  const handleGoogleLogin = async (response) => {
    try {
      const res = await fetch('http://localhost:8080/public/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: response.credential })
      });
      const data = await res.json();
      console.log(data.jwt);
      setCredentials(data.jwt);
      handleLogin();
      navigate("/home");
      //console.log(response.credential);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              ref={usernameEle}
              id="username"
              type="text"
              className={styles.formInput}
              placeholder="jdoe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              ref={passwordEle}
              id="password"
              type="password"
              className={styles.formInput}
              placeholder="********"
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <p className={styles.signupPrompt}>
          Don't have an account? <a href="/create-user">Create account</a>
        </p>
        <GoogleLogin
          clientId ={process.env.REACT_APP_CLIENT_ID}
          onSuccess={(response) => handleGoogleLogin(response)}
          onError={(error) => console.log(error)}
        />
      </div>
    </div>
  );
}

export default Login;
