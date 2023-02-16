import React from "react";
import { styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";

const StyledMuiTextField = styled(MuiTextField)({
  "& label.Mui-focused": {
    color: "rgb(68 68 68)",
  },
  "& label": {
    color: "rgb(68 68 68)",
  },
  "& .MuiInput-input": {
    color: "rgb(68 68 68)",
  },
  "@media (prefers-color-scheme: dark)": {
    "& label.Mui-focused": {
      color: "rgb(190 190 190)",
    },
    "& label": {
      color: "rgb(190 190 190)",
    },
    "& .MuiInput-input": {
      color: "rgb(190 190 190)",
    },
  },
});

const TextField = ({ className, label, changeHandler, value }) => {
  return (
    <div className={className}>
      <StyledMuiTextField
        label={label}
        variant="standard"
        onChange={changeHandler}
        value={value}
        InputProps={{ disableUnderline: true }}
        sx={{ width: "100%" }}
      />
    </div>
  );
};

export default TextField;
