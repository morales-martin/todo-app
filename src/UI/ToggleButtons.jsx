import * as React from "react";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtons = ({ options, event }) => {
  const [filter, setFilter] = React.useState(options[0]);

  const handleToggle = (e) => {
    setFilter(e.target.value);
    event(e.target.value);
  };

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
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
  }));

  return (
    <StyledToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleToggle}
      aria-label="todo list filter"
    >
      {options.map((option) => (
        <ToggleButton
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
