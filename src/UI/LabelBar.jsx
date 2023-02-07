import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const LabelBar = ({ className, chips, updateEvent }) => {
  const [barChips, setBarChips] = useState(chips);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e, values) => {
    setBarChips(values);
    updateEvent(values);
  };

  return (
    <div className={className}>
      <Stack spacing={3} sx={{ width: 500 }}>
        <Autocomplete
          value={barChips}
          size="small"
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          onChange={handleChange}
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
          inputValue={inputValue}
          onInputChange={(e, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              variant="standard"
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default LabelBar;
