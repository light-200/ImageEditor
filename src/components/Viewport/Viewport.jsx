import { useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import Menu from "../Menu/Menu";

import "./Viewport.css";

function Viewport() {
  const image = useRef(null);
  const imgText = useRef(null);
  const imgTextInput = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [text, setText] = useState("");

  const getImage = async () => {
    console.log("get image called");
    setImgUrl(" ");
    const url = "https://source.unsplash.com/400x400/?asthetic";
    await fetch(url)
      .then((data) => {
        setImgUrl(data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dragElement(image.current);
    getImage();
  }, []);

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
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

  function download() {
    console.log("download called");
    exportComponentAsJPEG(image);
  }

  const imgStyle = {
    width: `800px`,
    height: `800px`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${imgUrl})`,
  };

  console.log("viewport rendered");

  return (
    <>
      <div className="Viewport">
        <div
          className="img"
          ref={image}
          style={imgStyle}
          onClick={() => imgTextInput.current.focus()}
        >
          <input
            className="imgTextInput"
            ref={imgTextInput}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <div className="imgText" ref={imgText}>
            {text}
          </div>
        </div>
      </div>
      <Menu handleDownload={download} handleImage={getImage}></Menu>
    </>
  );
}

export default Viewport;
