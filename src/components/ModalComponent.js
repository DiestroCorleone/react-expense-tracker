import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ModalComponent(props) {
  const [newBudget, setNewBudget] = useState("");
  const { setExpenseDetails } = useContext(ExpenseContext);

  const handleNewBudget = (event) => {
    const value = event.target.value;
    setNewBudget(value);
  };

  const submitNewBudget = () => {
    if (newBudget !== "") {
      setExpenseDetails((prevExpenseDetails) => {
        return {
          ...prevExpenseDetails,
          budget: newBudget,
        };
      });
      props.setShowModal(false);
      setNewBudget("");
    } else {
      alert("Please enter a new budget");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submitNewBudget();
    }
  };

  return (
    <Modal
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form controlid="controlModalText">
          <Form.Control
            type="text"
            name="newBudget"
            value={newBudget}
            onChange={handleNewBudget}
            handleKeyPress={handleKeyPress}
            required
          ></Form.Control>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={submitNewBudget}>Update Budget</Button>
      </Modal.Footer>
    </Modal>
  );
}
