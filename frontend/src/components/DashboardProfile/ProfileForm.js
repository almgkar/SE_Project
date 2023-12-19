import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ProfileForm.css";

const ProfileForm = () => {
  const { state } = useLocation();
  const user_id = state.userId;
  useEffect(() => {
    getUserData();
  }, []);

  const [formData, setFormData] = useState({
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    user_passkey: "john.doe@example.com",
  });

  const getUserData = () => {
    console.log(user_id);
    fetch(
      "http://localhost:3001/userInfo/get-user?type=username&term=" + user_id
    )
      .then((response) => response.json())
      .then((data) => {
        const temp = {
          first_name: data.user.first_name,
          last_name: data.user.last_name,
          email: data.user.user_id,
          user_passkey: "randomPassword",
        };
        setFormData(temp);
      });
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     name: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to handle the form submission, e.g., updating the profile
    console.log("Form submitted with data:", formData);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch("http://localhost:3001/editProfile/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.token) {
          //success
          // navigate("/Dashboard");
          console.log("Profile Updated Successfully");
        } else {
          //failure
          // setError(true);
          // setErrorMsg(data?.error);
          console.log("Profile update unsuccessful");
        }
      });
  };

  return (
    <div className={styles.form}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.control}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            className={styles.input}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            className={styles.input}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled // Make the email field read-only
            className={styles.input}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="user_passkey"
            value={formData.user_passkey}
            onChange={(e) =>
              setFormData({ ...formData, user_passkey: e.target.value })
            }
            className={styles.input}
          />
        </div>

        <div className={styles.action}>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
