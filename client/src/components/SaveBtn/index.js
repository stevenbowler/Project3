import React from "react";
import axios from "axios";

// import "./style.css";

export function SaveBtn (props) {

  return (
      <div style={{color:"white"}}>
    <button className="btn" role="button" onClick={() =>
    props.saveCampGround(props.index)}>
    Save
    </button>
    </div>
  );
}


export default SaveBtn;