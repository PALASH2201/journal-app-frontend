import React, { useRef, useState } from "react";
import styles from "./account.module.css";
import { updatePassword, updateProfile } from "../../api-config/api";

const AccountSettings = () => {
  const currPassEle = useRef();
  const newPassEle = useRef();
  const confirmNewPassEle = useRef();
  const nameEle = useRef();
  const emailEle = useRef();
  const phoneEle = useRef();
  const [specialClassName, setSpecialClassName] = useState(null);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    const name = nameEle.current.value;
    const email = emailEle.current.value;
    const phone = phoneEle.current.value;

    if (name === "" || email === "" || phone === "") {
      alert("Please fill all the fields");
      return;
    }
    const User = {
      name: name,
      email: email,
      phoneNumber: phone,
    };
    try {
      await updateProfile(User);
      nameEle.current.value = "";
      emailEle.current.value = "";
      phoneEle.current.value = "";
    } catch (error) {
      alert(error);
    }
  };
   const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    const newPass = newPassEle.current.value;
    const confirmNewPass = confirmNewPassEle.current.value;
    if (newPass !== confirmNewPass) {
      alert("Please enter new password twice correctly");
      return;
    }
    const User = {
      password: confirmNewPass,
    };
    let response = null;
    try {
      if(await updatePassword(User).statuscode !== 201){
        alert("Your current password is not matching"); 
        return;
      }else{
        newPassEle.current.value = "";
        currPassEle.current.value = "";
        confirmNewPassEle.current.value = "";
        setSpecialClassName(null);
      }
    } catch (error) {
      console.log("Error: ",error);
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
            <input
              ref={nameEle}
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              ref={emailEle}
              type="email"
              id="email"
              name="email"
              placeholder="john@example.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              ref={phoneEle}
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 555-5555"
            />
          </div>
          <button type="submit" className={styles.saveChanges} onClick={handleProfileUpdate}>
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
