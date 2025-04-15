// src/components/ai-lessons/TopicSelection.tsx
"use client";

import { Section } from "@/lib/syllabus";

interface TopicSelectionProps {
  section: Section;
  activeTopic: string;
  onTopicClick: (topic: string) => void;
}

export default function TopicSelection({
  section,
  activeTopic,
  onTopicClick,
}: TopicSelectionProps) {
  const { syllabus } = require("@/lib/syllabus");
  const topics = Object.keys(syllabus[section]);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {section} Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicClick(topic)}
            className={`p-3 text-left rounded-lg shadow-md transition-all duration-200 bg-[#13131f] border border-gray-800 hover:bg-[#18181f] transform hover:scale-105 ${
              activeTopic === topic
                ? "border-2 border-purple-500 text-purple-400"
                : "text-gray-300"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
