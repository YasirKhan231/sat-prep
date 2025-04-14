"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sun, Moon, MessageSquare, LogOut } from "lucide-react";

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
    <header className="border-b border-purple-900/20 py-4 bg-[#121220]">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
          >
            StudyPro
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link href="/tests" className="text-white font-medium">
              Tests
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Analytics
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
              <div className="absolute right-0 mt-12 w-48 bg-[#1e1e2f] rounded-lg shadow-lg hidden group-hover:block p-2 border border-purple-900/30 z-10">
                <div className="p-3 border-b border-purple-900/30">
                  <p className="font-medium text-white">
                    {user.displayName || user.email?.split("@")[0]}
                  </p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left p-2 hover:bg-[#2a2a3f] rounded flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
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
