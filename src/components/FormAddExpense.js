import React, { useContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ExpenseContext } from "../context/ExpenseContext";

export default function FormAddExpense(props) {
  const [newExpense, setNewExpense] = useState({
    expenseId: "",
    expenseName: "",
    expenseCost: "",
  });

  const { expenseDetails, setExpenseDetails } = useContext(ExpenseContext);

  const handleNewExpense = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewExpense((prevNewExpense) => {
      return { ...prevNewExpense, [name]: value, expenseId: nanoid() };
    });
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
    <Form className="row align-items-center p-lg-1 p-sm-2">
      <Form.Group controlId="formBasicText" className="col-lg-5 col-sm-12">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="expenseName"
          value={newExpense.expenseName}
          onChange={handleNewExpense}
          required
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="formBasicNumber" className="col-lg-5 col-sm-12">
        <Form.Label>Cost</Form.Label>
        <Form.Control
          type="number"
          name="expenseCost"
          value={newExpense.expenseCost}
          onChange={handleNewExpense}
          required
        ></Form.Control>
      </Form.Group>
      <br />
      <Button
        className="mt-4 m-lg-0 col-lg-2 align-self-end col-sm-12 bg-primary bg-gradient fw-bold"
        onClick={() => addToExpenseList()}
      >
        Save expense
      </Button>
    </Form>
  );
}
