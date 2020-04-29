/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import axios from "axios";

const Delete = (props) => (
  <Formik
    enableReinitialize
    initialValues={{
      email: window.sessionStorage.getItem("email"),
      username: window.sessionStorage.getItem("key"),
    }}
    onSubmit={(values, { setSubmitting }) => {
      // Sletter innlogget bruker
      axios
        .put("https://" + document.location.hostname + "/users/delete", {
          email: values.email,
          username: values.username,
        })
        .then((response) => {
          //
          axios
            .post("https://" + document.location.hostname + "/users/logg", {
              email: window.sessionStorage.getItem("email"),
              act: "Bruker Slettet",
              date: new Date().toLocaleString(),
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

          console.log(response);
          window.sessionStorage.setItem("email", null);
          window.sessionStorage.setItem("key", null);
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
          <label className="formTitle">Delete User</label>

          <button className="loginBtn" type="submit" disabled={isSubmitting}>
            Delete User
          </button>
        </form>
      );
    }}
  </Formik>
);

export default Delete;
