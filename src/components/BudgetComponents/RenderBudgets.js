import React, { useContext } from 'react';
import { ExpenseContext } from '../../context/ExpenseContext';
import Col from 'react-bootstrap/Col';
import BudgetComponent from './BudgetComponent';

export default function RenderBudgets(props) {
  const { expenseDetails } = useContext(ExpenseContext);

  return (
    <div className="d-flex justify-content-center p-3">
      <Col sm="3">
        <BudgetComponent
          budgetType="Budget"
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          amount={expenseDetails.budget}
        />
      </Col>
      <Col sm="3">
        <BudgetComponent
          budgetType="Remaining"
          amount={expenseDetails.remaining}
        />
      </Col>
      <Col sm="3">
        <BudgetComponent budgetType="Spent" amount={expenseDetails.spent} />
      </Col>
    </div>
  );
}
