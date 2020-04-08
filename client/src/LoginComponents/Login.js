/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import axios from "axios";

// Brukerdata lagres her.
import UserProfile from "./UserProfile";




// Testing
export function Counter({ count, onIncrementClick }) {
  return <button onClick={onIncrementClick}>{count}</button>;
}

export function CountDisplay({ count }) {
  return <div>The current counter count is {count}</div>;
}


const Login = () => (
  <Formik
    enableReinitialize
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      axios
        .get("http://localhost:4000/users/login", {
          params: {
            email: values.email,
            password: values.password
          }
        })
        .then(response => {
          console.log(response.data.email);

          UserProfile.setEmail(response.data.email);

          // Henter ut sånn her.
          console.log(UserProfile.getEmail());
        })
        .catch(error => {
          console.log(error);
        });
      setSubmitting(false);

      console.log("dsfd" + UserProfile.getEmail());
    }}
  >
    {props => {
      const {
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label className="formTitle">Login</label>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button className="loginBtn" type="submit" disabled={isSubmitting}>
            Login
          </button>
        </form>
      );
    }}
  </Formik>
);

export default Login;
