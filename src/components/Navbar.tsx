"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            StudyPro
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/dashboard"
              className="text-blue-600 dark:text-blue-400 font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/tests"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Tests
            </Link>
            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Analytics
            </Link>
            <Link
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Resources
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <i className="fas fa-sun text-yellow-500" />
              ) : (
                <i className="fas fa-moon text-gray-600" />
              )}
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Open chatbot"
            >
              <i className="fas fa-comment-dots text-blue-600 dark:text-blue-400" />
            </button>

            <div className="flex items-center space-x-3 relative group">
              <span className="hidden md:inline">
                {user.displayName || user.email?.split("@")[0]}
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium cursor-pointer">
                <span>
                  {(user.displayName || user.email)?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="absolute right-0 mt-12 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg hidden group-hover:block p-2 border border-gray-200 dark:border-gray-600 z-10">
                <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                  <p className="font-medium">
                    {user.displayName || user.email?.split("@")[0]}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex items-center space-x-2 text-red-600 dark:text-red-400"
                >
                  <i className="fas fa-sign-out-alt" />
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
