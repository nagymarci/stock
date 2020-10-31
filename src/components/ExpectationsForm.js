import React from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";

class ExpectationsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expectations: props.expectations
    }
  }
  
  render() {
    return (
      <Container>
        <Table borderless className="border-0">
          <thead>
            <tr>
              <th>
                <Form.Label>Stock</Form.Label>
              </th>
              <th>
                <Form.Label>Expected raise</Form.Label>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.expectations.map((expectation, index) => {
              return (<tr key={index}>
                <td>
                  <Form.Control name={index} value={expectation.stock} type="text" onChange={this.props.onStockChange}></Form.Control>
                </td>
                <td>
                  <Form.Control name={index} value={expectation.expectedRaise} type="number" step="any" onChange={this.props.onExpectationChange}></Form.Control>
                </td>
                <td>
                  <Button variant="danger" onClick={() => this.props.onRemove(index)}>Remove</Button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col>
              <Button variant="outline-secondary" onClick={this.props.onAddRow}>
                Add
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

export default ExpectationsForm;