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
  Archive,
  Star,
  Filter,
  Search,
  BookOpen,
  FileText,
  BookOpenCheck,
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
      const jsonMatch = content.match(/```(?:json)?([\s\S]*?)```/);
      const jsonContent =
        typeof jsonMatch === "object" && jsonMatch !== null && jsonMatch[1]
          ? jsonMatch[1]
          : content;

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
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Flashcards
          </h1>
          <p className="text-gray-400 mt-2">
            Create, study, and master key concepts with spaced repetition
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-purple-900/30 mb-6">
          <button className="px-6 py-3 font-medium text-sm transition-colors text-purple-400 border-b-2 border-purple-500">
            Study
          </button>
          <button className="px-6 py-3 font-medium text-sm transition-colors text-gray-400 hover:text-gray-300">
            My Decks
          </button>
          <button className="px-6 py-3 font-medium text-sm transition-colors text-gray-400 hover:text-gray-300">
            Browse
          </button>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar/filters */}
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-4 sticky top-4">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-white bg-purple-600 rounded-lg">
                    <span>All Cards</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {flashcards.length}
                    </span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-[#252538] rounded-lg">
                    <span>Mathematics</span>
                    <span className="bg-[#2d2d3f] px-2 py-0.5 rounded-full text-xs">
                      12
                    </span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-[#252538] rounded-lg">
                    <span>Reading</span>
                    <span className="bg-[#2d2d3f] px-2 py-0.5 rounded-full text-xs">
                      8
                    </span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-[#252538] rounded-lg">
                    <span>Writing</span>
                    <span className="bg-[#2d2d3f] px-2 py-0.5 rounded-full text-xs">
                      5
                    </span>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  Review Status
                </h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-[#252538] rounded-lg">
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      Due for Review
                    </span>
                    <span className="bg-[#2d2d3f] px-2 py-0.5 rounded-full text-xs">
                      4
                    </span>
                  </button>
                  <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-300 hover:bg-[#252538] rounded-lg">
                    <span className="flex items-center gap-2">
                      <Archive className="h-4 w-4 text-blue-400" />
                      Mastered
                    </span>
                    <span className="bg-[#2d2d3f] px-2 py-0.5 rounded-full text-xs">
                      16
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">
                  Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Create Flashcard
                  </button>
                  <button
                    onClick={() => setShowGenerateModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#252538] hover:bg-[#2d2d3f] text-gray-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate with AI
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-1 lg:col-span-9">
            {/* Flashcard study area */}
            {flashcards.length > 0 ? (
              <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6">
                {/* Existing flashcard content here */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Study Session
                    </h2>
                    <p className="text-sm text-gray-400">
                      Card {currentCardIndex + 1} of {flashcards.length}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={goToPrevCard}
                      disabled={currentCardIndex === 0}
                      className={`p-2 rounded-lg ${
                        currentCardIndex === 0
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-300 hover:bg-[#252538]"
                      }`}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goToNextCard}
                      disabled={currentCardIndex >= flashcards.length - 1}
                      className={`p-2 rounded-lg ${
                        currentCardIndex >= flashcards.length - 1
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-300 hover:bg-[#252538]"
                      }`}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Flashcard */}
                <div
                  className="relative w-full h-80 perspective-1000 mb-6 cursor-pointer"
                  onClick={flipCard}
                >
                  <div
                    className={`absolute inset-0 transition-all duration-500 transform-style preserve-3d ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* Front side */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl p-6 border border-purple-500/30 backface-hidden">
                      <div className="h-full flex flex-col">
                        <div className="text-xs text-purple-300 mb-2">
                          {flashcards[currentCardIndex]?.category}
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <h3 className="text-2xl text-white text-center">
                            {flashcards[currentCardIndex]?.front}
                          </h3>
                        </div>
                        <div className="text-sm text-gray-400 text-center mt-4">
                          Click to flip
                        </div>
                      </div>
                    </div>

                    {/* Back side */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-xl p-6 border border-indigo-500/30 rotate-y-180 backface-hidden">
                      <div className="h-full flex flex-col">
                        <div className="text-xs text-indigo-300 mb-2">
                          Answer
                        </div>
                        <div className="flex-1 overflow-y-auto">
                          <div className="text-white">
                            {flashcards[currentCardIndex]?.back}
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 text-center mt-4">
                          Rate your answer
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => rateCardDifficulty("hard")}
                    className="flex flex-col items-center p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400"
                  >
                    <Frown className="h-6 w-6 mb-1" />
                    <span className="text-xs">Hard</span>
                  </button>
                  <button
                    onClick={() => rateCardDifficulty("medium")}
                    className="flex flex-col items-center p-3 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                  >
                    <Meh className="h-6 w-6 mb-1" />
                    <span className="text-xs">Medium</span>
                  </button>
                  <button
                    onClick={() => rateCardDifficulty("easy")}
                    className="flex flex-col items-center p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400"
                  >
                    <Smile className="h-6 w-6 mb-1" />
                    <span className="text-xs">Easy</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-8 text-center">
                <BookOpenCheck className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Flashcards Yet
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Create your first flashcard to start studying, or generate a
                  set with AI to quickly build your collection.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    Create Flashcard
                  </button>
                  <button
                    onClick={() => setShowGenerateModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#252538] hover:bg-[#2d2d3f] text-gray-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Sparkles className="h-4 w-4" />
                    Generate with AI
                  </button>
                </div>
              </div>
            )}

            {/* Statistics */}
            {flashcards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30">
                  <h3 className="text-sm text-gray-400 mb-1">Total Cards</h3>
                  <p className="text-3xl font-bold text-white">
                    {flashcards.length}
                  </p>
                  <div className="mt-2 text-xs text-gray-400">
                    Across{" "}
                    {new Set(flashcards.map((card) => card.category)).size}{" "}
                    categories
                  </div>
                </div>

                <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30">
                  <h3 className="text-sm text-gray-400 mb-1">Mastery Level</h3>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(
                      (flashcards.filter((card) => card.srsLevel >= 4).length /
                        flashcards.length) *
                        100
                    )}
                    %
                  </p>
                  <div className="mt-2 text-xs text-gray-400">
                    {flashcards.filter((card) => card.srsLevel >= 4).length}{" "}
                    cards mastered
                  </div>
                </div>

                <div className="bg-[#1e1e2f] p-5 rounded-xl border border-purple-900/30">
                  <h3 className="text-sm text-gray-400 mb-1">Due for Review</h3>
                  <p className="text-3xl font-bold text-white">
                    {
                      flashcards.filter(
                        (card) => new Date(card.nextReview) <= new Date()
                      ).length
                    }
                  </p>
                  <div className="mt-2 text-xs text-gray-400">
                    Cards to review today
                  </div>
                </div>
              </div>
            )}

            {/* Your Progress Section */}
            {flashcards.length > 0 && (
              <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6 mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">
                    Your Progress
                  </h2>
                  <select className="bg-[#252538] text-gray-300 text-sm border border-purple-900/30 rounded-lg px-3 py-1.5">
                    <option>All Time</option>
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>

                {/* Progress by category */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Progress by Category
                  </h3>
                  <div className="space-y-4">
                    {Array.from(
                      new Set(flashcards.map((card) => card.category))
                    ).map((category) => {
                      const categoryCards = flashcards.filter(
                        (card) => card.category === category
                      );
                      const masteredCount = categoryCards.filter(
                        (card) => card.srsLevel >= 4
                      ).length;
                      const progress = Math.round(
                        (masteredCount / categoryCards.length) * 100
                      );

                      return (
                        <div key={category as string} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-300">{category}</span>
                            <span className="text-gray-400">
                              {masteredCount}/{categoryCards.length} cards
                            </span>
                          </div>
                          <div className="w-full h-2 bg-[#252538] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${progress}%`,
                                background:
                                  progress < 30
                                    ? "linear-gradient(to right, #f87171, #fb923c)"
                                    : progress < 70
                                    ? "linear-gradient(to right, #facc15, #a3e635)"
                                    : "linear-gradient(to right, #4ade80, #22d3ee)",
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Learning timeline */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-4">
                    Learning Timeline
                  </h3>
                  <div className="h-48 relative">
                    <div className="absolute inset-0">
                      {/* Grid lines */}
                      <div className="grid grid-cols-7 h-full">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className="border-l border-purple-900/20 h-full"
                          ></div>
                        ))}
                      </div>
                      <div className="grid grid-rows-4 w-full absolute top-0 left-0">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="border-b border-purple-900/20 w-full"
                          ></div>
                        ))}
                      </div>

                      {/* Activity dots - This would be more dynamic in a real app */}
                      <div className="absolute bottom-12 left-[10%] w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="absolute bottom-20 left-[25%] w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="absolute bottom-36 left-[40%] w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="absolute bottom-28 left-[55%] w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="absolute bottom-16 left-[70%] w-3 h-3 rounded-full bg-purple-500"></div>
                      <div className="absolute bottom-24 left-[85%] w-3 h-3 rounded-full bg-purple-500"></div>

                      {/* Line connecting dots */}
                      <svg
                        className="absolute inset-0 w-full h-full overflow-visible"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M10%,calc(100% - 3rem) 25%,calc(100% - 5rem) 40%,calc(100% - 9rem) 55%,calc(100% - 7rem) 70%,calc(100% - 4rem) 85%,calc(100% - 6rem)"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    </div>

                    {/* X-axis labels */}
                    <div className="flex justify-between text-xs text-gray-500 absolute bottom-0 w-full">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                {/* Study habits */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-4">
                      Study Habits
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#252538] rounded-lg p-3">
                        <span className="text-xs text-gray-400">Best day</span>
                        <p className="text-lg font-medium text-white">
                          Wednesday
                        </p>
                      </div>
                      <div className="bg-[#252538] rounded-lg p-3">
                        <span className="text-xs text-gray-400">Best time</span>
                        <p className="text-lg font-medium text-white">
                          Evening
                        </p>
                      </div>
                      <div className="bg-[#252538] rounded-lg p-3">
                        <span className="text-xs text-gray-400">
                          Avg. session
                        </span>
                        <p className="text-lg font-medium text-white">15 min</p>
                      </div>
                      <div className="bg-[#252538] rounded-lg p-3">
                        <span className="text-xs text-gray-400">
                          Efficiency
                        </span>
                        <p className="text-lg font-medium text-white">High</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-4">
                      Recommendations
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span className="text-gray-300">
                          Review Mathematics cards more regularly
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span className="text-gray-300">
                          Create more cards for Reading section
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">•</span>
                        <span className="text-gray-300">
                          Schedule daily 10-min review sessions
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Flashcard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Create New Flashcard
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddFlashcard}>
              <div className="mb-4">
                <label
                  htmlFor="frontContent"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Front (Question)
                </label>
                <textarea
                  id="frontContent"
                  className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter the question or term"
                  rows={3}
                  value={frontContent}
                  onChange={(e) => setFrontContent(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="backContent"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Back (Answer)
                </label>
                <textarea
                  id="backContent"
                  className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="Enter the answer or definition"
                  rows={5}
                  value={backContent}
                  onChange={(e) => setBackContent(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="e.g., Math, Reading, Writing, etc."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#252538] hover:bg-[#2d2d3f] text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Generate Flashcards Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Generate Flashcards with AI
              </h2>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={generateFlashcards}>
              <div className="mb-4">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Topic
                </label>
                <input
                  id="topic"
                  type="text"
                  className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="e.g., Quadratic equations, Reading comprehension, etc."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder="e.g., Math, Reading, Writing, etc."
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="numCards"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Number of Cards
                  </label>
                  <select
                    id="numCards"
                    className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    value={numCards}
                    onChange={(e) => setNumCards(e.target.value)}
                  >
                    <option value="5">5 cards</option>
                    <option value="10">10 cards</option>
                    <option value="15">15 cards</option>
                    <option value="20">20 cards</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="difficulty"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    className="w-full p-3 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="medium">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 bg-[#252538] hover:bg-[#2d2d3f] text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
