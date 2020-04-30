/**
 * Skrevet av Tommy
 */

import React from "react";
import styles from "./styles.module.css";

export const Header = ({ children, ...rest }) => (
  // eslint-disable-next-line
  <h1 className={styles.header} {...rest}>
    {" "}
    {children}{" "}
  </h1>
);

export const Subheader = ({ children, ...rest }) => (
  <small className={styles.subheader} {...rest}>
    {" "}
    {children}{" "}
  </small>
);

export const Content = ({ children, ...rest }) => (
  <div className={styles.content} {...rest}>
    {" "}
    {children}{" "}
  </div>
);
