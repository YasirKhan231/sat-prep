import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      title: "Official SAT Resources",
      items: [
        {
          name: "College Board Official SAT Practice",
          description: "Free official practice tests and study materials",
          link: "https://satsuite.collegeboard.org/sat/practice-preparation/practice-tests",
        },
        {
          name: "Khan Academy SAT Practice",
          description: "Free personalized practice with official SAT questions",
          link: "https://www.khanacademy.org/sat",
        },
      ],
    },
    {
      title: "Study Materials",
      items: [
        {
          name: "SAT Math Formulas",
          description: "Essential math formulas and concepts",
          link: "/resources/math-formulas",
        },
        {
          name: "SAT Reading Tips",
          description: "Strategies for the reading section",
          link: "/resources/reading-tips",
        },
        {
          name: "Writing and Language Guide",
          description: "Grammar rules and writing tips",
          link: "/resources/writing-guide",
        },
      ],
    },
    {
      title: "Practice Tools",
      items: [
        {
          name: "Practice Tests",
          description: "Take full-length practice tests",
          link: "/practice-tests",
        },
        {
          name: "Flashcards",
          description: "Review key concepts with flashcards",
          link: "/flashcards",
        },
        {
          name: "Study Plan",
          description: "Create a personalized study plan",
          link: "/study-plan",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#121220] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">SAT Resources</h1>
          <p className="text-xl text-gray-300 mb-12">
            Comprehensive study materials and tools to help you prepare for the
            SAT
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-[#1E1E2E] rounded-lg shadow-lg p-6 border border-gray-700"
            >
              <h2 className="text-2xl font-semibold text-white mb-4">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-b border-gray-700 pb-4 last:border-0"
                  >
                    <Link
                      href={item.link}
                      className="block hover:bg-[#2A2A3A] p-3 rounded-lg transition-colors"
                    >
                      <h3 className="text-lg font-medium text-indigo-400">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-gray-400">{item.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
