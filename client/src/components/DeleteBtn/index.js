//@ts-check
/**@module 
 * @requires react
*/
import React from "react";
import "./style.css";
import { Button } from 'reactstrap';

/**
 * The ...props means, spread all of the passed props onto this element 
 * That way we don't have to define them all individually
 * @function DeleteBtn
 */
function DeleteBtn(props) {
  return (
    <Button className="delete-btn" {...props} role="button" tabIndex="0">
      Delete
    </Button>
  );
}

export default DeleteBtn;
