import React from "react";
import axios from "axios";

// import "./style.css";

export function SaveBtn (props) {
  
  return (
    <span style={{color:"white"}} className="save-btn" {...props} role="button" tabIndex="0">
      Save
    </span>
  );
}


export default SaveBtn;