/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import axios from "axios";

class Settings extends React.Component {
  /**
   * Denne printer ut all loggene som er i databasen,
   * dette er en av ekstrakravene.
   */
  printLogg() {
    axios
      .get("https://" + document.location.hostname + "/users/getLogg", {})
      .then((response) => {
        // Gjør responsen om til string, og deretter en blob.
        const data = JSON.stringify(response);
        const blob = new Blob([data], { type: "text/plain" });

        // Lager en event på siden, slik at et museklikk simuleres.
        const e = document.createEvent("MouseEvents"),
          a = document.createElement("a");

        // Gir navn til filen, innhold, og simulerer 'Klikk'.
        a.download = "LoggFil";
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
        e.initEvent(
          "click",
          true,
          false,
          window,
          0,
          0,
          0,
          0,
          0,
          false,
          false,
          false,
          false,
          0,
          null
        );
        a.dispatchEvent(e);

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={{
          email: window.sessionStorage.getItem("email"),
          username: window.sessionStorage.getItem("key"),
        }}
        onSubmit={(values, { setSubmitting }) => {
          // Oppdaterer brukernavn
          axios
            .put("https://" + document.location.hostname + "/users/update", {
              email: values.email,
              username: values.username,
            })
            .then((response) => {
              // Logging ved oppdatering av brukernavn i databasen
              axios
                .post("https://" + document.location.hostname + "/users/logg", {
                  email: window.sessionStorage.getItem("email"),
                  act: "Byttet brukernavn",
                  date: new Date().toLocaleString(),
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });

              console.log(response);
              //props.history.push("/");
              window.sessionStorage.setItem("key", response.data.username);
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
              <label className="formTitle">Settings</label>

              <label className="formikLabel">Username</label>
              <input
                className="formikInput"
                name="username"
                placeholder="Enter new username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                className="loginBtn"
                type="submit"
                disabled={isSubmitting}
              >
                Change Username
              </button>

              <button
                className="loginBtn"
                onClick={this.printLogg}
                disabled={isSubmitting}
              >
                Print Logg
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}
export default Settings;
