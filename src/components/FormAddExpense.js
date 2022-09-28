import React, { useContext, useState } from "react";
import { nanoid } from "nanoid";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ExpenseContext } from "../context/ExpenseContext";

export default function FormAddExpense(props) {
  const [newExpense, setNewExpense] = useState({
    expenseId: "",
    expenseName: "",
    expenseCost: "",
  });

  const { setExpenseDetails } = useContext(ExpenseContext);

  const handleNewExpense = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewExpense((prevNewExpense) => {
      return { ...prevNewExpense, [name]: value, expenseId: nanoid() };
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addToExpenseList();
    }
  };

  function addToExpenseList() {
    if (newExpense.expenseName && newExpense.expenseCost) {
      setExpenseDetails((prevExpenseDetails) => {
        return {
          ...prevExpenseDetails,
          expenseList: [...prevExpenseDetails.expenseList, newExpense],
        };
      });

      setNewExpense({ expenseName: "", expenseCost: "" });
    } else {
      alert("Please fill in all the fields");
    }
  }

  return (
    <Form className="p-4 col-12">
      <Row>
        <Col lg="6" sm="12">
          <Form.Group controlId="formBasicText">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="expenseName"
              value={newExpense.expenseName}
              onChange={handleNewExpense}
              onKeyPress={handleKeyPress}
              required
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col lg="3" sm="12">
          <Form.Group controlId="formBasicNumber">
            <Form.Label>Cost (USD $) *</Form.Label>
            <Form.Control
              type="number"
              name="expenseCost"
              value={newExpense.expenseCost}
              onChange={handleNewExpense}
              onKeyPress={handleKeyPress}
              required
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col
          lg="3"
          sm="12"
          className="d-flex flex-column justify-content-between"
        >
          <br />
          <Button
            className="bg-primary bg-gradient fw-bold"
            onClick={() => addToExpenseList()}
          >
            Save expense
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
