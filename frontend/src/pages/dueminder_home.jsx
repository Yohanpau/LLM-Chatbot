import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DueMinderAIUI from "./dueminder.conversation";

// Function for bill cards
function BillCard({ bill, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex flex-col justify-between align-middle h-[25%] w-[100%] bg-[#111111] border-[#464646] border-[0.063em] rounded-[1.25em] p-[1.1em]">
      <div className="flex flex-row justify-between">
        <h3 className="text-[1.25rem] font-bold">{bill.name}</h3>
        <div className="relative inline-block text-left">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-full active:bg-[#464646]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="#FE7531"
            >
              <circle cx="5" cy="12" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="19" cy="12" r="2" />
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-[0.2em] mt-[0.1em] w-[4.5em] bg-[#FE7531] rounded shadow-lg z-50">
              <button
                onClick={() => {
                  onEdit(bill);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1 text-left active:bg-gray-100 active:rounded active:text-[#FE7531]"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(bill.id);
                  setShowMenu(false);
                }}
                className="w-full px-3 py-1 text-left text-[#FFF6F2] active:bg-gray-100 active:rounded active:text-[#FE7531]"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <hr />
      <div className="flex flex-row justify-between mt-2">
        <p>Due: {bill.dueDate}</p>
        <h3 className="text-[1.25rem] font-bold">₱{bill.amount}</h3>
      </div>
    </div>
  );
}

// Main component
export default function Home() {

  const [chatbotOpen, setChatbotOpen] = useState(false);

  // Dropdown sorts
  const [open, setOpen] = useState(false);
  const options = ["All", "High", "Medium", "Low"];

  // Bills information
  const [bills, setBills] = useState(() => {
    const stored = localStorage.getItem("bills");
    return stored ? JSON.parse(stored) : [];
  });

  // Delete and edit bill
  const handleEdit = (bill) => {
    alert("Edit: " + bill.name);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this bill?");
    if (confirmDelete) {
      const updatedBills = bills.filter((bill) => bill.id !== id);
      setBills(updatedBills);
      localStorage.setItem("bills", JSON.stringify(updatedBills));
    }
  };

  // State for adding bill modal
  const [showModal, setShowModal] = useState(false);
  const [newBill, setNewBill] = useState({
    name: "",
    amount: "",
    dueDate: "",
    priority: "All",
  });

  // Sets the budget
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const storedBudget = localStorage.getItem("userBudget");
    if (storedBudget) {
      setBudget(JSON.parse(storedBudget));
    }
  }, []);

  // Compute the total amount of bills
  const totalAmount = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  // Compare the total amount of bills and the budget
  const remaining = budget - totalAmount;

  // For priority filter
  const [selectedPriority, setSelectedPriority] = useState("All");

  const [selected, setSelected] = useState("All"); // Dropdown selection

  // Filters bills base on priority
  const filteredBills =
    selected === "All"
      ? bills
      : bills.filter((bill) => bill.priority === selected);

  return (
    <>
      <DueMinderAIUI
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
      />
      {/* Upper icons */}
      <div className="flex flex-row justify-between w-[100%] mt-[2em] mb-[1em]">
        {/* AI icon */}
        <button onClick={() => setChatbotOpen(!chatbotOpen)}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="active:scale-90 transition-transform duration-300 ease-in-out"
          >
            <path
              d="M33 14c3 10 4.5 10 12 12-7.5 2-9 2-12 12-3-10-4.5-10-12-12 7.5-2 9-2 12-12z"
              fill="#FFF6F2"
            />
            <path
              d="M18 36c1.2 4 1.6 3.8 5.2 5.2-3.6 1.4-4 1.4-5.2 5.2-1.2-3.8-1.6-3.8-5.2-5.2 3.6-1.4 4-1.4 5.2-5.2z"
              fill="#FFF6F2"
            />
            <path
              d="M48 8c0.6 4 1.6 3.8 5.2 5.2-3.6 1.4-4 1.4-5.2 5.2-1.2-3.8-1.6-3.8-5.2-5.2 3.6-1.4 4-1.4 5.2-5.2z"
              fill="#FFF6F2"
            />
          </svg>
        </button>

        {/* Settings icon */}
        <Link to="/settings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 30 30"
            fill="#FFF6F2"
            className="active:scale-90 transition-transform duration-300 ease-in-out"
          >
            <path d="M19.14,12.94c0.04,-0.3 0.06,-0.61 0.06,-0.94c0,-0.32 -0.02,-0.64 -0.07,-0.94l2.03,-1.58c0.18,-0.14 0.23,-0.41 0.11,-0.61l-1.92,-3.32c-0.12,-0.21 -0.37,-0.3 -0.59,-0.22l-2.39,0.96c-0.5,-0.38 -1.03,-0.7 -1.62,-0.94l-0.36,-2.54c-0.04,-0.23 -0.23,-0.4 -0.47,-0.4h-3.84c-0.24,0 -0.44,0.17 -0.47,0.4l-0.36,2.54c-0.59,0.24 -1.13,0.56 -1.62,0.94l-2.39,-0.96c-0.22,-0.09 -0.47,0.01 -0.59,0.22l-1.92,3.32c-0.12,0.21 -0.07,0.47 0.11,0.61l2.03,1.58c-0.05,0.3 -0.07,0.62 -0.07,0.94c0,0.33 0.02,0.64 0.06,0.94l-2.03,1.58c-0.18,0.14 -0.23,0.4 -0.11,0.61l1.92,3.32c0.12,0.21 0.37,0.3 0.59,0.22l2.39,-0.96c0.5,0.38 1.03,0.7 1.62,0.94l0.36,2.54c0.03,0.23 0.23,0.4 0.47,0.4h3.84c0.24,0 0.44,-0.17 0.47,-0.4l0.36,-2.54c0.59,-0.24 1.13,-0.56 1.62,-0.94l2.39,0.96c0.22,0.09 0.47,-0.01 0.59,-0.22l1.92,-3.32c0.12,-0.21 0.07,-0.47 -0.11,-0.61l-2.03,-1.58zM12,15.5c-1.93,0 -3.5,-1.57 -3.5,-3.5s1.57,-3.5 3.5,-3.5s3.5,1.57 3.5,3.5s-1.57,3.5 -3.5,3.5z" />
          </svg>
        </Link>
      </div>

      {/* Bill and budget */}
      <div className="text-[#FFF6F2] flex flex-row justify-between font-bold mb-[2.813em]">
        {/* Total amount of bill */}
        <div>
          <h2 className="text-[1.5rem]/[1em]">Total Bill</h2>
          <h1 className="text-[2rem] text-[#FE7531]">₱{totalAmount}</h1>
        </div>
        {/* Amount of budget */}
        <div className="text-right">
          <h4 className="text-[1em]">Budget</h4>
          <h5 className="text-[#FE7531] text-[0.875em]">₱{budget}</h5>
        </div>
      </div>

      {/* Bills section */}
      <div className="text-[#FFF6F2] flex flex-col gap-[0.6em] w-[100%] h-[69vh]">
        {/* Title */}
        <h2 className="text-[1.5em] font-bold">My Bills</h2>
        {/* Search and dropdown */}
        <div className="flex flex-row gap-[0.4em] w-[100%]">
          {/* Search bar */}
          <form action="#" className="relative w-[100%]">
            <input
              type="text"
              placeholder="Search your bill here..."
              name="search"
              id="search"
              className="h-[2.5em] w-[100%] p-[0.775em] rounded-[0.625em] bg-transparent border-[#464646] border-[0.063em] outline-[#FFF6F2]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFF6F2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 absolute right-[8%] top-[26%]"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </form>

          {/* Dropdown */}
          <div className="relative w-[50%]">
            <div className="relative w-32">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="flex w-32 items-center justify-between gap-2 px-4 h-[2.5em] bg-transparent text-[#FFF6F2] border-[#464646] border-[0.063em] rounded-[0.625em] appearance-none outline-none"
              >
                {options.map((option) => (
                  // Dropdown options
                  <option
                    key={option}
                    value={option}
                    className="bg-[#464646] text-[#FFF6F2]"
                  >
                    {option}
                  </option>
                ))}
              </select>

              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bills list */}
        <div className="flex flex-col gap-[0.375em] h-full overflow-auto">
          {/* First Bill */}
          {filteredBills.map((bill) => (
            <BillCard
              key={bill.id}
              bill={bill}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Add bill button */}
        <div className="flex absolute right-0 left-0 bottom-8 justify-center items-center">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-4 bg-[#FE7531] rounded-full active:scale-90 transition-transform duration-300 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 active:scale-90 transition-transform duration-300 ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-[#010101] bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-[#111111] p-6 rounded-xl w-[90%] max-w-md text-white space-y-4">
              <h2 className="text-xl font-bold mb-2">Add New Bill</h2>
              {/* Bill name input */}
              <input
                type="text"
                placeholder="Bill Name"
                className="w-full p-2 rounded bg-transparent border border-[#464646] outline-[#FFF6F2]"
                value={newBill.name}
                onChange={(e) =>
                  setNewBill({ ...newBill, name: e.target.value })
                }
              />

              {/* Bill amount */}
              <input
                type="number"
                placeholder="Amount"
                className="w-full p-2 rounded bg-transparent border border-[#464646] outline-[#FFF6F2]"
                value={newBill.amount}
                onChange={(e) =>
                  setNewBill({ ...newBill, amount: e.target.value })
                }
              />

              <div className="flex flex-row gap-2">
                {/* Bill due date */}
                <input
                  type="date"
                  className="w-full p-2 rounded bg-transparent border border-[#464646] outline-[#FFF6F2]"
                  value={newBill.dueDate}
                  onChange={(e) =>
                    setNewBill({ ...newBill, dueDate: e.target.value })
                  }
                />

                <div className="relative w-[50%]">
                  <div className="relative w-32">
                    <select
                      value={newBill.priority}
                      onChange={(e) => {
                        setNewBill({ ...newBill, priority: e.target.value });
                        setOpen(false);
                      }}
                      onClick={() => setOpen(!open)}
                      className="w-full px-4 h-[2.8em] bg-transparent text-[#FFF6F2] border-[#464646] border-[0.063em] rounded appearance-none outline-none"
                    >
                      {options.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="bg-[#464646] text-[#FFF6F2]"
                        >
                          {option}
                        </option>
                      ))}
                    </select>

                    {/* Custom arrow icon */}
                    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 transition-transform duration-200 ${
                          open ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    const billWithId = {
                      ...newBill,
                      id: Date.now(), // Add this line to generate a unique ID
                    };
                    const updatedBills = [...bills, billWithId];
                    setBills(updatedBills);
                    localStorage.setItem("bills", JSON.stringify(updatedBills));

                    // Reset modal and input
                    setShowModal(false);
                    setNewBill({
                      name: "",
                      amount: "",
                      dueDate: "",
                      priority: "Medium",
                    });
                  }}
                  className="px-[3.35rem] py-2 bg-[#FE7531] active:opacity-80 rounded-full"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-[3.35rem] py-2 bg-transparent active:bg-gray-700 border-[#464646] border-[0.063em] rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
