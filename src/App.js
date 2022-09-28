import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ExpenseContext } from "./context/ExpenseContext";
import Header from "./components/Header";
import RenderBudgets from "./components/BudgetComponents/RenderBudgets";
import ExpenseListContainer from "./components/ExpenseListComponents/ExpenseListContainer";
import FormAddExpense from "./components/FormAddExpense";
import ModalComponent from "./components/ModalComponent";
import Footer from "./components/Footer";
import PdfCreatorButton from "./components/PdfCreatorComponents/PdfCreatorButton";

function App() {
  const [expenseDetails, setExpenseDetails] = useState(
    JSON.parse(localStorage.getItem("expenseDetails")) || {
      budget: 0,
      remaining: 0,
      spent: 0,
      expenseList: [],
    }
  );
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

    // setTimeout(() => calcExpenseTest(), 10);
    calcExpenseTest();
  }, [expenseDetails.expenseList, expenseDetails.budget]);

  useEffect(() => {
    function updateLocalStorage() {
      localStorage.setItem("expenseDetails", JSON.stringify(expenseDetails));
      console.log("Se actualizó localstorage");
    }

    setTimeout(() => updateLocalStorage(), 10);
  }, [expenseDetails]);

  const clearStorage = () => localStorage.clear();

  return (
    <Container
      fluid
      className="bg-light bg-gradient p-4 full-height d-flex flex-column justify-content-between"
    >
      <ExpenseContext.Provider value={{ expenseDetails, setExpenseDetails }}>
        <ModalComponent showModal={showModal} setShowModal={setShowModal} />
        <Header />
        <RenderBudgets showModal={showModal} setShowModal={setShowModal} />
        <ExpenseListContainer />
        {expenseDetails.expenseList.length > 0 && <PdfCreatorButton />}
        <FormAddExpense />
      </ExpenseContext.Provider>
      <button onClick={() => clearStorage()}>Clear Storage</button>
      <Footer />
    </Container>
  );
}

export default App;
