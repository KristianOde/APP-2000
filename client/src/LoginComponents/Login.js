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
      // Sender en request om å logge inn
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
          // Gir en alert hvis ikke innskrevet bruker ligger i databasen
          window.alert('Wrong username and password');
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
        // Login form
        <form onSubmit={handleSubmit}>
          <img className="smolGobGob" src="../Goblin.png" alt='gobgobsmol'></img>
          <label className="formTitle">Login</label>
          <label className="formikLabel">Email</label>
          <input
            className="formikInput"
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <label className="formikLabel">Password</label>
          <input
            className="formikInput"
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
