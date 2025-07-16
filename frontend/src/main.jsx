import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import botImg from "/bot.svg";
import userImg from "/user.svg";
import "/index.css";

const App = () => {
    const [chat, setChat] = useState([
        {
        system: {
            content:
            "I'm a sovereign AI agent living on the Internet Computer. Ask me anything.",
        },
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatBoxRef = useRef(null);

    const formatDate = (date) => {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();
        return `${h.slice(-2)}:${m.slice(-2)}`;
    };

    /*const askAgent = async (messages) => {
        try {
        const response = await backend.chat(messages);
        setChat((prevChat) => {
            const newChat = [...prevChat];
            newChat.pop();
            newChat.push({ system: { content: response } });
            return newChat;
        });
        } catch (e) {
        console.log(e);
        const eStr = String(e);
        const match = eStr.match(/(SysTransient|CanisterReject), \\+"([^\\"]+)/);
        if (match) {
            alert(match[2]);
        }
        setChat((prevChat) => {
            const newChat = [...prevChat];
            newChat.pop();
            return newChat;
        });
        } finally {
        setIsLoading(false);
        }
    };*/

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage = {
        user: { content: inputValue },
        };
        const thinkingMessage = {
        system: { content: "Thinking ..." },
        };
        setChat((prevChat) => [...prevChat, userMessage, thinkingMessage]);
        setInputValue("");
        setIsLoading(true);

        const messagesToSend = chat.slice(1).concat(userMessage);
        askAgent(messagesToSend);
    };

    useEffect(() => {
        if (chatBoxRef.current) {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chat]);

    return (
      <>
        <main className="min-h-screen bg-[#F2F2F2] flex flex-col items-center justify-center">
          {/* Modal
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[55vw] sm:w-[30vw]">
              <p className="text-center text-[4vw] sm:text-[1.2vw] font-bold text-black">
                Are you sure you want to delete?
              </p>
              <div className="flex sm:flex-row flex-col justify-center items-center gap-3 mt-4">
                <button className="bg-[#4D1717] sm:w-[12vw] w-full text-[3.3vw] sm:text-[1vw] text-white sm:h-[2vw] h-[8vw] rounded-full">
                  Yes, Delete
                </button>
                <button className="bg-gray-300 text-gray-700 sm:w-[12vw] w-full text-[3.3vw] sm:text-[1vw] sm:h-[2vw] h-[8vw] rounded-full hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div> */}

          {/* Add Bill Modal
          <div className="flex fixed inset-0 bg-black bg-opacity-50 justify-center items-center z-50">
            <div className="flex flex-col justify-center items-center bg-white sm:rounded-[0.8vw] rounded-[2.3vw] p-6 w-[70vw] sm:w-[25vw] sm:h-[22vw] h-[80vw]">
              <h2 className="text-center sm:text-[1.7rem] text-[5vw] font-bold text-black mb-4">
                Add New Bill
              </h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Bill Name"
                  className="p-2 border sm:text-[1vw] text-[3.8vw] text-black border-[#174C38] rounded-[0.5vw] sm:h-[2.3vw] h-[8vw] w-[55vw] sm:w-[21vw] placeholder-[#4D1717] placeholder-opacity-60"
                />
                <input
                  type="date"
                  className="p-2 border sm:text-[1vw] text-[3.8vw] text-black border-[#174C38] rounded-[0.5vw] sm:h-[2.3vw] h-[8vw] w-[55vw] sm:w-[21vw]"
                />
                <input
                  type="number"
                  placeholder="Amount"
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
                    className="bg-gray-300 sm:text-[1vw] text-[3.8vw] text-gray-700 w-full sm:h-[2.3vw] h-[8.5vw] placeholder-[#4D1717] placeholder-opacity-60 rounded-full hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div> */}

          {/* Main Content */}
          <div className="flex-row justify-center items-center sm:w-[2.7vw] w-[10vw] mt-[-1vw] mb-[-1vw] translate-x-[47vw] rounded-[0.4vw] active:scale-95 sm:block hidden">
            <img
              src="/account.svg"
              alt="Profile"
              width={52}
              height={52}
              layout="responsive"
            />
          </div>

          <p className="text-[3.5vw] sm:text-[1vw] font-[800] text-[#4D1717] mb-[2.215vw] sm:mb-[0.615vw]">
            MY TOTAL BILL
          </p>
          <div className="flex flex-row">
            <p className="text-[2.5vw] sm:text-[0.7vw] text-[#174C38]">PHP</p>
            <h1 className="text-[7vw] sm:text-[2vw] text-[#174C38] font-[800] mb-[14vw] sm:mb-[1.565vw]"></h1>
          </div>

          <div className="mb-5">
            <p className="text-[3.5vw] sm:text-[1vw] text-[#4D1717] font-[800] mb-[0.629vw]">
              Bills
            </p>
            <div className="flex flex-col w-[78vw] sm:w-[46vw] h-[81vw] sm:h-[25vw] rounded-[3.042vw] sm:rounded-[1.042vw] bg-[#174C38] justify-center items-center gap-6">
              {/* Render bills */}
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-col mr-[30vw] sm:mr-[27vw]">
                  <p className="text-white sm:text-[1.4vw] text-[4.7vw] font-bold"></p>
                  <p className="text-white sm:text-[0.8vw] text-[2vw]">
                    DUE DATE: =
                  </p>
                </div>
                <div className="flex flex-col w-[11.479vw] sm:mr-[0vw] mr-[1.3vw] h-[6.083vw] sm:w-[4.479vw] sm:h-[2.083vw] justify-center items-center rounded-full">
                  <div className="w-[5vw] sm:w-[2vw] ml-[3rem] sm:ml-[2rem] active:rounded-full active:scale-90 active:bg-gray-500 active:opacity-25 hover:rounded-full hover:scale-90 hover:bg-gray-500 hover:opacity-25">
                    <img
                      src="/menu.svg"
                      alt="menu"
                      width={5}
                      height={5}
                      layout="responsive"
                    />
                  </div>
                  <p className="text-white sm:w-[9vw] w-[14vw] ml-[2vw] sm:text-[1vw] text-[2.5vw]">
                    PHP
                  </p>

                  <div className="flex absolute sm:mt-[2vw] mr-[4vw] mt-[8vw] sm:rounded-[0.3vw] rounded-[1vw] sm:h-[2.2vw] h-[7vw] w-[17vw] sm:w-[5vw] sm:mr-[2vw] bg-slate-100 bg-opacity-90 text-[#4D1717] text-[3vw] sm:text-[1vw] justify-center items-center font-bold">
                    <a href="src/pages/SignUp.jsx" >Delete</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:ml-[43vw] ml-[70.844vw] sm:mb-[1vw] mb-[3.5rem]">
            <div className="flex w-[4.5vw] sm:w-[1.3vw]">
              <img
                src="/arrow_back1.svg"
                alt="Back"
                width={20}
                height={20}
                className="active:scale-95"
                layout="responsive"
              />
            </div>
            <div className="flex w-[4.5vw] sm:w-[1.3vw]">
              <img
                src="/arrow_forward1.svg"
                alt="Forward"
                width={20}
                height={20}
                className="active:scale-95"
                layout="responsive"
              />
            </div>
          </div>

          <div className="flex flex-row gap-5 sm:gap-10 bg-[#4D1717] w-[57vw] sm:w-[15vw] h-[13vw] sm:h-[3vw] justify-between items-center rounded-full">
            <div className="flex w-[4.8rem] sm:w-[1.6vw] justify-center items-center">
              <a
                href="/dueminder"
                className="flex sm:mr-[-4vw] mr-[-7vw] sm:w-[2vw] w-[7vw] h-[7vw] sm:h-[1.5vw] justify-center items-center"
              >
                <img
                  src="/home.svg"
                  alt="Due Date"
                  width={20}
                  height={20}
                  layout="responsive"
                  className="active:scale-95"
                />
              </a>
            </div>

            <div
              className="flex bg-[#174C38] w-[19vw] h-[16vw] sm:w-[4.5vw] sm:h-[4.5vw] sm:mr-[0] mr-[8vw] rounded-full justify-center items-center active:scale-95"
            >
              <div className="flex w-[10vw] sm:w-[2vw] justify-center items-center">
                <img
                  src="/add.svg"
                  alt="Add"
                  width={20}
                  height={20}
                  layout="responsive"
                />
              </div>
            </div>

            <div className="flex w-[8vw] sm:w-[1.8vw] justify-center items-center">
              <a
                href="/settings"
                className="flex sm:ml-[-4vw] ml-[-14vw] sm:w-[2vw] w-[7vw] h-[7vw] sm:h-[1.5vw] justify-center items-center"
              >
                <img
                  src="/settings.svg"
                  alt="Settings"
                  width={20}
                  height={20}
                  layout="responsive"
                  className="active:scale-95"
                />
              </a>
            </div>
          </div>
        </main>
      </>
    );
};

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
