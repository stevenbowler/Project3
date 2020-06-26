//@ts-check
/**@module */
import React, { useState } from 'react';
import { Collapse, Button, CardText } from 'reactstrap';

/**@function Description */
function Description({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Description</Button>
      <Collapse style={{backgroundColor: "white"}} isOpen={isOpen}>
  <CardText>{children}</CardText>
      </Collapse>
    </div>
  );
}

export default Description;

