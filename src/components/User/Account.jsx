import React, { useRef, useState } from "react";
import styles from "./account.module.css";
import { updatePassword } from "../../api-config/api";

const AccountSettings = () => {
  const currPassEle = useRef();
  const newPassEle = useRef();
  const confirmNewPassEle = useRef();
  const [specialClassName, setSpecialClassName] = useState(null);
  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    const currPass = localStorage.getItem("password");
    const newPass = newPassEle.current.value;
    const confirmNewPass = confirmNewPassEle.current.value;
    if (newPass !== confirmNewPass) {
      alert("Your current password is not matching");
      return;
    } else if (currPass != currPassEle.current.value) {
      alert("Your current password is not correct");
      return;
    }
    const userName = localStorage.getItem("userName");
    const User = {
      userName: userName,
      password: confirmNewPass,
    };
    try {
      await updatePassword(User);
      newPassEle.current.value = "";
      currPassEle.current.value = "";
      confirmNewPassEle.current.value = "";
      setSpecialClassName(null);
    } catch (error) {
      console.log(error);
    }
  };

  const checkPassword = () => {
    const newPass = newPassEle.current.value;
    const confirmNewPass = confirmNewPassEle.current.value;
    if (newPass !== confirmNewPass) {
      setSpecialClassName(styles.wrongInput);
    } else {
      setSpecialClassName(styles.correctInput);
    }
  };
  return (
    <div className={styles.accountSettings}>
      <h1>Account Settings</h1>
      <section className={styles.personalInfo}>
        <h2>Personal Information</h2>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 555-5555"
            />
          </div>
          <button type="submit" className={styles.saveChanges}>
            Save Changes
          </button>
        </form>
      </section>
      <section className={styles.changePassword}>
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordUpdate}>
          <div className={styles.formGroup}>
            <label htmlFor="current-password">Current Password</label>
            <input
              ref={currPassEle}
              type="password"
              id="current-password"
              name="current-password"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="new-password">New Password</label>
            <input
              ref={newPassEle}
              type="password"
              id="new-password"
              name="new-password"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              className={specialClassName}
              ref={confirmNewPassEle}
              onChange={checkPassword}
              type="password"
              id="confirm-password"
              name="confirm-password"
            />
          </div>
          <button type="submit" className={styles.changePasswordBtn}>
            Change Password
          </button>
        </form>
      </section>
      <section className={styles.deleteAccount}>
        <h2>Delete Account</h2>
        <p>
          Deleting your account is a permanent action and cannot be undone. All
          your data will be permanently removed from our servers.
        </p>
        <button className={styles.deleteAccountBtn}>Delete Account</button>
      </section>
    </div>
  );
};

export default AccountSettings;
