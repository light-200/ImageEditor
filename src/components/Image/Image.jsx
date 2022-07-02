import { useRef, useState, forwardRef } from "react";
import "./Image.css";
function Image({ imgUrl, color, showImg }, ref) {
  const imgTextInput = useRef(null);
  const imgText = useRef(null);
  const [text, setText] = useState("");
  const [imgMoveTool, setImgMoveTool] = useState(false);
  const [textMoveTool, setTextMoveTool] = useState(false);

  const imgStyle = {
    width: `800px`,
    height: `800px`,
  };

  const bg = showImg
    ? {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${imgUrl})`,
      }
    : {
        background: color,
      };

  const imgMove = {
    cursor: imgMoveTool ? "grab" : "initial",
  };

  const textMove = {
    cursor: textMoveTool ? "grab" : "initial",
  };

  function handleMove(e) {
    if (e.target.className == "imgText") {
      setTextMoveTool(!textMoveTool);
      dragElement(imgText.current);
    } else {
      setImgMoveTool(!imgMoveTool);
      dragElement(ref.current);
    }
  }

  console.log("Image rendered");

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      if (e.target.className == "imgText") {
        if (textMoveTool) return;
        if (imgMoveTool) return;
      } else {
        if (imgMoveTool) return;
      }
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  return (
    <div
      className="img"
      ref={ref}
      style={{ ...imgStyle, ...imgMove, ...bg }}
      onClick={() => imgTextInput.current.focus()}
      onDoubleClick={handleMove}
    >
      <input
        className="imgTextInput"
        ref={imgTextInput}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></input>
      <div
        className="imgText"
        style={textMove}
        ref={imgText}
        onDoubleClick={handleMove}
      >
        {text}
      </div>
    </div>
  );
}

export default forwardRef(Image);
