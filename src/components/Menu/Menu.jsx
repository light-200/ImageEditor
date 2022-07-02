import downloadicon from "../../icons/download.svg";
import imgicon from "../../icons/img.svg";
import palleteicon from "../../icons/pallete.svg";
import shuffleicon from "../../icons/shuffle.svg";
import "./Menu.css";

function Menu(props) {
  console.log("menu rendered");

  return (
    <div className="Menu">
      <img className="btn" src={imgicon} />
      <img className="btn" src={palleteicon} />
      <img className="btn" src={shuffleicon} onClick={props.handleImage} />
      <img className="btn" src={downloadicon} onClick={props.handleDownload} />
    </div>
  );
}

export default Menu;
