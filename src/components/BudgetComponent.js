export default function BudgetComponent(props) {
  return (
    <div
      className={`border rounded-pill col p-4 m-1 text-white text-center fw-bold ${
        props.budgetType === "Budget"
          ? "bg-success bg-gradient"
          : props.budgetType === "Remaining"
          ? "bg-warning bg-gradient"
          : props.budgetType === "Spent" && "bg-danger bg-gradient"
      }`}
      onClick={
        props.setShowModal
          ? () => props.setShowModal((prevShowModal) => !prevShowModal)
          : undefined
      }
    >
      {props.budgetType || "Budget Type: "} ${props.amount}{" "}
      {props.setShowModal && <i className="fa fa-fw fa-pencil"></i>}
    </div>
  );
}
