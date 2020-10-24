import React from 'react';
import Button from 'react-bootstrap/Button';

const Delete = (props) => {

  return (
    <Button variant="danger" onClick={props.onDelete}>
      Delete
    </Button>
  );
}

export default Delete;