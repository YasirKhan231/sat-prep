"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import {
  Sun,
  Moon,
  MessageSquare,
  LogOut,
  BarChart2,
  BookOpen,
  Brain,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [user, loading, router]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121220] text-white">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
          <div
            className="w-4 h-4 rounded-full bg-indigo-600 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#121220] text-white`}>
      {/* Navbar */}
      <header className="border-b border-purple-900/20 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between py-2">
            <Link
              href="/dashboard"
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
            >
              StudyPro
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/dashboard" className="text-white font-medium">
                Dashboard
              </Link>
              <Link
                href="/tests"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tests
              </Link>
              <Link
                href="/flashcards"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Flashcards
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Resources
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-[#1e1e2f] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-300" />
                )}
              </button>

              <button
                className="p-2 rounded-full hover:bg-[#1e1e2f] transition-colors"
                aria-label="Open chatbot"
              >
                <MessageSquare className="h-5 w-5 text-purple-400" />
              </button>

              <div className="flex items-center space-x-3 relative group">
                <span className="hidden md:inline text-gray-300">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer">
                  <span>
                    {(user.displayName || user.email)?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="absolute right-0 mt-12 w-48 bg-[#1e1e2f] border border-purple-900/30 rounded-lg shadow-lg hidden group-hover:block p-2 z-10">
                  <div className="p-3 border-b border-purple-900/30">
                    <p className="font-medium text-white">
                      {user.displayName || user.email?.split("@")[0]}
                    </p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left p-2 hover:bg-[#2d2d3d] text-red-400 rounded flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-purple-900/80 to-indigo-900/80 rounded-xl p-6 mb-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 mix-blend-overlay"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Hey {user.displayName || user.email?.split("@")[0]}, ready to
                  crush your goals today?
                </h1>
                <p className="text-lg opacity-90">
                  You're making great progress! Keep up the momentum.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-purple-500/20">
                <p className="flex items-center text-white">
                  <span className="mr-2">🔥</span> 5-day streak! Take today's
                  5-min challenge.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">📅</span> Upcoming Test Date
              </h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">28</div>
              <div className="text-sm text-gray-400">Days Remaining</div>
            </div>
            <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">📈</span> Study Plan Progress
              </h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">65%</div>
              <div className="text-sm text-gray-400">Completion Rate</div>
            </div>
            <div className="bg-[#1e1e2f] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-purple-900/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">🎯</span> Last Practice Test Score
              </h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">82%</div>
              <div className="text-sm text-gray-400">Above Average</div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/tests"
              className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-purple-500 mb-4">
                <BarChart2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Take Practice Test</h3>
              <p className="text-gray-400">
                Challenge yourself with a new practice test
              </p>
            </Link>
            <Link
              href="/study-plan"
              className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-purple-500 mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Study Plan</h3>
              <p className="text-gray-400">
                Check your personalized study schedule
              </p>
            </Link>
            <Link
              href="/ai-lessons"
              className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-purple-500 mb-4">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI generated lessons
              </h3>
              <p className="text-gray-400">Get personalized learning content</p>
            </Link>
            <Link
              href="/notes"
              className="bg-[#1e1e2f] rounded-xl shadow-md p-6 border border-purple-900/30 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-purple-500 mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Generate Notes</h3>
              <p className="text-gray-400">
                Create study notes from test content
              </p>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-900/20 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} StudyPro. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Add global styles */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
