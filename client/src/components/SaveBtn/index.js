import React from "react";
import axios from "axios";
import { Collapse, Button, CardText } from 'reactstrap';

// import "./style.css";

export function SaveBtn (props) {
  
  return (
    <Button className="save-btn" style={{backgroundColor:"forestgreen", marginLeft:"10px"}} {...props} role="button" tabIndex="0">
      Save
    </Button>
  );
}


export default SaveBtn;