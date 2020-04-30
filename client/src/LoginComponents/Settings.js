/**
 * Skrevet av Mikael
 */

import React from "react";
import { Formik } from "formik";
import axios from "axios";

class Settings extends React.Component {
  /**
   * Denne printer ut alle loggene som er i databasen,
   * dette er for en av ekstrakravene.
   */
  printLogg() {
    axios
      .get("https://" + document.location.hostname + "/users/getLogg", {
        email: window.sessionStorage.getItem("email"),
      })
      .then((response) => {
        // fant en del av dette her
        // https://stackoverflow.com/questions/48611671/vue-js-write-json-object-to-local-file
        // Gjør responsen om til string, og deretter en blob.

        let data = "";
        // Gjøres om til string som gjøres om til objekt
        let object = JSON.parse(JSON.stringify(response.data));

        // Bygger stringen som legges inn i loggfilen
        for (let i = 0; i < object.length; i++) {
          // Hvis session email passer objekt email
          // Er bedre å gjøre dette i spørringen til databasen men grunnet tidspress ble det slik
          if (object[i].email == window.sessionStorage.getItem("email"))
            data +=
              "(" +
              object[i].email +
              ", " +
              object[i].act +
              ", " +
              object[i].date +
              "), ";
        }

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

  deleteUser() {
    // Sletter innlogget bruker
    axios
      .put("https://" + document.location.hostname + "/users/delete", {
        email: window.sessionStorage.getItem("email"),
        username: window.sessionStorage.getItem("key"),
      })
      .then((response) => {
        // Logger at brukeren ble slettet
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
        window.location.replace("https://app2000rpg.herokuapp.com/#/");
        window.location.reload();
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

              // Setter brukernavn i session og laster siden pånytt
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
            // Skjemaet under settings
            <form onSubmit={handleSubmit}>
              <label className="formTitle">Settings</label>

              <label className="formikLabel">New Username</label>
              <input // Input for nytt brukernavn
                className="formikInput"
                name="username"
                placeholder="Enter new username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button // Knapp som bytter brukernavnet
                className="loginBtn"
                type="submit"
                disabled={isSubmitting}
              >
                Change Username
              </button>
              <button // Knapp som printer loggen
                className="loginBtn"
                type="button"
                onClick={this.printLogg}
                disabled={isSubmitting}
              >
                Print Logg
              </button>
              <button // Knapp som printer loggen
                className="loginBtn"
                type="button"
                onClick={this.deleteUser}
                disabled={isSubmitting}
              >
                Delete User Profile
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}
export default Settings;
