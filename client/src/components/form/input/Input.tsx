// this stylesheet could be placed in common folder
import s from "./style.module.less";
import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required?: boolean;
  value?: string;
  isError?: boolean;
  errorText?: string;
}

const InputText = ({
  name,
  onChange,
  label,
  placeholder,
  required,
  value,
  isError,
  errorText,
}: Props) => {
  return (
    <>
      <label htmlFor={name}>
        <span className={s.srOnly}>{label}</span>
        <input
          type="text"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          value={value}
        />
      </label>
      {isError && <span className={s.error}>{errorText}</span>}
    </>
  );
};

export default InputText;
