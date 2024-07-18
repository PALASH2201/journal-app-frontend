import { useRef, useState } from "react";
import { createUser } from "../../api-config/api";
import styles from './create-user.module.css'
import {useNavigate} from 'react-router-dom'

const CreateUser = () => {
  const usernameEle = useRef();
  const passwordEle = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = usernameEle.current.value;
    const password = passwordEle.current.value;
    const User = {
      userName: username,
      password: password,
    };
    try {
     // const response = await createUser(User);
      console.log(User);
      setMessage("User created successfully");
      navigate('/login');
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Could not create account");
    }
    usernameEle.current.value = "";
    passwordEle.current.value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create a new account</h2>
        <p className={styles.subtitle}>
          Enter your username and password to get started.
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              type="text"
              className={styles.input}
              placeholder="Enter your username"
              ref={usernameEle}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="Enter your password"
              ref={passwordEle}
            />
          </div>
          <button type="submit" className={styles.button}>
            Create Account
          </button>
          {message}
        </form> 
      </div>
    </div>
  );
};

export default CreateUser;
