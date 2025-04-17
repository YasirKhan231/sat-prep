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
    <div className="w-64 bg-[#13131f] text-white p-4 border-r border-purple-900/20 shadow-md h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
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

      {/* Scroll indicator gradient shadow when content overflows */}
      <div className="h-2 bg-gradient-to-b from-[#13131f]/80 to-transparent sticky top-0 z-10 pointer-events-none"></div>

      <div
        className="space-y-2 flex-1 overflow-y-auto
        scrollbar-thin 
        scrollbar-thumb-purple-500/50 
        scrollbar-track-transparent 
        hover:scrollbar-thumb-purple-400/70
        scrollbar-thumb-rounded-full
        scroll-smooth
        scrollbar-track-rounded-full
        transition-all duration-200
        pr-1
        custom-scrollbar"
      >
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
