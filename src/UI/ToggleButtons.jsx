import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtons = ({ options, event }) => {
  const [filter, setFilter] = React.useState(options[0]);

  const handleToggle = (e) => {
    setFilter(e.target.value);
    event(e.target.value);
  };

  return (
    <ToggleButtonGroup
      value={filter}
      exclusive
      onChange={handleToggle}
      aria-label="todo list filter"
    >
      {options.map((option) => (
        <ToggleButton value={option} aria-label={option} key={`filter_${option}`}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
