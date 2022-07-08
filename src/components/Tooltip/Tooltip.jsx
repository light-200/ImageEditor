import "./Tooltip.css";

export function Tooltip({ hidden, handleMove, handleDelete }) {
  return (
    <div className={hidden ? "hidden tooltip" : "tooltip"}>
      <div className="move" onClick={handleMove}>
        🤚
      </div>
      {/* <div className="resize"></div> */}
      <div className="delete" onClick={handleDelete}>
        ❎
      </div>
    </div>
  );
}
