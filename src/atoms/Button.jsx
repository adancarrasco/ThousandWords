import React from "react";

import styles from "./Button.module.css";

const Button = ({ customClassName, children, onClick }) => (
  <button className={`${styles.wrapper} ${customClassName}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
