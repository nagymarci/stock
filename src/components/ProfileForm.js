import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import ExpectationsForm from "./ExpectationsForm";

const ProfileForm = (props) => {

  const [state, setState] = useState(props.profile);

  const handleChange = (event) => {
    setState({...state, [event.target.name]: parseFloat(event.target.value)})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave(state);
  }

  const handleStockChange = (event) => {
    let newExpectations = state.expectations
    newExpectations[event.target.name] = {...newExpectations[event.target.name], stock: event.target.value}
    setState({...state, expectations: newExpectations})
  }

  const handleExpectationChange = (event) => {
    let newExpectations = state.expectations
    newExpectations[event.target.name] = {...newExpectations[event.target.name], expectedRaise: parseFloat(event.target.value)}
    setState({...state, expectations: newExpectations})
  }

  const addNewRow = () => {
    let newExpectations = state.expectations;
    newExpectations.push({stock: "", expectedRaise: 9.0})
    setState({...state, expectations: newExpectations})
  }

  const handleRemove = (index) => {
    let newExpectations = state.expectations;
    newExpectations.splice(index, 1)
    setState({...state, expectations: newExpectations})
  }
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formExpectedReturn">
          <Form.Label>Expected return</Form.Label>
          <Form.Control name="expectedReturn" type="number" step="any" value={state.expectedReturn} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="formDefaultExpectation">
          <Form.Label>Default expected raise</Form.Label>
          <Form.Control name="defaultExpectation" type="number" step="any" value={state.defaultExpectation} onChange={handleChange} />
        </Form.Group>
        <ExpectationsForm 
          expectations={state.expectations} 
          onAddRow={addNewRow} 
          onStockChange={handleStockChange} 
          onExpectationChange={handleExpectationChange}
          onRemove={handleRemove}
          />
        <Container className="mt-3">
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  );
}

export default ProfileForm;