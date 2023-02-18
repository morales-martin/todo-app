import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiButtonBase-root": {
    backgroundColor: "white",
  },
  "& path": {
    fill: "rgb(107 114 128)",
  },
  "& input": {
    color: "rgb(107 114 128)",
  },
  "& .MuiChip-label": {
    color: "rgb(107 114 128)",
  },
  "@media (prefers-color-scheme: dark)": {
    "& .MuiButtonBase-root": {
      backgroundColor: "rgb(68, 68, 68)",
    },
    "& path": {
      fill: "rgb(190, 190, 190)",
    },
    "& input": {
      color: "rgb(190, 190, 190)",
    },
    "& .MuiChip-label": {
      color: "rgb(190, 190, 190)",
    },
  },
});

const LabelBar = ({ className, chips, updateEvent, label = "" }) => {
  const [barChips, setBarChips] = useState(chips);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setBarChips(chips);
  }, [chips]);

  const handleChange = (e, values) => {
    setBarChips(values);
    updateEvent(values);
  };

  return (
    <div className={className}>
      <Stack spacing={3} style={{ width: "100%" }}>
        <StyledAutocomplete
          value={barChips}
          size="small"
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          onChange={handleChange}
          renderTags={(values, getTagProps) =>
            values.map((option, index) => (
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
              sx={{ input: { color: "rgb(107, 114, 128)" } }}
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              variant="standard"
              label={label}
              placeholder={"Add flag"}
            />
          )}
        />
      </Stack>
    </div>
  );
};

export default LabelBar;
