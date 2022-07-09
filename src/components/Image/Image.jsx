import { useRef, useState, forwardRef, useEffect } from "react";
import { ImgText } from "../ImageText/ImgText";
import "./Image.css";

function Image({ imgUrl, color, showImg, imgHeight, imgWidth }, ref) {
  const imgTextInput = useRef(null);
  const imgText = useRef(null);
  const [text, setText] = useState("");

  const imgStyle = {
    width: `${imgWidth}px`,
    height: `${imgHeight}px`,
  };

  let bg = {};
  if (showImg) {
    bg = {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${imgUrl})`,
    };
  } else {
    bg = {
      background: color,
    };
  }

  // console.log("Image rendered");

  return (
    <div
      className="img"
      style={imgStyle}
      ref={ref}
      onClick={() => imgTextInput.current.focus()}
    >
      {imgUrl != " " ? <img src={imgUrl} alt="image" style={bg} /> : null}
      <input
        className="imgTextInput"
        ref={imgTextInput}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <ImgText text={text} setText={setText} ref={imgText} />
    </div>
  );
}

export default forwardRef(Image);
