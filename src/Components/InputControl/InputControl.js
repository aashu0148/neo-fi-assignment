import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "react-feather";

import { handleNumericInputKeyDown } from "utils/util";

import styles from "./InputControl.module.scss";

const InputControl = forwardRef(
  (
    {
      subLabel,
      label,
      error,
      className,
      password = false,
      hintText = "",
      icon,
      numericInput = false,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(password ? false : true);

    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label}>
            {label}
            <span> {subLabel}</span>
          </label>
        )}
        <div className={`${styles.inputContainer} ${className || ""}`}>
          <input
            className={`basic-input ${password ? styles.passwordInput : ""} ${
              error ? "basic-input-error" : ""
            }`}
            type={visible ? "text" : "password"}
            {...props}
            ref={ref}
            onKeyDown={(event) =>
              numericInput ? handleNumericInputKeyDown(event) : ""
            }
          />

          {password ? (
            <div className={styles.eye} onClick={() => setVisible(!visible)}>
              {visible ? <Eye /> : <EyeOff />}
            </div>
          ) : icon ? (
            <div className={styles.icon}>{icon}</div>
          ) : (
            ""
          )}
        </div>
        {hintText ? <p className={styles.hint}>{hintText}</p> : ""}
        {error ? <p className={styles.errorMsg}>{error}</p> : ""}
      </div>
    );
  }
);

export default InputControl;
