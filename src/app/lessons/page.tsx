import StudyLessons from "@/components/StudyLessons";

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-[#121220] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AI-Powered Study Lessons
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105">
              <div className="text-purple-500 mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Bite-Sized Lessons
              </h2>
              <p className="text-gray-400">
                AI summarizes key concepts in easy-to-understand explanations.
              </p>
            </div>
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105">
              <div className="text-purple-500 mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Practice Questions
              </h2>
              <p className="text-gray-400">
                Each lesson comes with 5-10 interactive questions to reinforce
                learning.
              </p>
            </div>
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105">
              <div className="text-purple-500 mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Instant AI Feedback
              </h2>
              <p className="text-gray-400">
                Provides explanations when users get an answer wrong.
              </p>
            </div>
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)] transition-all cursor-pointer transform hover:scale-105">
              <div className="text-purple-500 mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Dynamic Difficulty
              </h2>
              <p className="text-gray-400">
                Questions adapt based on user performance, ensuring a challenge
                without frustration.
              </p>
            </div>
          </div>
          <StudyLessons />
        </div>
      </div>
    </div>
  );
}
