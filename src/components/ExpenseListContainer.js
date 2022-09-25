import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ExpenseList from "./ExpenseList";

export default function ExpenseListContainer() {
  const [expenseFilterValue, setExpenseFilterValue] = useState("");

  const handleExpenseFilter = (event) => {
    const value = event.target.value;
    setExpenseFilterValue((prevExpenseFilterValue) => {
      return value;
    });
    console.log(value);
  };

  return (
    <Container fluid>
      <h3>History</h3>
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Type to search..."
            name="searchExpenseFilter"
            onChange={handleExpenseFilter}
            value={expenseFilterValue}
          ></Form.Control>
        </Form.Group>
      </Form>
      <br />
      <ExpenseList expenseFilterValue={expenseFilterValue} />
    </Container>
  );
}
