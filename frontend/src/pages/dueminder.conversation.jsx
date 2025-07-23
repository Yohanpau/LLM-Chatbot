import React, { useState } from "react";

export default function DueMinderAIUI({ isOpen, onClose, bills }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello, how can I assist you with your bills?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input, bills }), 
      });

      const data = await response.json();
      const aiMessage = { role: "ai", text: data.reply || "⚠️ No reply." };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Failed to fetch response from server." },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-24 left-6 w-[88%] h-[85%] bg-[#111111] border border-[#464646] rounded-xl shadow-xl flex flex-col z-50">
      <div className="flex-1 overflow-y-auto p-3 text-[#e7deda] space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "ai" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`rounded-xl px-3 py-2 max-w-[70%] ${
                msg.role === "ai"
                  ? "bg-[#FE7531] text-[#e7deda]"
                  : "border border-[#FE7531] text-[#FE7531]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center border-[0.063em] m-6 border-[#FE7531] p-2 rounded-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask any questions!"
          className="flex-1 p-2 bg-transparent text-[#e7deda] outline-none text-[0.875rem]"
        />

        <button onClick={handleSend} className="mr-3 text-[#FE7531]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#e7deda"
            className="w-5 h-5 rotate-45 active:rotate-0 transition-transform duration-300 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
