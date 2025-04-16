"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sun,
  Moon,
  MessageSquare,
  LogOut,
  ChevronDown,
  BookOpen,
  BarChart2,
  Brain,
  Calendar,
  Target,
  Trophy,
  Clock,
} from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user) return null;

  return (
    <header className="border-b border-purple-900/20 py-4 bg-[#121220] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Brain className="h-6 w-6" />
            StudyPro
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/practice-tests"
              className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <BarChart2 className="h-4 w-4" />
              Practice Tests
            </Link>
            <Link
              href="/lessons"
              className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Lessons
            </Link>
            <Link
              href="/study-plan"
              className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Study Plan
            </Link>
            <Link
              href="/progress"
              className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <Trophy className="h-4 w-4" />
              Progress
            </Link>
            <Link
              href="/resources"
              className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              Resources
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-[#1e1e2f] px-3 py-1.5 rounded-full border border-purple-900/30">
              <Clock className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-gray-300">Test in 28 days</span>
            </div>

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
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-medium">
                  <span>
                    {(user.displayName || user.email)?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="hidden md:inline text-gray-300 font-medium">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <div className="absolute right-0 mt-12 w-56 bg-[#1e1e2f] rounded-lg shadow-lg hidden group-hover:block p-2 border border-purple-900/30 z-10">
                <div className="p-3 border-b border-purple-900/30">
                  <p className="font-medium text-white">
                    {user.displayName || user.email?.split("@")[0]}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <div className="p-3 border-b border-purple-900/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Study Streak</span>
                    <span className="text-sm font-medium text-white">
                      5 days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Next Test</span>
                    <span className="text-sm font-medium text-white">
                      28 days
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left p-3 hover:bg-[#2d2d3d] rounded flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
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
  );
}
