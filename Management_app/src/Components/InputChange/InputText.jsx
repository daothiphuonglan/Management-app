import React from "react";
import { Input } from "antd";

const InputText = ({ type, placeholder, ...props }) => {
  if (type === "textarea") {
    return <textarea placeholder={placeholder} {...props}></textarea>;
  }
  return <Input type={type} placeholder={placeholder} {...props} />;
};

export default InputText;
