import React, { useState } from "react";
import ChipInput from "material-ui-chip-input";

const LabelBar = ({ className, chips, updateEvent }) => {
  const [barChips, setBarChips] = useState(chips);

  const handleDeleteChip = (chip, index) => {
    const newChipArr = new Set(barChips);
    newChipArr.delete(chip);

    setBarChips([...newChipArr]);
    updateEvent([...newChipArr]);
  };

  const handleAddChip = (chip) => {
    const newChipArr = [...barChips, chip];

    setBarChips(newChipArr);
    updateEvent(newChipArr);
  };

  return (
    <div className={className}>
      <ChipInput
        value={barChips}
        onAdd={(chip) => handleAddChip(chip)}
        onDelete={(chip, index) => handleDeleteChip(chip, index)}
        allowDuplicates={false}
        disableUnderline={true}
      />
    </div>
  );
};

export default LabelBar;
