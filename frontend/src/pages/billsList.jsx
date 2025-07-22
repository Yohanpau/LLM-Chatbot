import React, { useState } from "react";
import BillCard from "./BillCard"; // import the child component

export default function BillsList() {
  const [bills, setBills] = useState([
    {
      id: 1,
      name: "Electricity",
      dueDate: "02/12/25",
      amount: 100,
    },
    {
      id: 2,
      name: "Internet",
      dueDate: "02/15/25",
      amount: 150,
    },
  ]);

  const handleEdit = (bill) => {
    // You can open a modal here or redirect to an edit form
    alert(`Editing ${bill.name}`);
    // Or set a selectedBill state to populate a form
  };

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this bill?"
    );
    if (confirm) {
      setBills((prev) => prev.filter((bill) => bill.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {bills.map((bill) => (
        <BillCard
          key={bill.id}
          bill={bill}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
