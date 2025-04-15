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
    <div className="w-64 bg-[#13131f] text-white p-4 border-r border-purple-900/20 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">
          <span className="group-hover:text-purple-400 transition-colors">
            SAT Study
          </span>
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-300 hover:text-purple-400 transition-colors"
        >
          {theme === "dark" ? <span>☀️</span> : <span>🌙</span>}
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onSectionClick("Math")}
          className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 hover:bg-[#18181f] ${
            activeSection === "Math"
              ? "bg-violet-600 text-white"
              : "text-gray-300"
          }`}
        >
          Math
        </button>
        <button
          onClick={() => onSectionClick("Grammar")}
          className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 hover:bg-[#18181f] ${
            activeSection === "Grammar"
              ? "bg-violet-600 text-white"
              : "text-gray-300"
          }`}
        >
          Grammar
        </button>
      </div>
    </div>
  );
}
