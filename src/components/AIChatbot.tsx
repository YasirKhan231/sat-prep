"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
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

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function AIChatbot({ isOpen, onClose, userId }: AIChatbotProps) {
  const [mounted, setMounted] = useState(false);
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

  useEffect(() => {
    setMounted(true);
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
            const errorData = await response.json().catch(() => ({}));
            let errorMessage =
              "An error occurred while processing your request.";

            if (response.status === 401) {
              errorMessage =
                "Authentication error. Please try logging in again.";
            } else if (response.status === 403) {
              errorMessage =
                "You don't have permission to perform this action.";
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
          console.error("Error calling chat API with image:", error);

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
        console.error("Error processing image:", error);

        const errorMessage: ChatMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Sorry, I couldn't process that image. Please try a different image or format.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVoiceInput = () => {
    // In a real implementation, this would access the user's microphone
    // For now, we'll just simulate by changing the input
    setInputValue("(Voice recording in progress...)");

    // Simulate voice recognition after 2 seconds
    setTimeout(() => {
      setInputValue(
        "Can you help me with this SAT reading comprehension question?"
      );
    }, 2000);
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
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
        activeMode === mode
          ? "bg-purple-600 text-white"
          : "bg-[#252538] text-gray-300 hover:bg-[#32324a]"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  if (!mounted) return null;

  // Use createPortal to render at the root level of the document
  return createPortal(
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          ></div>

          {/* Modal */}
          <div
            className="relative bg-[#1e1e2f] rounded-xl border border-purple-500/30 shadow-[0_0_35px_rgba(149,76,233,0.25)] max-w-2xl w-full h-[80vh] flex flex-col animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-900/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-400" />
                <h2 className="font-semibold text-white">AI Study Assistant</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full bg-[#252538] text-gray-400 hover:text-white hover:bg-[#32324a] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mode selector */}
            <div className="p-2 border-b border-purple-900/30 grid grid-cols-4 gap-2">
              {renderModeButton(
                "general",
                <MessageSquare className="h-5 w-5" />,
                "Ask Anything"
              )}
              {renderModeButton(
                "math",
                <Calculator className="h-5 w-5" />,
                "Math Solver"
              )}
              {renderModeButton(
                "essay",
                <FileText className="h-5 w-5" />,
                "Essay Review"
              )}
              {renderModeButton(
                "image",
                <Image className="h-5 w-5" />,
                "Upload Image"
              )}
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-[#252538] text-gray-200"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.role === "user"
                          ? "text-purple-200"
                          : "text-gray-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-[#252538] text-gray-200">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p>Thinking...</p>
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
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    activeMode === "general"
                      ? "Ask any SAT/ACT question..."
                      : activeMode === "math"
                      ? "Describe your math problem..."
                      : activeMode === "essay"
                      ? "Paste your essay for review..."
                      : "Describe what's in the image..."
                  }
                  className="w-full rounded-lg bg-[#252538] border border-purple-900/30 p-3 pr-24 text-white resize-none h-20 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-2">
                  <button
                    onClick={handleVoiceInput}
                    className="p-2 rounded-full bg-[#32324a] text-gray-300 hover:text-white hover:bg-purple-600 transition-colors"
                    title="Use voice input"
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleFileUpload}
                    className="p-2 rounded-full bg-[#32324a] text-gray-300 hover:text-white hover:bg-purple-600 transition-colors"
                    title="Upload an image"
                  >
                    <Image className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className={`p-2 rounded-full ${
                      !inputValue.trim() || isLoading
                        ? "bg-[#32324a] text-gray-500"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    } transition-colors`}
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <p className="text-xs text-gray-400 mt-2 text-center">
                {activeMode === "general"
                  ? "Ask any SAT/ACT related questions"
                  : activeMode === "math"
                  ? "Get step-by-step solutions to math problems"
                  : activeMode === "essay"
                  ? "Receive feedback on essay structure, grammar, and content"
                  : "Upload a photo of your written work for analysis"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
