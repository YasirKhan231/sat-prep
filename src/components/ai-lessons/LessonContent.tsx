// src/components/ai-lessons/LessonContent.tsx
"use client";

interface LessonContentProps {
  topic: string;
  subtopic: string;
}

export default function LessonContent({ topic, subtopic }: LessonContentProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6 border border-gray-300 dark:border-gray-700">
      <div className="prose max-w-none dark:text-gray-300">
        <h2 className="dark:text-blue-400">{subtopic}</h2>

        <h3 className="dark:text-blue-400">Introduction</h3>
        <p>
          Welcome to our comprehensive guide on {subtopic} for the SAT exam.
          This lesson will break down this important concept into
          easy-to-understand parts with plenty of examples and practice
          opportunities.
        </p>

        <h3 className="dark:text-blue-400">Key Concepts</h3>
        <p>
          In {subtopic}, you'll need to master several fundamental ideas that
          appear frequently on the SAT:
        </p>
        <ul>
          <li>Understanding the core principles of {subtopic}</li>
          <li>Recognizing common patterns in {subtopic} problems</li>
          <li>
            Applying efficient strategies to solve {subtopic} questions quickly
          </li>
        </ul>

        <h3 className="dark:text-blue-400">Detailed Explanation</h3>
        <p>
          The SAT regularly tests {subtopic} through problems that require
          careful analysis and application of key formulas and concepts. Let's
          explore the most important aspects you need to know:
        </p>

        <p>
          For {topic} problems involving {subtopic}, the SAT typically presents
          scenarios where you'll need to identify relevant information, set up
          appropriate equations or expressions, and solve methodically while
          avoiding common pitfalls.
        </p>

        <h3 className="dark:text-blue-400">Step-by-Step Approach</h3>
        <ol>
          <li>Read the problem carefully, identifying what's being asked</li>
          <li>Extract the key information and variables</li>
          <li>
            Select the appropriate formula or approach for this {subtopic}{" "}
            problem
          </li>
          <li>Work through the solution systematically</li>
          <li>Check your answer for reasonableness</li>
        </ol>

        <h3 className="dark:text-blue-400">Common Mistakes to Avoid</h3>
        <ul>
          <li>Misinterpreting the problem requirements</li>
          <li>Applying the wrong formula or approach</li>
          <li>Calculation errors under time pressure</li>
          <li>Not checking if your answer makes sense in context</li>
        </ul>

        <h3 className="dark:text-blue-400">Example Problems</h3>
        <p>
          Let's look at some typical examples of {subtopic} problems you might
          encounter on the SAT:
        </p>

        <div className="example dark:bg-blue-900/10 p-4 border-l-4 border-blue-500 rounded my-4">
          <p>
            <strong>Example 1:</strong> A problem demonstrating the basic
            application of {subtopic} concepts.
          </p>
          <p>
            <strong>Example 2:</strong> A more challenging problem that combines{" "}
            {subtopic} with other related concepts.
          </p>
          <p>
            <strong>Example 3:</strong> A word problem that requires translating
            real-world scenarios into {subtopic} terms.
          </p>
        </div>
      </div>
    </div>
  );
}
