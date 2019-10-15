import React from "react";

import Button from "../atoms/Button";

import styles from "./ButtonSet.module.css";

const ButtonSet = props => (
  <div className={styles.wrapper}>
    {props.items.map((item, index) => (
      <Button key={item + index} {...item.props}>
        {item.children}
      </Button>
    ))}
  </div>
);

export default ButtonSet;
