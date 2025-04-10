"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function TestResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const testId = searchParams.get("testId");

  // Mock results data
  const scorePercentage = 82;
  const correctAnswers = 16;
  const totalQuestions = 20;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-8">
        <div className="text-5xl font-bold mb-4">{scorePercentage}%</div>
        <p className="text-xl mb-6">
          You got {correctAnswers} out of {totalQuestions} questions correct
        </p>

        <div className="mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4 mb-2">
            <div
              className="bg-blue-600 h-4 rounded-full"
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        <div className="mt-8 mb-4 space-y-4">
          <button
            onClick={() => router.push(`/tests/${testId}/review`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            View Detailed Results
          </button>
          <button
            onClick={() => router.push("/tests")}
            className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors w-full md:w-auto"
          >
            Take Another Test
          </button>
        </div>

        <div className="mt-4 px-6 py-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-left">
          <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
            Need help understanding your results?
          </p>
          <p className="text-blue-700 dark:text-blue-300">
            Click the chat button to discuss your performance with our AI tutor.
          </p>
        </div>
      </div>
    </div>
  );
}
