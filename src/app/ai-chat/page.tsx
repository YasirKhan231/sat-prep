"use client";

import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Send,
  Mic,
  Image,
  Calculator,
  FileText,
  PenTool,
  MessageSquare,
  Loader2,
  XCircle,
} from "lucide-react";
import { fileToBase64, compressImage } from "@/lib/utils/imageUpload";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<
    "general" | "math" | "essay" | "image"
  >("general");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi there! I'm your SAT/ACT AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);

    // Initialize audio element
    if (typeof Audio !== "undefined") {
      notificationSound.current = new Audio("/sounds/level-up.mp3");
      if (notificationSound.current) {
        notificationSound.current.volume = 0.5; // Lower volume for notification
      }
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Format messages for the API (excluding timestamps and IDs)
      const apiMessages = messages
        .concat(userMessage)
        .map(({ role, content }) => ({ role, content }));

      // Call our API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: apiMessages,
          mode: activeMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = "An error occurred while processing your request.";

        if (response.status === 401) {
          errorMessage = "Authentication error. Please try logging in again.";
        } else if (response.status === 403) {
          errorMessage = "You don't have permission to perform this action.";
        } else if (response.status === 429) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (response.status >= 500) {
          errorMessage =
            "Our servers are experiencing issues. Please try again later.";
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Create assistant message from response
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Play notification sound when response is received
      try {
        notificationSound.current?.play().catch((e) => {
          console.log("Error playing notification sound:", e);
        });
      } catch (error) {
        console.error("Could not play notification sound", error);
      }
    } catch (error) {
      console.error("Error calling chat API:", error);

      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);

        // Compress the image before sending
        const compressedFile = await compressImage(file);

        // Convert to base64
        const base64Data = await fileToBase64(compressedFile);

        // Handle image upload
        setActiveMode("image");

        // Add user message with image description
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          role: "user",
          content: `[Uploaded image: ${file.name}] Please analyze this image and provide feedback.`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        // Clear input field
        setInputValue("");

        // Call API with image
        try {
          // Format messages for the API (excluding timestamps and IDs)
          const apiMessages = messages
            .concat(userMessage)
            .map(({ role, content }) => ({ role, content }));

          // Call our API endpoint with the image data
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: apiMessages,
              mode: "image",
              imageBase64: base64Data,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to process image");
          }

          const data = await response.json();

          // Create assistant message from response
          const assistantMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "assistant",
            content: data.response,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, assistantMessage]);

          // Play notification sound when response is received
          try {
            notificationSound.current?.play().catch((e) => {
              console.log("Error playing notification sound:", e);
            });
          } catch (error) {
            console.error("Could not play notification sound", error);
          }
        } catch (error) {
          console.error("Error calling image chat API:", error);

          // Add error message
          const errorMessage: ChatMessage = {
            id: Date.now().toString(),
            role: "assistant",
            content:
              "Sorry, I encountered an error processing your image. Please try again later.",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, errorMessage]);
        }
      } catch (error) {
        console.error("Error handling file upload:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVoiceInput = () => {
    // Implementation for voice input would go here
    alert("Voice input feature coming soon!");
  };

  const handleModeChange = (mode: "general" | "math" | "essay" | "image") => {
    setActiveMode(mode);
  };

  const renderModeButton = (
    mode: "general" | "math" | "essay" | "image",
    icon: React.ReactNode,
    label: string
  ) => (
    <button
      onClick={() => handleModeChange(mode)}
      className={`p-2 rounded-md flex items-center gap-2 ${
        activeMode === mode
          ? "bg-purple-600 text-white"
          : "text-gray-400 hover:bg-[#252538] hover:text-gray-200"
      }`}
      title={label}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format message content with markdown-like syntax for code blocks
  const formatMessageContent = (content: string) => {
    // Split the content by code block markers
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        // Extract the code and language
        const code = part.slice(3, -3).trim();
        const firstLineBreak = code.indexOf("\n");
        const language =
          firstLineBreak > 0 ? code.slice(0, firstLineBreak).trim() : "";
        const codeContent =
          firstLineBreak > 0 ? code.slice(firstLineBreak + 1) : code;

        return (
          <div
            key={index}
            className="bg-gray-800 rounded-md my-2 overflow-x-auto"
          >
            {language && (
              <div className="px-4 py-1 border-b border-gray-700 text-gray-400 text-xs">
                {language}
              </div>
            )}
            <pre className="p-4 text-sm">
              <code>{codeContent}</code>
            </pre>
          </div>
        );
      } else {
        // For normal text, convert new lines to <br>
        return (
          <p key={index} className="whitespace-pre-wrap">
            {part}
          </p>
        );
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AI Study Assistant
          </h1>
          <p className="text-gray-400 mt-2">
            Chat with your AI study assistant to get help with SAT/ACT topics,
            explore concepts, and analyze practice questions
          </p>
        </div>

        <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 shadow-lg flex flex-col h-[70vh]">
          {/* Chat mode selector */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-purple-900/30">
            <div className="flex space-x-2">
              {renderModeButton(
                "general",
                <MessageSquare className="h-5 w-5" />,
                "General Help"
              )}
              {renderModeButton(
                "math",
                <Calculator className="h-5 w-5" />,
                "Math Solver"
              )}
              {renderModeButton(
                "essay",
                <FileText className="h-5 w-5" />,
                "Essay Feedback"
              )}
              {renderModeButton(
                "image",
                <Image className="h-5 w-5" />,
                "Image Analysis"
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-purple-400">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              Online
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-3/4 p-3 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-[#252538] text-white"
                      : "bg-purple-600 text-white"
                  }`}
                >
                  <div className="mb-1 text-xs opacity-70 flex justify-between">
                    <span>
                      {message.role === "assistant" ? "AI Assistant" : "You"}
                    </span>
                    <span>{formatDate(message.timestamp)}</span>
                  </div>
                  <div className="chat-message-content">
                    {formatMessageContent(message.content)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-3/4 p-3 rounded-lg bg-[#252538] text-white">
                  <div className="mb-1 text-xs opacity-70">AI Assistant</div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-purple-900/30">
            <div className="relative">
              <textarea
                className="w-full p-3 pr-24 bg-[#252538] border border-purple-900/30 rounded-lg text-white resize-none focus:outline-none focus:ring-1 focus:ring-purple-500"
                placeholder="Type your message..."
                rows={2}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="absolute right-2 bottom-2 flex space-x-1">
                <button
                  onClick={handleVoiceInput}
                  className="p-2 rounded-md text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                  title="Voice input"
                >
                  <Mic className="h-5 w-5" />
                </button>
                <button
                  onClick={handleFileUpload}
                  className="p-2 rounded-md text-gray-400 hover:bg-purple-600/20 hover:text-purple-400 transition-colors"
                  title="Upload image"
                >
                  <Image className="h-5 w-5" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-2 rounded-md ${
                    !inputValue.trim() || isLoading
                      ? "bg-purple-600/50 text-purple-300/50 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  } transition-colors`}
                  title="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-2">
              {activeMode === "general" && "Ask any SAT/ACT study question"}
              {activeMode === "math" && "Upload a math problem to solve"}
              {activeMode === "essay" && "Upload an essay for feedback"}
              {activeMode === "image" && "Upload an image to analyze"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
