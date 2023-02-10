import React from "react";
import MuiTextField from "@mui/material/TextField";

const TextField = ({ className, label, changeHandler, value }) => {
  return (
    <div className={className}>
      <MuiTextField
        id="standard-basic"
        label={label}
        variant="standard"
        onChange={changeHandler}
        value={value}
        InputProps={{ disableUnderline: true }}
        sx={{ width:'100%' }}
      />
    </div>
  );
};

export default TextField;
