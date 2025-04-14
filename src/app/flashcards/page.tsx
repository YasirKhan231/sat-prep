"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import OpenAI from "openai";
import { jsonrepair } from "jsonrepair";
import {
  Sun,
  Moon,
  Plus,
  Bot,
  ArrowLeft,
  ArrowRight,
  Frown,
  Meh,
  Smile,
  Sparkles,
  Loader,
  X,
  Home,
} from "lucide-react";

interface Flashcard {
  id?: string;
  front: string;
  back: string;
  category: string;
  created: string;
  lastReviewed: string | null;
  nextReview: string;
  srsLevel: number;
  userId?: string;
  difficulty?: string;
  tags?: string[];
}

export default function FlashcardsPage() {
  const router = useRouter();
  const auth = getAuth();

  // State management
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Form state
  const [frontContent, setFrontContent] = useState("");
  const [backContent, setBackContent] = useState("");
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [numCards, setNumCards] = useState("10");
  const [difficulty, setDifficulty] = useState("medium");

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Check auth state on component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadUserFlashcards(user.uid);
      } else {
        router.push("/signin");
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

  // Load user's flashcards from localStorage
  const loadUserFlashcards = (uid: string) => {
    const savedCards = localStorage.getItem(`studypro_flashcards_${uid}`);
    if (savedCards) {
      try {
        const parsedCards = JSON.parse(savedCards);
        if (Array.isArray(parsedCards)) {
          setFlashcards(parsedCards);
        }
      } catch (e) {
        console.error("Failed to parse saved flashcards", e);
      }
    }
  };

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(
        `studypro_flashcards_${userId}`,
        JSON.stringify(flashcards)
      );
    }
  }, [flashcards, userId]);

  // Reset current card index when flashcards change
  useEffect(() => {
    if (flashcards.length === 0) {
      setCurrentCardIndex(0);
    } else if (currentCardIndex >= flashcards.length) {
      setCurrentCardIndex(Math.max(0, flashcards.length - 1));
    }
  }, [flashcards, currentCardIndex]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
  };

  // Flashcard navigation
  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  // Flip card
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // SRS difficulty rating
  const rateCardDifficulty = (difficulty: string) => {
    if (flashcards.length === 0 || currentCardIndex >= flashcards.length)
      return;

    const updatedCards = [...flashcards];
    const card = updatedCards[currentCardIndex];
    const now = new Date();

    // Update SRS level based on difficulty
    if (difficulty === "easy") {
      card.srsLevel = Math.min(5, card.srsLevel + 1);
    } else if (difficulty === "medium") {
      card.srsLevel = card.srsLevel === 0 ? 1 : card.srsLevel;
    } else if (difficulty === "hard") {
      card.srsLevel = Math.max(0, card.srsLevel - 1);
    }

    // Calculate next review date based on SRS level
    const nextReviewDays = [0, 1, 3, 7, 14, 30][card.srsLevel];
    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + nextReviewDays);

    // Update card metadata
    card.lastReviewed = now.toISOString();
    card.nextReview = nextReview.toISOString();

    setFlashcards(updatedCards);

    // Move to next card if available
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  // Add new flashcard
  const handleAddFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be signed in to add flashcards");
      return;
    }

    const cardId = `${userId}_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const now = new Date().toISOString();

    const newCard: Flashcard = {
      id: cardId,
      front: frontContent,
      back: backContent,
      category: category,
      created: now,
      lastReviewed: null,
      nextReview: now,
      srsLevel: 0,
      userId: userId,
      tags: [category.toLowerCase().replace(/\s+/g, "-")],
    };

    try {
      // Save to Firestore
      await setDoc(doc(db, "users", userId, "flashcards", cardId), newCard);

      // Update local state
      setFlashcards([...flashcards, newCard]);
      setFrontContent("");
      setBackContent("");
      setCategory("");
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving flashcard:", error);
      alert("Failed to save flashcard");
    }
  };

  // Generate flashcards with AI (now fully client-side)
  const handleGenerateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      alert("You must be signed in to generate flashcards");
      return;
    }

    setIsGenerating(true);

    try {
      const prompt = `Generate ${numCards} high-quality study flashcards on the topic "${topic}" at ${difficulty} difficulty level. 
