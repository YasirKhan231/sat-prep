// src/components/ai-lessons/Sidebar.tsx
"use client";

import { useTheme } from "@/context/ThemeContext";
import { Section } from "@/lib/syllabus";

interface SidebarProps {
  activeSection: Section | "";
  onSectionClick: (section: Section) => void;
}

export default function Sidebar({
  activeSection,
  onSectionClick,
}: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-4 border-r border-gray-300 dark:border-gray-700 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SAT Study Guide
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <i className="fas fa-sun text-yellow-500" />
          ) : (
            <i className="fas fa-moon text-gray-600" />
          )}
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onSectionClick("Math")}
          className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            activeSection === "Math" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Math
        </button>
        <button
          onClick={() => onSectionClick("Grammar")}
          className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            activeSection === "Grammar" ? "bg-blue-600 text-white" : ""
          }`}
        >
          Grammar
        </button>
      </div>
    </div>
  );
}
