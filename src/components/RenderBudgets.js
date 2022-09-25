import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import BudgetComponent from "./BudgetComponent";

export default function RenderBudgets(props) {
  const { expenseDetails } = useContext(ExpenseContext);

  return (
    <div className="d-flex justify-content-around p-3">
      <BudgetComponent
        budgetType="Budget"
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        amount={expenseDetails.budget}
      />
      <BudgetComponent
        budgetType="Remaining"
        amount={expenseDetails.remaining}
      />
      <BudgetComponent budgetType="Spent" amount={expenseDetails.spent} />
    </div>
  );
}
