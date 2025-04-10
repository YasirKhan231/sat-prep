// src/components/ai-lessons/SubtopicSelection.tsx
"use client";

import { Section } from "@/lib/syllabus";

interface SubtopicSelectionProps {
  section?: Section;
  topic: string;
  activeSubtopic: string;
  onSubtopicClick: (subtopic: string) => void;
}

export default function SubtopicSelection({
  section,
  topic,
  activeSubtopic,
  onSubtopicClick,
}: SubtopicSelectionProps) {
  const { syllabus } = require("@/lib/syllabus");
  const subtopics = syllabus[section || ""][topic];

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
        {topic} Subtopics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subtopics.map((subtopic: any) => (
          <button
            key={subtopic}
            onClick={() => onSubtopicClick(subtopic)}
            className={`p-3 text-left rounded-lg shadow-md transition-all duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transform hover:scale-105 ${
              activeSubtopic === subtopic
                ? "border-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            {subtopic}
          </button>
        ))}
      </div>
    </div>
  );
}
