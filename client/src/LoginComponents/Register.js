/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import axios from "axios";

const Register = (props) => (
  <Formik
    initialValues={{ email: "", password: "", username: "" }}
    onSubmit={(values, { setSubmitting }) => {
      // Sjekker om epost allerede er registrert
      axios
        .get("https://" + document.location.hostname + "/users/emailCheck", {
          params: {
            email: values.email,
          },
        })
        .then((response) => {
          // Legger inn ny bruker i databasen
          axios
            .post(
              "https://" + document.location.hostname + "/users/register",
              values
            )
            .then((response) => {
              // Logging ved innlegging av bruker i databasen
              axios
                .post("https://" + document.location.hostname + "/users/logg", {
                  email: values.email,
                  act: "Bruker registrert",
                  date: new Date().toLocaleString(),
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
                // Setter epost og brukernavn i session storage
              window.sessionStorage.setItem("email", response.data.email);
              window.sessionStorage.setItem("key", response.data.username);
              // Sender bruker til character creation og laster siden pånytt
              props.history.push("/CharacterCreation");
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          // Gir en alert når epost allerede ligger i databasen
          window.alert('Email is taken, please choose a different email!');
          console.log(error);
        });

      setSubmitting(false);
    }}
    /*
     * Validerer det som er skrivd inn i skjemaet og fyller inn feilmeldinger
     */
    validate={(values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Wrong email address";
      }
      // Sjekker om brukernavn er tom 
      if (!values.username) {
        errors.username = "Required";
      }
      // Sjekker om passord følger kravene
      const passwordRegex = /(?=.*[0-9])/;
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be 8 characters long.";
      } else if (!passwordRegex.test(values.password)) {
        errors.password = "Wrong password. Must contain one number";
      }

      return errors;
    }}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return ( // Skjema for registrering
        <form className="signInForm" onSubmit={handleSubmit}>
          <img className="smolGobGob" src="../Goblin.png" alt='gobgobsmol'></img>
          <label className="formTitle">Sign Up</label>
          <label className="formikLabel">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
            className="formikInput"
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}

          <label className="formikLabel">Username</label>
          <input
            name="username"
            type="text"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username && "error"}
            className="formikInput"
          />
          {errors.username && touched.username && (
            <div className="input-feedback">{errors.username}</div>
          )}

          <label className="formikLabel">Password</label>
          <input
            className="formikInput"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password && "error"}
            className="formikInput"
          />
          {errors.password && touched.password && (
            <div className="input-feedback">{errors.password}</div>
          )}
          <button className="loginBtn" type="submit" disabled={isSubmitting}> 
            Sign up
          </button>
        </form>
      );
    }}
  </Formik>
);

export default Register;
