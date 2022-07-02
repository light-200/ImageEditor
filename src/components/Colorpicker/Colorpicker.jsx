import { useState } from "react";
import { ChromePicker } from "react-color";

function Colorpicker({ onColorSelect }) {
  const [color, setColor] = useState("#fff");
  const handleOnChange = (color) => {
    setColor(color.hex);
  };

  // Passing the selected color to parent component
  setTimeout(() => {
    // SetTimeout added to update color correctly
    onColorSelect(color);
  });

  return (
    <ChromePicker className="palette" color={color} onChange={handleOnChange} />
  );
}

export default Colorpicker;
