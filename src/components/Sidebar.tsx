import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  BookOpen,
  Target,
  Calendar,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  LogOut,
  Brain,
  FileText,
  BarChart2,
  Zap,
  Book,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  onToggleChatbot?: () => void;
}

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Study Plan", href: "/study-plan", icon: Calendar },
  { name: "Practice Tests", href: "/practice-tests", icon: Target },
  { name: "Lessons", href: "/lessons", icon: BookOpen },
  { name: "AI Tutor", href: "/ai-lessons", icon: Brain },
  { name: "Flashcards", href: "/flashcards", icon: FileText },
  { name: "Progress", href: "/progress", icon: BarChart2 },
  { name: "Quick Quiz", href: "/quick-quiz", icon: Zap },
  { name: "Resources", href: "/resources", icon: Book },
  {
    name: "Practice Questions",
    href: "/practice-questions",
    icon: ClipboardList,
  },
  { name: "Subscription", href: "/subscription", icon: CreditCard },
];

export default function Sidebar({
  isOpen,
  toggleSidebar,
  onToggleChatbot,
}: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-30 lg:hidden bg-[#1e1e2f] p-2 rounded-lg border border-purple-900/30"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-purple-400" />
        ) : (
          <Menu className="w-6 h-6 text-purple-400" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-[#1e1e2f] border-r border-purple-900/30 transition-all duration-300 z-30 flex flex-col
          ${
            isOpen
              ? "w-64 translate-x-0"
              : "w-20 -translate-x-full lg:translate-x-0"
          }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-purple-900/30">
          <Link href="/dashboard" className="flex items-center">
            {isOpen ? (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                StudyPro
              </h1>
            ) : (
              <span className="text-2xl font-bold text-purple-400">S</span>
            )}
          </Link>
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-1 hover:bg-[#252538] rounded-lg"
            aria-label="Toggle sidebar width"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-purple-400" />
            ) : (
              <ChevronRight className="w-5 h-5 text-purple-400" />
            )}
          </button>
        </div>

        {/* Menu items */}
        <nav className="flex-1 mt-4 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center h-12 px-3 rounded-lg mb-1 transition-colors
                  ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : "text-gray-400 hover:bg-[#252538]"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? "text-white" : "text-purple-400"
                  }`}
                />
                {isOpen && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-2 pb-4 border-t border-purple-900/30 pt-4">
          {/* Chatbot toggle */}
          <a
            href="/ai-chat"
            className="flex items-center w-full h-12 px-3 rounded-lg mb-2 text-gray-400 hover:bg-[#252538] transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-purple-400" />
            {isOpen && (
              <span className="ml-3 text-sm font-medium">AI Tutor</span>
            )}
          </a>

          {/* User profile */}
          {user && (
            <div
              className={`flex items-center gap-3 px-3 py-2 ${
                isOpen ? "" : "justify-center"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                {user.displayName?.[0] || user.email?.[0] || "U"}
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.displayName || user.email?.split("@")[0]}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 mt-1"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main content margin */}
      <div
        className={`${
          isOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20"
        } transition-all duration-300`}
      >
        {/* This div provides margin for the main content */}
      </div>
    </>
  );
}
