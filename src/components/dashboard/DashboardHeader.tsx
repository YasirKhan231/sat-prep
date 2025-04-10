"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggle";

export default function DashboardHeader() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/signin");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <a
            href="#"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            StudyPro
          </a>
          <div className="hidden md:flex space-x-6">
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 font-medium"
            >
              Dashboard
            </a>
            <a
              href="/tests"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Tests
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Analytics
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Resources
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <div className="flex items-center space-x-3 relative group">
              <span className="hidden md:inline">
                {user?.displayName || user?.email?.split("@")[0]}
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium cursor-pointer">
                <span>
                  {(user?.displayName || user?.email)?.[0]?.toUpperCase()}
                </span>
              </div>
              <div className="absolute right-0 mt-12 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg hidden group-hover:block p-2 border border-gray-200 dark:border-gray-600 z-10">
                <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                  <p className="font-medium">
                    {user?.displayName || user?.email?.split("@")[0]}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex items-center space-x-2 text-red-600 dark:text-red-400"
                >
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
