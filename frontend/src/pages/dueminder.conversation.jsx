import React, { useState } from "react";

export default function DueMinderAIUI({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello, there!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response (replace with real backend call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "I'm here to help with your bills!" },
      ]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[300px] h-[420px] bg-[#1a1a1a] border border-[#FE7531] rounded-xl shadow-xl flex flex-col z-50">
      <div className="flex-1 overflow-y-auto p-3 text-white space-y-2">
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
                  ? "bg-[#FE7531] text-white"
                  : "border border-[#FE7531] text-[#FE7531]"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-[#FE7531] p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask any questions!"
          className="flex-1 p-2 bg-transparent text-white outline-none"
        />
        <button onClick={handleSend} className="ml-2 text-[#FE7531]">
          ▶
        </button>
      </div>
    </div>
  );
}
