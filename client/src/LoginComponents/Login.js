/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import axios from "axios";

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
          // Logger at en bruker har logget inn.
          axios
            .post("https://" + document.location.hostname + "/users/logg", {
              email: values.email,
              act: "Logget inn",
              date: new Date().toLocaleString(),
            })
            .then((response) => {
              console.log(response);
              console.log("Login er logget");
            })
            .catch((error) => {
              console.log(error);
            });

          // Legger brukernavn og email inn i SessionStorage.
          window.sessionStorage.setItem("key", response.data.username);
          window.sessionStorage.setItem("email", response.data.email);
          props.history.push("/");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
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
