import React, { useRef, useState } from "react";
import styles from "./Login.module.css";
import { authenticateUser, setCredentials } from "../../api-config/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameEle = useRef();
  const passwordEle = useRef();
  const [message , setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let userName = usernameEle.current.value;
    let password = passwordEle.current.value;
    const User = {
      userName: userName,
      password: password,
    };
    try {
      const response = await authenticateUser(User);
      setMessage("Login successful");
      setCredentials(userName,password);
      navigate('/home');
    } catch (error) {
      setMessage(error.response.data);
    }
    usernameEle.current.value = "";
    passwordEle.current.value = "";
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
        {message}
      </div>
    </div>
  );
}

export default Login;
