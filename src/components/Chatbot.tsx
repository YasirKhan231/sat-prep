"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Message {
  text: string;
  sender: "user" | "ai";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi there! I'm your StudyPro AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = input.trim();

    if (message) {
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setInput("");
      simulateAIResponse(message);
    }
  };

  const simulateAIResponse = (userMessage: string) => {
    // In a real app, you would call your AI API here
    setTimeout(() => {
      const responses = [
        "I understand you're asking about " +
          userMessage +
          ". Here's what I can tell you...",
        "That's a great question! For " + userMessage + ", I recommend...",
        "I can help with " + userMessage + ". The key points are...",
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: response, sender: "ai" }]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors z-50"
      >
        <i className="fas fa-comment-dots text-2xl" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
      <div className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">StudyPro AI Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto" ref={messagesEndRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 text-${
              message.sender === "user" ? "right" : "left"
            } animate-fadeIn`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 dark:border-gray-700 p-3 flex"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-l-lg px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
