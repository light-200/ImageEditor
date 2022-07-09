import { useState, forwardRef } from "react";
import { Tooltip } from "../Tooltip/Tooltip";

export const ImgText = forwardRef(({ text, setText }, ref) => {
  const [textMoveTool, setTextMoveTool] = useState(false);
  const [hideTooltip, setHideTooltip] = useState(false);

  function handleMove() {
    setTextMoveTool(!textMoveTool);
    dragElement(ref.current);
  }

  function handleTooltip(e) {
    if (e.target.parentElement.className == "tooltip" || textMoveTool) return;
    setHideTooltip(!hideTooltip);
  }

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      if (textMoveTool) return;

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

  function handleDelete() {
    setText("");
  }

  return (
    <>
      <div
        className={`imgText ${textMoveTool ? "grab" : ""}`}
        ref={ref}
        onClick={handleTooltip}
      >
        {text != " " && text ? (
          <Tooltip
            handleMove={handleMove}
            hidden={hideTooltip}
            handleDelete={handleDelete}
          />
        ) : null}
        {text}
      </div>
    </>
  );
});
