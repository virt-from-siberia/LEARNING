import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    handleOnChange,
  };
}

const useStyle = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export function Form(props) {
  const classes = useStyle();

  return (
    <form className={classes.root} autoComplete="off">
      {props.children}
    </form>
  );
}
