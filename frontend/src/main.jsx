import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '/index.css';

const App = () => {
    const [isDeleteVisible, setIsDeleteVisible] = useState(null); // Track which item has the delete option visible
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for deleting a bill
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isAddBillModalOpen, setIsAddBillModalOpen] = useState(false); // Modal state for adding a new bill
    const [billName, setBillName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [bills, setBills] = useState([]); // Store added bills
    const totalAmount = bills.reduce((acc, bill) => acc + parseFloat(bill.amount || 0), 0).toFixed(2);

    // Load bills from local storage on page load and sort by due date
    useEffect(() => {
        const savedBills = JSON.parse(localStorage.getItem('bills'));
        if (savedBills) {
            // Sort bills by due date (ascending order)
            const sortedBills = savedBills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setBills(sortedBills);
        }
    }, []);

    // Save bills to local storage whenever they are updated
    useEffect(() => {
        if (bills.length > 0) {
            localStorage.setItem('bills', JSON.stringify(bills));
        }
    }, [bills]);

    const toggleDeleteVisibility = (itemName) => {
        if (isDeleteVisible === itemName) {
            setIsDeleteVisible(null); // Hide if clicking the same item
        } else {
            setIsDeleteVisible(itemName); // Show delete for the selected item
        }
    };

    const openDeleteModal = (itemName) => {
        setItemToDelete(itemName);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setItemToDelete(null);
    };

    const handleDelete = () => {
        console.log(`${itemToDelete} has been deleted.`);
        setBills(bills.filter(bill => bill.name !== itemToDelete)); // Remove the deleted bill from the state
        closeDeleteModal();
    };

    // Function to handle the opening of the add bill modal
    const openAddBillModal = () => {
        setIsAddBillModalOpen(true);
    };

    // Function to handle the closing of the add bill modal
    const closeAddBillModal = () => {
        setIsAddBillModalOpen(false);
        setBillName('');
        setDueDate('');
        setAmount('');
    };

    // Function to handle the form submission
    const handleAddBill = (e) => {
        e.preventDefault();
        if (!billName || !dueDate || !amount) {
            alert('Please fill in all fields');
            return;
        }

        // Add new bill to the state
        const newBill = { name: billName, dueDate, amount };
        const updatedBills = [...bills, newBill];

        // Sort the bills by due date after adding a new one
        updatedBills.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        setBills(updatedBills);
        console.log('New Bill Added:', newBill);
        closeAddBillModal();
    };

    return (
      <div>
        <main className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[55vw] sm:w-[30vw]">
                        <p className="text-center text-[4vw] sm:text-[1.2vw] font-bold text-black">
                            Are you sure you want to delete {itemToDelete}?
                        </p>
                        <div className="flex sm:flex-row flex-col justify-center items-center gap-3 mt-4">
                            <button 
                                onClick={handleDelete} 
                                className="bg-[#4D1717] sm:w-[12vw] w-full text-[3.3vw] sm:text-[1vw] text-white sm:h-[2vw] h-[8vw] rounded-full"
                            >
                                Yes, Delete
                            </button>
                            <button 
                                onClick={closeDeleteModal} 
                                className="bg-gray-300 text-gray-700 sm:w-[12vw] w-full text-[3.3vw] sm:text-[1vw] sm:h-[2vw] h-[8vw] rounded-full hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Bill Modal */}
            {isAddBillModalOpen && (
                <div className="flex fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
                    <div className="flex flex-col justify-center items-center bg-white sm:rounded-[0.8vw] rounded-[2.3vw] p-6 w-[70vw] sm:w-[25vw] sm:h-[22vw] h-[80vw]">
                        <h2 className="text-center sm:text-[1.7rem] text-[5vw] font-bold text-black mb-4">Add New Bill</h2>
                        <form onSubmit={handleAddBill} className="flex flex-col gap-4">
                            <input 
                                type="text" 
                                placeholder="Bill Name" 
                                value={billName} 
                                onChange={(e) => setBillName(e.target.value)} 
                                className="p-2 border sm:text-[1vw] text-[3.8vw] text-black border-[#174C38] rounded-[0.5vw] sm:h-[2.3vw] h-[8vw] w-[55vw] sm:w-[21vw] placeholder-[#4D1717] placeholder-opacity-60"
                            />
                            <input 
                                type="date" 
                                value={dueDate} 
                                onChange={(e) => setDueDate(e.target.value)} 
                                className="p-2 border sm:text-[1vw] text-[3.8vw] text-black border-[#174C38] rounded-[0.5vw] sm:h-[2.3vw] h-[8vw] w-[55vw] sm:w-[21vw]"
                            />
                            <input 
                                type="number" 
                                placeholder="Amount" 
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)} 
                                className="p-2 border sm:text-[1vw] text-[3.8vw] text-black border-[#174C38] rounded-[0.5vw] sm:h-[2.3vw] h-[8vw] w-[55vw] sm:w-[21vw] placeholder-[#4D1717] placeholder-opacity-60"
                            />
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
                                <button 
                                    type="submit" 
                                    className="bg-[#174C38] text-white sm:text-[1vw] text-[3.8vw] w-full sm:h-[2.3vw] h-[8.5vw] rounded-full"
                                >
                                    Add Bill
                                </button>
                                <button 
                                    type="button" 
                                    onClick={closeAddBillModal} 
                                    className="bg-gray-300 sm:text-[1vw] text-[3.8vw] text-gray-700 w-full sm:h-[2.3vw] h-[8.5vw] placeholder-[#4D1717] placeholder-opacity-60 rounded-full hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="flex-row justify-center items-center sm:w-[2.7vw] w-[10vw] mt-[-1vw] mb-[-1vw] translate-x-[47vw] rounded-[0.4vw] active:scale-95 sm:block hidden">
                <Image src="/account.svg" alt="Profile" width={52} height={52} layout="responsive" />
            </div>

            <p className="text-[3.5vw] sm:text-[1vw] font-[800] text-[#4D1717] mb-[2.215vw] sm:mb-[0.615vw]">MY TOTAL BILL</p>
            <div className="flex flex-row">
                <p className="text-[2.5vw] sm:text-[0.7vw] text-[#174C38]">PHP</p>
                <h1 className="text-[7vw] sm:text-[2vw] text-[#174C38] font-[800] mb-[14vw] sm:mb-[1.565vw]">{totalAmount}</h1>
            </div>

            <div className="mb-5">
                <p className="text-[3.5vw] sm:text-[1vw] text-[#4D1717] font-[800] mb-[0.629vw]">Bills</p>
                <div className="flex flex-col w-[78vw] sm:w-[46vw] h-[81vw] sm:h-[25vw] rounded-[3.042vw] sm:rounded-[1.042vw] bg-[#174C38] justify-center items-center gap-6">
                    {/* Render bills */}
                    {bills.map((bill, index) => (
                        <div key={index} className="flex flex-row justify-center items-center">
                            <div className="flex flex-col mr-[30vw] sm:mr-[27vw]">
                                <p className="text-white sm:text-[1.4vw] text-[4.7vw] font-bold">{bill.name}</p>
                                <p className="text-white sm:text-[0.8vw] text-[2vw]">DUE DATE: {bill.dueDate}</p>
                            </div>
                            <div className="flex flex-col w-[11.479vw] sm:mr-[0vw] mr-[1.3vw] h-[6.083vw] sm:w-[4.479vw] sm:h-[2.083vw] justify-center items-center rounded-full">
                                <div onClick={() => toggleDeleteVisibility(bill.name)} className="w-[5vw] sm:w-[2vw] ml-[3rem] sm:ml-[2rem] active:rounded-full active:scale-90 active:bg-gray-500 active:opacity-25 hover:rounded-full hover:scale-90 hover:bg-gray-500 hover:opacity-25">
                                    <Image src="/menu.svg" alt="menu" width={5} height={5} layout="responsive" />
                                </div>
                                <p className="text-white sm:w-[9vw] w-[14vw] ml-[2vw] sm:text-[1vw] text-[2.5vw]">PHP {parseFloat(bill.amount).toFixed(2)}</p>

                                {isDeleteVisible === bill.name && (
                                    <div className="flex absolute sm:mt-[2vw] mr-[4vw] mt-[8vw] sm:rounded-[0.3vw] rounded-[1vw] sm:h-[2.2vw] h-[7vw] w-[17vw] sm:w-[5vw] sm:mr-[2vw] bg-slate-100 bg-opacity-90 text-[#4D1717] text-[3vw] sm:text-[1vw] justify-center items-center font-bold">
                                        <button onClick={() => openDeleteModal(bill.name)}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-row sm:ml-[43vw] ml-[70.844vw] sm:mb-[1vw] mb-[3.5rem]">
                <div className="flex w-[4.5vw] sm:w-[1.3vw]">
                    <Image src="/arrow_back1.svg" alt="Back" width={20} height={20} className="active:scale-95" layout="responsive" />
                </div>
                <div className="flex w-[4.5vw] sm:w-[1.3vw]">
                    <Image src="/arrow_forward1.svg" alt="Forward" width={20} height={20} className="active:scale-95" layout="responsive" />
                </div>
            </div>

        <div className='flex flex-row gap-5 sm:gap-10 bg-[#4D1717] w-[57vw] sm:w-[15vw] h-[13vw] sm:h-[3vw] justify-between items-center rounded-full'>
          <div className='flex w-[4.8rem] sm:w-[1.6vw] justify-center items-center'>
            <Link href='/dueminder' className='flex sm:mr-[-4vw] mr-[-7vw] sm:w-[2vw] w-[7vw] h-[7vw] sm:h-[1.5vw] justify-center items-center'>
              <Image src='/home.svg' alt='Due Date' width={20} height={20} layout="responsive" className='active:scale-95'/>
            </Link>
          </div>
          
          <div className='flex bg-[#174C38] w-[19vw] h-[16vw] sm:w-[4.5vw] sm:h-[4.5vw] sm:mr-[0] mr-[8vw] rounded-full justify-center items-center active:scale-95' onClick={openAddBillModal}>
            <div className='flex w-[10vw] sm:w-[2vw] justify-center items-center'>
              <Image src='/add.svg' alt='Add' width={20} height={20} layout="responsive"/>
            </div>
          </div>
          
          <div className='flex w-[8vw] sm:w-[1.8vw] justify-center items-center'>
            <Link href='/settings' className='flex sm:ml-[-4vw] ml-[-14vw] sm:w-[2vw] w-[7vw] h-[7vw] sm:h-[1.5vw] justify-center items-center'>
              <Image src='/settings.svg' alt='Settings' width={20} height={20} layout="responsive" className='active:scale-95'/>
            </Link>
          </div>
        </div>
      </main>
      </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
