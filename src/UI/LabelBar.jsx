import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const LabelBar = ({ options, className }) => {
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div className={className}>
      <Stack direction="row" spacing={1}>
        {options.map((option) => (
          <Chip size="small" variant="outlined" label={option} key={option} onDelete={handleDelete} />
        ))}
      </Stack>
    </div>
  );
};

export default LabelBar;
