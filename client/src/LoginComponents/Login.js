/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import axios from "axios";

// Brukerdata lagres her.
import UserProfile from "./UserProfile";

const Login = (props) => (


  <Formik
    enableReinitialize
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {


     
      axios
        .get("https://" + document.location.hostname + "/users/login", {
          params: {
            email: values.email,
            password: values.password,
          },
        })
        .then((response) => {

          UserProfile.setEmail(response.data.email);
          window.sessionStorage.setItem("key", response.data.username);
          props.history.push('/Home');
          window.location.reload();
                  
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(window.sessionStorage.getItem("key"));

      setSubmitting(false);
    }}
  >
    {(props) => {
      const {
        values,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
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
