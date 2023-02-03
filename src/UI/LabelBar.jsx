import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const StyledAutocomplete = styled(Autocomplete)({
  ".MuiAutocomplete-inputRoot": {
    backgroundColor: "transparent",
    decoration: "none",
    "& .MuiInputAdornment-root": {
      border: "none",
    },
  },
});

const LabelBar = ({ className, chips, updateEvent }) => {
  const [barChips, setBarChips] = useState(chips);

  // const handleDeleteChip = (chip, index) => {
  //   const newChipArr = new Set(barChips);
  //   newChipArr.delete(chip);

  //   setBarChips([...newChipArr]);
  //   updateEvent([...newChipArr]);
  // };

  // const handleAddChip = (chip) => {
  //   const newChipArr = [...barChips, chip];

  //   setBarChips(newChipArr);
  //   updateEvent(newChipArr);
  // };

  return (
    <div className={className}>
      <Stack spacing={3} sx={{ width: 500 }}>
        <StyledAutocomplete
          size="small"
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                key={`${option}_${index}`}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              variant="filled"
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default LabelBar;
