import React, { useContext } from "react";
import Table from "react-bootstrap/Table";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ExpenseList(props) {
  const { expenseDetails, setExpenseDetails } = useContext(ExpenseContext);

  const deleteFromExpenses = (expenseIdToDelete) => {
    const filteredExpenses = expenseDetails.expenseList.filter(
      (expense) => expense.expenseId !== expenseIdToDelete
    );

    setExpenseDetails((prevExpenseDetails) => {
      return { ...prevExpenseDetails, expenseList: [...filteredExpenses] };
    });
  };

  const renderExpenseList = expenseDetails.expenseList
    .filter((searchedTerm) =>
      searchedTerm.expenseName
        .toLowerCase()
        .includes(props.expenseFilterValue.toLowerCase())
    )
    .map((expense) => {
      return (
        <tr key={expense.expenseId}>
          <td className="col-5">{expense.expenseName}</td>
          <td className="col-5">$ {expense.expenseCost}</td>
          <td className="col-2 text-center cursor-pointer">
            <i
              className="fa fa-fw fa-trash"
              onClick={() => deleteFromExpenses(expense.expenseId)}
            ></i>
          </td>
        </tr>
      );
    });

  return (
    <Table striped bordered hover>
      <tbody>{renderExpenseList}</tbody>
    </Table>
  );
}
