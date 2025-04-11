"use client";

import { useState, useEffect } from "react";
import {
  FaMoon,
  FaSun,
  FaPlus,
  FaRobot,
  FaArrowLeft,
  FaArrowRight,
  FaFrown,
  FaMeh,
  FaSmile,
  FaMagic,
  FaSpinner,
} from "react-icons/fa";

interface Flashcard {
  front: string;
  back: string;
  category: string;
  created: string;
  lastReviewed: string | null;
  nextReview: string;
  srsLevel: number;
}

export default function FlashcardsPage() {
  // State management
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Form state
  const [frontContent, setFrontContent] = useState("");
  const [backContent, setBackContent] = useState("");
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [numCards, setNumCards] = useState("10");
  const [difficulty, setDifficulty] = useState("medium");

  // Load flashcards from localStorage on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);

    const savedCards = localStorage.getItem("crackd_flashcards");
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
  }, []);

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("crackd_flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

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
  const handleAddFlashcard = (e: React.FormEvent) => {
    e.preventDefault();

    const newCard: Flashcard = {
      front: frontContent,
      back: backContent,
      category: category,
      created: new Date().toISOString(),
      lastReviewed: null,
      nextReview: new Date().toISOString(),
      srsLevel: 0,
    };

    setFlashcards([...flashcards, newCard]);
    setFrontContent("");
    setBackContent("");
    setCategory("");
    setShowAddModal(false);
  };

  // Generate flashcards with AI (direct implementation)
  const handleGenerateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          difficulty,
          numCards,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to generate flashcards");
      }

      if (result.cards && Array.isArray(result.cards)) {
        setFlashcards((prev) => [...prev, ...result.cards]);
      }
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

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div className="header-left">
            <div className="logo text-blue-600 text-2xl font-bold">CrackD</div>
          </div>
          <div className="header-controls flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="primary-button px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              <FaPlus className="inline mr-2" /> New Card
            </button>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="secondary-button px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors transform hover:scale-105"
            >
              <FaRobot className="inline mr-2" /> AI Generate
            </button>
          </div>
        </header>

        {/* Flashcard Section */}
        <div className="flashcard-section mt-6">
          <div className="progress-container bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="progress-fill bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-right mb-2">
            <div className="card-counter text-sm text-gray-600 dark:text-gray-300">
              {flashcards.length > 0
                ? `${currentCardIndex + 1}/${flashcards.length}`
                : "0/0"}
            </div>
          </div>

          {/* Flashcard */}
          <div className="flashcard-container flex justify-center mb-6">
            {currentCard ? (
              <div
                className={`flashcard relative w-full max-w-lg h-64 cursor-pointer transition-transform duration-500 ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={flipCard}
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`flashcard-face absolute w-full h-full p-8 flex flex-col justify-center rounded-lg shadow-md ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } ${isFlipped ? "hidden" : ""}`}
                >
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Question
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentCard.front}
                  </p>
                </div>
                <div
                  className={`flashcard-face absolute w-full h-full p-8 flex flex-col justify-center rounded-lg shadow-md ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  } ${!isFlipped ? "hidden" : ""}`}
                >
                  <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Answer
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {currentCard.back}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`flashcard-face w-full max-w-lg h-64 p-8 flex flex-col justify-center rounded-lg shadow-md ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  Welcome to CrackD
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
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
                className="srs-button hard px-4 py-2 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-600 dark:text-red-200 hover:scale-105 transition-all"
              >
                <FaFrown className="inline mr-2" /> Hard
              </button>
              <button
                onClick={() => rateCardDifficulty("medium")}
                className="srs-button medium px-4 py-2 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg text-yellow-600 dark:text-yellow-200 hover:scale-105 transition-all"
              >
                <FaMeh className="inline mr-2" /> Medium
              </button>
              <button
                onClick={() => rateCardDifficulty("easy")}
                className="srs-button easy px-4 py-2 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg text-green-600 dark:text-green-200 hover:scale-105 transition-all"
              >
                <FaSmile className="inline mr-2" /> Easy
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flashcard-controls flex justify-center space-x-4">
            <button
              onClick={goToPrevCard}
              disabled={currentCardIndex === 0}
              className="secondary-button px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <FaArrowLeft className="inline mr-2" /> Previous
            </button>
            <button
              onClick={goToNextCard}
              disabled={
                currentCardIndex === flashcards.length - 1 ||
                flashcards.length === 0
              }
              className="secondary-button px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              Next <FaArrowRight className="inline ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Flashcard Modal */}
      {showAddModal && (
        <div className="fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative animate-modal-appear">
            <button
              onClick={() => setShowAddModal(false)}
              className="close-modal absolute right-5 top-4 text-gray-600 dark:text-gray-300 text-2xl cursor-pointer"
            >
              &times;
            </button>
            <h2 className="modal-title text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Create New Flashcard
            </h2>
            <form onSubmit={handleAddFlashcard}>
              <div className="form-group mb-4">
                <label
                  htmlFor="frontContent"
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"
                >
                  Question:
                </label>
                <textarea
                  id="frontContent"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={frontContent}
                  onChange={(e) => setFrontContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="backContent"
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"
                >
                  Answer:
                </label>
                <textarea
                  id="backContent"
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={backContent}
                  onChange={(e) => setBackContent(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"
                >
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  placeholder="e.g., Math, Reading, Writing"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="form-buttons flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="secondary-button px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        <div className="fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative animate-modal-appear">
            <button
              onClick={() => setShowGenerateModal(false)}
              className="close-modal absolute right-5 top-4 text-gray-600 dark:text-gray-300 text-2xl cursor-pointer"
            >
              &times;
            </button>
            <h2 className="modal-title text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Generate Flashcards with AI
            </h2>
            <form onSubmit={handleGenerateFlashcards}>
              <div className="form-group mb-4">
                <label
                  htmlFor="topic"
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"
                >
                  Study Topic:
                </label>
                <input
                  type="text"
                  id="topic"
                  placeholder="e.g., SAT Math: Quadratic Equations"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-4">
                <label
                  htmlFor="numCards"
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"
                >
                  Number of Cards:
                </label>
                <select
                  id="numCards"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1"
                >
                  Difficulty Level:
                </label>
                <select
                  id="difficulty"
                  className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="secondary-button px-6 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="primary-button px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Generating...
                    </>
                  ) : (
                    <>
                      <FaMagic className="mr-2" /> Generate Cards
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
        .dark-mode {
          background-color: #1a202c;
          color: #e2e8f0;
        }

        .dark-mode .flashcard-face {
          background-color: #2d3748;
          border-color: #4a5568;
          color: #e2e8f0;
        }

        .dark-mode .modal-content {
          background-color: #2d3748;
          color: #e2e8f0;
        }

        .dark-mode input,
        .dark-mode textarea,
        .dark-mode select {
          background-color: #4a5568;
          border-color: #4a5568;
          color: #e2e8f0;
        }

        .flashcard {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .flashcard-face {
          backface-visibility: hidden;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .animate-modal-appear {
          animation: modalAppear 0.3s;
        }

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
      `}</style>
    </div>
  );
}
