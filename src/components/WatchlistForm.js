import React, { useState } from "react";
import { Form, Button, Collapse, Container } from "react-bootstrap";

const WatchListForm = (props) => {

  const [state, setState] = useState({name: '', stocks: ''});
  const [visible, setVisible] = useState(false);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value})        
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    alert('A name was submitted: ' + state.name + '\n stocks: ' + state.stocks);
    props.onCreation(state.name, state.stocks);
  }
  
  return (
    <Container>
      {!props.visible && !visible && (
        <Button variant="outline-primary" onClick={() => setVisible(!visible)}>
          Create Watchlist
        </Button>
      )}
      <Collapse in={props.visible || visible}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formWatchlistName">
          <Form.Label>Watchlist name</Form.Label>
          <Form.Control name="name" type="text" value={state.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formWatchlistStocks">
          <Form.Label>Stocks</Form.Label>
          <Form.Control name="stocks" type="text" value={state.stocks} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Watchlist
        </Button>
      </Form>
      </Collapse>
    </Container>
  );
}

export default WatchListForm;