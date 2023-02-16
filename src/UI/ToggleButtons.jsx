import * as React from "react";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-root": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
  "& .MuiToggleButton-root": {
    color: "rgb(107 114 128)",
  },
  "& .Mui-selected": {
    color: "rgb(107 114 128)",
  },
  "@media (prefers-color-scheme: dark)": {
    "& .MuiToggleButton-root": {
      color: "rgb(190 190 190)",
    },
    "& .Mui-selected": {
      color: "rgb(190 190 190)",
    },
  },
}));

const ToggleButtons = ({ toggleState, setToggleState, options, event }) => {
  const handleToggle = (e) => {
    setToggleState(e.target.value);
    event(e.target.value);
  };

  return (
    <StyledToggleButtonGroup
      value={toggleState}
      exclusive
      onChange={handleToggle}
      aria-label="todo list filter"
    >
      {options.map((option) => (
        <ToggleButton
          sx={{
            color: " rgb(190 190 190)",
          }}
          value={option}
          aria-label={option}
          key={`filter_${option}`}
        >
          {option}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

export default ToggleButtons;
