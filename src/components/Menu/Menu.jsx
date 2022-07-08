import downloadicon from "../../icons/download.svg";
import imgicon from "../../icons/img.svg";
import paletteicon from "../../icons/pallete.svg";
import shuffleicon from "../../icons/shuffle.svg";
import "./Menu.css";
import Colorpicker from "../Colorpicker/Colorpicker";
import { useState } from "react";

function Menu(props) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  // console.log("menu rendered");

  const disable = {
    opacity: 0.2,
  };

  function onColorSelect(color) {
    props.handleColor(color);
  }

  function handleColorPicker(e) {
    if (e.target.className != "btn") return;
    setShowColorPicker(!showColorPicker);
  }

  return (
    <div className="Menu">
      <img className="btn" src={imgicon} onClick={props.handleVisibilty} />
      <div className="paletteHolder" onClick={handleColorPicker}>
        {showColorPicker && (
          <Colorpicker
            onColorSelect={onColorSelect}
            defaultColor={props.defaultColor}
          />
        )}
        <img className="btn" src={paletteicon} />
      </div>
      <img
        className="btn"
        src={shuffleicon}
        style={!props.showImg ? disable : { opacity: 1 }}
        onClick={() => {
          props.showImg ? props.handleImage() : console.log("disabled");
        }}
      />
      <img className="btn" src={downloadicon} onClick={props.handleDownload} />
    </div>
  );
}

export default Menu;