Format each card as a JSON object with "front" (question) and "back" (detailed answer/solution) properties.
Return as a JSON array of objects. Provide challenging questions that test actual understanding.
Include detailed explanations and steps in the answers. For math questions, include the complete solution process.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert tutor specializing in creating high-quality educational flashcards.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      });

      const content = completion.choices[0].message.content;
      if (!content) {
        throw new Error("No content generated from OpenAI");
      }

      // Parse the generated cards
      let generatedCards;
      try {
        const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) ||
          content.match(/```\n([\s\S]*?)\n```/) || [null, content];
        const jsonContent = jsonMatch[1];
        generatedCards = JSON.parse(jsonrepair(jsonContent));
      } catch (parseError) {
        console.error("Error parsing generated cards:", parseError);
        throw new Error("Failed to parse the generated flashcards");
      }

      // Add metadata and store in Firestore
      const now = new Date().toISOString();
      const deckId = `${userId}_${Date.now()}`;
      const cardIds: string[] = [];

      // Process each generated card
      for (const card of generatedCards) {
        const cardId = `${userId}_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        const cardData = {
          ...card,
          id: cardId,
          userId,
          category: topic,
          difficulty,
          created: now,
          lastReviewed: null,
          nextReview: now,
          srsLevel: 0,
          tags: [topic.toLowerCase().replace(/\s+/g, "-")],
        };

        await setDoc(doc(db, "users", userId, "flashcards", cardId), cardData);
        cardIds.push(cardId);

        // Update local state
        setFlashcards((prev) => [...prev, cardData]);
      }

      // Create a deck document in user's subcollection
      const deckData = {
        id: deckId,
        title: `${topic} Study Deck`,
        description: `Flashcards for ${topic} at ${difficulty} level`,
        created: now,
        lastUpdated: now,
        cardIds,
        cardCount: generatedCards.length,
        isPublic: false,
        tags: [topic.toLowerCase().replace(/\s+/g, "-")],
      };

      await setDoc(doc(db, "users", userId, "decks", deckId), deckData);

      setTopic("");
      setShowGenerateModal(false);
    } catch (error: any) {
      console.error("Generation error:", error);
      alert(error.message || "Error generating flashcards");
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate progress percentage
  const progressPercent =
    flashcards.length > 0
      ? ((currentCardIndex + 1) / flashcards.length) * 100
      : 0;

  // Get current card safely
  const currentCard = flashcards[currentCardIndex] || null;

  if (loadingAuth) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-[#121220]" : "bg-gray-100"
        }`}
      >
        <div className="text-white">
          <Loader className="animate-spin h-8 w-8" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-[#121220]" : "bg-gray-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-purple-900/20 mb-8">
          <div className="header-left flex items-center">
            <Link
              href="/dashboard"
              className="mr-4 text-gray-400 hover:text-white transition-colors"
            >
              <Home className="h-5 w-5" />
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              StudyPro Flashcards
            </div>
          </div>
          <div className="header-controls flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[#1e1e2f] transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-200 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" /> New Card
            </button>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="px-4 py-2 bg-[#1e1e2f] border border-purple-900/30 hover:border-purple-500/50 text-white font-medium rounded-lg transition-colors flex items-center"
            >
              <Bot className="h-4 w-4 mr-2" /> AI Generate
            </button>
          </div>
        </header>

        {/* Flashcard Section */}
        <div className="flashcard-section mt-6">
          <div className="progress-container bg-[#1e1e2f] rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-right mb-2">
            <div className="card-counter text-sm text-gray-400">
              {flashcards.length > 0
                ? `${currentCardIndex + 1}/${flashcards.length}`
                : "0/0"}
            </div>
          </div>

          {/* Flashcard */}
          <div className="flashcard-container flex justify-center mb-6">
            {currentCard ? (
              <div
                className="flashcard relative w-full max-w-lg h-64 cursor-pointer"
                onClick={flipCard}
              >
                <div
                  className={`flashcard-face absolute w-full h-full p-8 flex flex-col justify-center rounded-xl shadow-md bg-[#1e1e2f] border border-purple-900/30 transition-all duration-500 ${
                    isFlipped
                      ? "opacity-0 -rotate-y-180"
                      : "opacity-100 rotate-y-0"
                  }`}
                >
                  <h2 className="text-xl font-bold mb-4 text-white">
                    Question
                  </h2>
                  <p className="text-gray-300">{currentCard.front}</p>
                </div>
                <div
                  className={`flashcard-face absolute w-full h-full p-8 flex flex-col justify-center rounded-xl shadow-md bg-[#1e1e2f] border border-purple-900/30 transition-all duration-500 ${
                    !isFlipped
                      ? "opacity-0 rotate-y-180"
                      : "opacity-100 rotate-y-0"
                  }`}
                >
                  <h2 className="text-xl font-bold mb-4 text-white">Answer</h2>
                  <p className="text-gray-300">{currentCard.back}</p>
                </div>
              </div>
            ) : (
              <div className="flashcard-face w-full max-w-lg h-64 p-8 flex flex-col justify-center rounded-xl shadow-md bg-[#1e1e2f] border border-purple-900/30">
                <h2 className="text-xl font-bold mb-4 text-white">
                  Welcome to StudyPro Flashcards
                </h2>
                <p className="text-gray-300">
                  Click the 'New Card' button to add your first flashcard or use
                  'AI Generate' to create study materials automatically.
                </p>
              </div>
            )}
          </div>

          {/* SRS Controls */}
          {currentCard && (
            <div className="srs-controls flex justify-center space-x-4 mb-6">
              <button
                onClick={() => rateCardDifficulty("hard")}
                className="px-4 py-2 bg-red-900/30 border border-red-900/30 hover:border-red-500/50 rounded-lg text-red-400 hover:bg-red-900/40 hover:scale-105 transition-all flex items-center"
              >
                <Frown className="h-4 w-4 mr-2" /> Hard
              </button>
              <button
                onClick={() => rateCardDifficulty("medium")}
                className="px-4 py-2 bg-yellow-900/30 border border-yellow-900/30 hover:border-yellow-500/50 rounded-lg text-yellow-400 hover:bg-yellow-900/40 hover:scale-105 transition-all flex items-center"
              >
                <Meh className="h-4 w-4 mr-2" /> Medium
              </button>
              <button
                onClick={() => rateCardDifficulty("easy")}
                className="px-4 py-2 bg-green-900/30 border border-green-900/30 hover:border-green-500/50 rounded-lg text-green-400 hover:bg-green-900/40 hover:scale-105 transition-all flex items-center"
              >
                <Smile className="h-4 w-4 mr-2" /> Easy
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flashcard-controls flex justify-center space-x-4">
            <button
              onClick={goToPrevCard}
              disabled={currentCardIndex === 0 || flashcards.length === 0}
              className="px-4 py-2 bg-[#1e1e2f] border border-purple-900/30 hover:border-purple-500/50 rounded-lg text-white hover:bg-[#2d2d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1e1e2f] disabled:hover:border-purple-900/30 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </button>
            <button
              onClick={goToNextCard}
              disabled={
                currentCardIndex === flashcards.length - 1 ||
                flashcards.length === 0
              }
              className="px-4 py-2 bg-[#1e1e2f] border border-purple-900/30 hover:border-purple-500/50 rounded-lg text-white hover:bg-[#2d2d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1e1e2f] disabled:hover:border-purple-900/30 flex items-center"
            >
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Flashcard Modal */}
      {showAddModal && (
        <div className="fixed z-50 left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="modal-content bg-[#1e1e2f] p-6 rounded-xl shadow-lg w-full max-w-md relative border border-purple-900/30 animate-modal-appear">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Create New Flashcard
            </h2>
            <form onSubmit={handleAddFlashcard}>
              <div className="form-group mb-4">
                <label
                  htmlFor="frontContent"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                >
                  Question:
                </label>
                <textarea
                  id="frontContent"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-purple-900/30 bg-[#2d2d3d] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={frontContent}
                  onChange={(e) => setFrontContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="backContent"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                >
                  Answer:
                </label>
                <textarea
                  id="backContent"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-purple-900/30 bg-[#2d2d3d] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={backContent}
                  onChange={(e) => setBackContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                >
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  placeholder="e.g., Math, Reading, Writing"
                  className="w-full px-4 py-2 rounded-lg border border-purple-900/30 bg-[#2d2d3d] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="form-buttons flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#2d2d3d] border border-purple-900/30 hover:border-purple-500/50 rounded-lg text-white hover:bg-[#34344a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Cards Modal */}
      {showGenerateModal && (
        <div className="fixed z-50 left-0 top-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="modal-content bg-[#1e1e2f] p-6 rounded-xl shadow-lg w-full max-w-md relative border border-purple-900/30 animate-modal-appear">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Generate Flashcards with AI
            </h2>
            <form onSubmit={handleGenerateFlashcards}>
              <div className="form-group mb-4">
                <label
                  htmlFor="topic"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                >
                  Study Topic:
                </label>
                <input
                  type="text"
                  id="topic"
                  placeholder="e.g., SAT Math: Quadratic Equations"
                  className="w-full px-4 py-2 rounded-lg border border-purple-900/30 bg-[#2d2d3d] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="numCards"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                >
                  Number of Cards:
                </label>
                <select
                  id="numCards"
                  className="w-full p-3 bg-[#2d2d3d] rounded-lg border border-purple-900/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={numCards}
                  onChange={(e) => setNumCards(e.target.value)}
                  required
                >
                  <option value="5">5 cards</option>
                  <option value="10">10 cards</option>
                  <option value="15">15 cards</option>
                  <option value="20">20 cards</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="difficulty"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                >
                  Difficulty Level:
                </label>
                <select
                  id="difficulty"
                  className="w-full p-3 bg-[#2d2d3d] rounded-lg border border-purple-900/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  required
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-buttons flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 bg-[#2d2d3d] border border-purple-900/30 hover:border-purple-500/50 rounded-lg text-white hover:bg-[#34344a] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader className="animate-spin mr-2 h-4 w-4" />{" "}
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Cards
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add global styles */}
      <style jsx global>{`
        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modal-appear {
          animation: modalAppear 0.3s;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .rotate-y-0 {
          transform: rotateY(0deg);
        }

        .-rotate-y-180 {
          transform: rotateY(-180deg);
        }

        .flashcard {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .flashcard-face {
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
