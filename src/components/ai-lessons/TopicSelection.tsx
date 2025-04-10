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
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
        {section} Topics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicClick(topic)}
            className={`p-3 text-left rounded-lg shadow-md transition-all duration-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transform hover:scale-105 ${
              activeTopic === topic
                ? "border-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : ""
            }`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
