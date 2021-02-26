import React from "react";

import { TextField } from "@material-ui/core";

export const Input = (props) => {
  const { name, label, value, onChange } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};
