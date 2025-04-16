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
import DashboardLayout from "@/components/DashboardLayout";

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
      category: category || "Uncategorized",
      created: now,
      lastReviewed: null,
      nextReview: now,
      srsLevel: 0,
      userId: userId,
    };

    try {
      // Store in Firestore
      await setDoc(doc(db, "users", userId, "flashcards", cardId), newCard);

      // Update local state
      setFlashcards([...flashcards, newCard]);
      setShowAddModal(false);
      setFrontContent("");
      setBackContent("");
      setCategory("");
    } catch (error) {
      alert("Failed to save flashcard");
      console.error("Error saving flashcard:", error);
    }
  };

  // Generate flashcards with AI (now fully client-side)
  const generateFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      alert("You must be signed in to generate flashcards");
      return;
    }

    setIsGenerating(true);

    const prompt = `Generate ${numCards} flashcards about ${topic} for ${difficulty} level SAT/ACT students.
Format each card as a JSON object with "front" (question) and "back" (detailed answer/solution) properties.
Include the category '${category || topic}' for all cards.
Include detailed explanations and steps in the answers. For math questions, include the complete solution process.`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a flashcard generator for SAT/ACT students. Create flashcards that are helpful for test preparation. Format your response as a JSON array of objects with front and back properties.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      // Extract JSON content from response
      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No content generated from OpenAI");
      }

      // Extract JSON from the response (might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```(?:json)?([\s\S]*?)```/) || content;
      const jsonContent = jsonMatch[1] || jsonMatch;

      // Parse the generated flashcards
      let generatedCards;
      try {
        generatedCards = JSON.parse(jsonrepair(jsonContent));
      } catch (error) {
        throw new Error("Failed to parse the generated flashcards");
      }

      // Add necessary metadata and save to database
      const now = new Date().toISOString();
      let count = 0;

      for (const card of generatedCards) {
        // Skip invalid cards
        if (!card.front || !card.back) continue;

        const cardId = `${userId}_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 9)}_${count++}`;

        const cardData: Flashcard = {
          id: cardId,
          front: card.front,
          back: card.back,
          category: category || topic || "AI Generated",
          created: now,
          lastReviewed: null,
          nextReview: now,
          srsLevel: 0,
          userId: userId,
          tags: ["ai-generated"],
        };

        // Store in Firestore
        await setDoc(doc(db, "users", userId, "flashcards", cardId), cardData);

        // Add to local state
        setFlashcards((prev) => [...prev, cardData]);
      }

      // Create a record of this deck generation
      const deckId = `${userId}_${Date.now()}_deck`;
      const deckData = {
        id: deckId,
        name: `${topic} (${difficulty})`,
        topic: topic,
        difficulty: difficulty,
        cardCount: count,
        created: now,
        userId: userId,
        tags: ["ai-generated"],
      };

      await setDoc(doc(db, "users", userId, "decks", deckId), deckData);

      // Close modal and reset form
      setShowGenerateModal(false);
      setTopic("");
      setNumCards("10");
      setDifficulty("medium");
    } catch (error) {
      alert("Failed to generate flashcards. Please try again.");
      console.error("Error generating flashcards:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Delete flashcard
  const deleteFlashcard = async () => {
    if (
      flashcards.length === 0 ||
      currentCardIndex >= flashcards.length ||
      !userId
    )
      return;

    const cardId = flashcards[currentCardIndex].id;
    if (!cardId) return;

    // Remove from local state
    const updatedCards = flashcards.filter(
      (_, index) => index !== currentCardIndex
    );
    setFlashcards(updatedCards);

    // If deleting the last card, go to the previous card
    if (currentCardIndex >= updatedCards.length) {
      setCurrentCardIndex(Math.max(0, updatedCards.length - 1));
    }

    try {
      // Here we would delete from Firestore
      // await deleteDoc(doc(db, "users", userId, "flashcards", cardId));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    }
  };

  if (loadingAuth) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader className="w-12 h-12 text-purple-500 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div
        className={`container mx-auto px-4 py-8 ${isDarkMode ? "dark" : ""}`}
      >
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Flashcards
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-[#1e1e2f] text-gray-300 hover:bg-purple-700/20 hover:text-purple-400"
            >
              {isDarkMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="p-2 rounded-full bg-[#1e1e2f] text-gray-300 hover:bg-purple-700/20 hover:text-purple-400"
              title="Add Flashcard"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="p-2 rounded-full bg-[#1e1e2f] text-gray-300 hover:bg-purple-700/20 hover:text-purple-400"
              title="Generate with AI"
            >
              <Bot className="w-5 h-5" />
            </button>
          </div>
        </div>

        {flashcards.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] bg-[#1e1e2f] rounded-xl p-10 border border-purple-900/30">
            <h2 className="text-2xl font-bold mb-4 text-center">
              You don't have any flashcards yet
            </h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Create your own flashcards or let AI generate some for you based
              on the topics you're studying.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Flashcard
              </button>
              <button
                onClick={() => setShowGenerateModal(true)}
                className="px-6 py-3 rounded-lg bg-[#252538] hover:bg-[#2d2d3d] transition-colors flex items-center"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Generate Flashcards
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-[#1e1e2f] rounded-xl p-6 border border-purple-900/30 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-400">
                  Card {currentCardIndex + 1} of {flashcards.length}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={deleteFlashcard}
                    className="p-2 rounded-full text-gray-300 hover:bg-red-900/20 hover:text-red-400"
                    title="Delete Card"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                className={`relative w-full h-64 mx-auto cursor-pointer transition-transform duration-500 transform-gpu ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={flipCard}
              >
                <div
                  className={`absolute inset-0 backface-hidden bg-[#252538] rounded-xl p-8 flex flex-col justify-center items-center transition-opacity duration-500 ${
                    isFlipped ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="text-lg text-center">
                    {flashcards[currentCardIndex]?.front}
                  </div>
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    {flashcards[currentCardIndex]?.category}
                  </div>
                </div>
                <div
                  className={`absolute inset-0 backface-hidden bg-[#252538] rounded-xl p-8 flex flex-col justify-center items-center transition-opacity duration-500 ${
                    isFlipped ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-md overflow-auto max-h-full">
                    {flashcards[currentCardIndex]?.back}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={goToPrevCard}
                  disabled={currentCardIndex === 0}
                  className={`p-2 rounded-lg flex items-center gap-1 ${
                    currentCardIndex === 0
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-300 hover:bg-purple-700/20 hover:text-purple-400"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={() => rateCardDifficulty("hard")}
                    className="p-2 rounded-lg bg-[#252538] hover:bg-red-900/20 text-gray-300 hover:text-red-400 flex items-center"
                    title="Hard - Review Soon"
                  >
                    <Frown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => rateCardDifficulty("medium")}
                    className="p-2 rounded-lg bg-[#252538] hover:bg-yellow-900/20 text-gray-300 hover:text-yellow-400 flex items-center"
                    title="Medium - Review Later"
                  >
                    <Meh className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => rateCardDifficulty("easy")}
                    className="p-2 rounded-lg bg-[#252538] hover:bg-green-900/20 text-gray-300 hover:text-green-400 flex items-center"
                    title="Easy - Long Interval"
                  >
                    <Smile className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={goToNextCard}
                  disabled={currentCardIndex === flashcards.length - 1}
                  className={`p-2 rounded-lg flex items-center gap-1 ${
                    currentCardIndex === flashcards.length - 1
                      ? "text-gray-600 cursor-not-allowed"
                      : "text-gray-300 hover:bg-purple-700/20 hover:text-purple-400"
                  }`}
                >
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Flashcard Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e1e2f] rounded-xl p-6 w-full max-w-md border border-purple-900/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add Flashcard</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleAddFlashcard}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Math, Reading, etc."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="front"
                  >
                    Front (Question)
                  </label>
                  <textarea
                    id="front"
                    value={frontContent}
                    onChange={(e) => setFrontContent(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 h-24"
                    placeholder="What is the quadratic formula?"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="back"
                  >
                    Back (Answer)
                  </label>
                  <textarea
                    id="back"
                    value={backContent}
                    onChange={(e) => setBackContent(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500 h-24"
                    placeholder="x = (-b ± √(b² - 4ac)) / 2a"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 mr-2 rounded-lg text-gray-300 hover:bg-[#252538]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                  >
                    Save Flashcard
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Generate Flashcards Modal */}
        {showGenerateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1e1e2f] rounded-xl p-6 w-full max-w-md border border-purple-900/30">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Generate Flashcards with AI
                </h2>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="p-2 text-gray-400 hover:text-white"
                  disabled={isGenerating}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={generateFlashcards}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="ai-topic"
                  >
                    Topic
                  </label>
                  <input
                    type="text"
                    id="ai-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="SAT Algebra, Reading Comprehension, etc."
                    required
                    disabled={isGenerating}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="ai-category"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="ai-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    placeholder="Math, Reading, etc."
                    disabled={isGenerating}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="ai-number"
                  >
                    Number of Cards
                  </label>
                  <select
                    id="ai-number"
                    value={numCards}
                    onChange={(e) => setNumCards(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    disabled={isGenerating}
                  >
                    <option value="5">5 cards</option>
                    <option value="10">10 cards</option>
                    <option value="15">15 cards</option>
                    <option value="20">20 cards</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label
                    className="block text-sm font-medium text-gray-400 mb-1"
                    htmlFor="ai-difficulty"
                  >
                    Difficulty
                  </label>
                  <select
                    id="ai-difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full p-2 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    disabled={isGenerating}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="medium">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowGenerateModal(false)}
                    className="px-4 py-2 mr-2 rounded-lg text-gray-300 hover:bg-[#252538]"
                    disabled={isGenerating}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors flex items-center"
                    disabled={isGenerating || !topic.trim()}
                  >
                    {isGenerating ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" /> Generate
                        Flashcards
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
