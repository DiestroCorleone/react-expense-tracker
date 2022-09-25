import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ExpenseContext } from "./context/ExpenseContext";
import Header from "./components/Header";
import RenderBudgets from "./components/RenderBudgets";
import ExpenseListContainer from "./components/ExpenseListContainer";
import FormAddExpense from "./components/FormAddExpense";
import ModalComponent from "./components/ModalComponent";
import Footer from "./components/Footer";

function App() {
  const [expenseDetails, setExpenseDetails] = useState({
    budget: 0,
    remaining: 0,
    spent: 0,
    expenseList: [],
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function calcExpenseTest() {
      let totalExpenses = expenseDetails.expenseList.reduce(
        (accum, item) => parseInt(accum) + parseInt(item.expenseCost),
        0
      );

      let remainingBudget = expenseDetails.budget - totalExpenses;

      setExpenseDetails((prevExpenseDetails) => {
        return {
          ...prevExpenseDetails,
          spent: totalExpenses,
          remaining: remainingBudget,
        };
      });
    }

    return () => {
      setTimeout(() => calcExpenseTest(), 10);
    };
  }, [expenseDetails]);

  return (
    <Container fluid className="bg-light bg-gradient p-lg-5 p-sm-4">
      <ExpenseContext.Provider value={{ expenseDetails, setExpenseDetails }}>
        <ModalComponent showModal={showModal} setShowModal={setShowModal} />
        <Header />
        <RenderBudgets showModal={showModal} setShowModal={setShowModal} />
        <ExpenseListContainer />
        <FormAddExpense />
      </ExpenseContext.Provider>
      <Footer />
    </Container>
  );
}

export default App;
