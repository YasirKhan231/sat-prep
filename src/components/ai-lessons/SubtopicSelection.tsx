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
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {topic} Subtopics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subtopics.map((subtopic: any) => (
          <button
            key={subtopic}
            onClick={() => onSubtopicClick(subtopic)}
            className={`p-3 text-left rounded-lg shadow-md transition-all duration-200 bg-[#13131f] border border-gray-800 hover:bg-[#18181f] transform hover:scale-105 ${
              activeSubtopic === subtopic
                ? "border-2 border-purple-500 text-purple-400"
                : "text-gray-300"
            }`}
          >
            {subtopic}
          </button>
        ))}
      </div>
    </div>
  );
}
