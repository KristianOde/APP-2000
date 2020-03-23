import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

class Register extends React.Component {
 
  render() {
    return (
      <div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log("Logging in", values);
              setSubmitting(false);
            }, 500);
          }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (!EmailValidator.validate(values.email)) {
              errors.email = "Invalid email address";
            }

            const passwordRegex = /(?=.*[0-9])/;
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
              errors.password = "Invalida password. Must contain one number";
            }

            return errors;
          }}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            } = props;
            return (
              <form className="signInForm" onSubmit={handleSubmit}>
                <label className="formTitle">Sign Up</label>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}

                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={values.username}
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
                  className={errors.password && touched.password && "error"}
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
                <button
                  onClick={this.postDataHandler}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default Register;