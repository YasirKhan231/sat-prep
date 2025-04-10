// src/app/ai-lessons/page.tsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/ai-lessons/Sidebar";
import TopicSelection from "@/components/ai-lessons/TopicSelection";
import SubtopicSelection from "@/components/ai-lessons/SubtopicSelection";
import LessonContent from "@/components/ai-lessons/LessonContent";
import PracticeQuestions from "@/components/ai-lessons/PracticeQuestions";
import { Section } from "@/lib/syllabus";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function AILessonsPage() {
  const [activeSection, setActiveSection] = useState<Section>("Math");
  const [activeTopic, setActiveTopic] = useState("");
  const [activeSubtopic, setActiveSubtopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSectionClick = (section: Section) => {
    setActiveSection(section);
    setActiveTopic("");
    setActiveSubtopic("");
    setQuestions([]);
  };

  const handleTopicClick = (topic: string) => {
    setActiveTopic(topic);
    setActiveSubtopic("");
    setQuestions([]);
  };

  const handleSubtopicClick = async (subtopic: string) => {
    setActiveSubtopic(subtopic);
    setIsLoading(true);

    // Simulate API call to generate content
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock questions data
    const mockQuestions: Question[] = [
      {
        id: 1,
        question: `Question 1: Which of the following best demonstrates a key principle of ${subtopic}?`,
        options: [
          "Option A: First possible answer",
          "Option B: Second possible answer",
          "Option C: Third possible answer",
          "Option D: Fourth possible answer",
        ],
        correctAnswer: "Option C: Third possible answer",
        explanation: `This answer is correct because it accurately represents how ${subtopic} works in this context. Options A, B, and D are incorrect because they misapply or misinterpret key concepts.`,
      },
      {
        id: 2,
        question: `Question 2: In a problem involving ${subtopic}, what would be the first step to solve it?`,
        options: [
          "Option A: Calculate the final value",
          "Option B: Identify the variables and constraints",
          "Option C: Draw a diagram",
          "Option D: Apply the quadratic formula",
        ],
        correctAnswer: "Option B: Identify the variables and constraints",
        explanation:
          "Identifying variables and constraints is always the crucial first step before attempting to solve any problem of this type.",
      },
      // Add more questions as needed
    ];

    setQuestions(mockQuestions);
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <div className="flex-1 p-6 overflow-auto">
        {!activeSection && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Select a section from the sidebar to get started
            </p>
          </div>
        )}

        {activeSection && !activeTopic && (
          <TopicSelection
            section={activeSection}
            activeTopic={activeTopic}
            onTopicClick={handleTopicClick}
          />
        )}

        {activeTopic && !activeSubtopic && (
          <SubtopicSelection
            section={activeSection}
            topic={activeTopic}
            activeSubtopic={activeSubtopic}
            onSubtopicClick={handleSubtopicClick}
          />
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin h-8 w-8 text-blue-600" />
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Generating AI content...
            </p>
          </div>
        )}

        {activeSubtopic && !isLoading && (
          <>
            <LessonContent topic={activeTopic} subtopic={activeSubtopic} />

            {questions.length > 0 && (
              <PracticeQuestions questions={questions} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
