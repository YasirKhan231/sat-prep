"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  Search,
  CheckCircle,
  Star,
  Clock,
  BookMarked,
  FileQuestion,
  Lightbulb,
  Calculator,
  PenTool,
  BarChart,
} from "lucide-react";

// Define the resource type structure
type Resource = {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "practice" | "link";
  category: "math" | "reading" | "writing" | "general";
  difficulty?: "beginner" | "intermediate" | "advanced";
  estimatedTime?: string;
  url: string;
  popular?: boolean;
  featured?: boolean;
};

// Resource data organized by category
const resourceData: { [key: string]: Resource[] } = {
  "study-guides": [
    {
      id: "math-guide",
      title: "Complete SAT Math Study Guide",
      description:
        "Comprehensive review of all math concepts tested on the SAT",
      type: "pdf",
      category: "math",
      difficulty: "intermediate",
      estimatedTime: "3 hours",
      url: "/resources/pdf/sat-math-study-guide.pdf",
      featured: true,
    },
    {
      id: "reading-guide",
      title: "SAT Reading & Writing Guide",
      description: "Detailed strategies for the reading and writing sections",
      type: "pdf",
      category: "reading",
      difficulty: "intermediate",
      estimatedTime: "2.5 hours",
      url: "/resources/pdf/sat-reading-writing-guide.pdf",
    },
    {
      id: "formula-sheet",
      title: "SAT Math Formula Sheet",
      description: "All formulas you need to know for the math section",
      type: "pdf",
      category: "math",
      difficulty: "beginner",
      estimatedTime: "30 minutes",
      url: "/resources/pdf/sat-math-formula-sheet.pdf",
      popular: true,
    },
    {
      id: "vocab-list",
      title: "Essential SAT Vocabulary List",
      description: "Top 500 vocabulary words frequently seen on the SAT",
      type: "pdf",
      category: "reading",
      difficulty: "intermediate",
      estimatedTime: "1.5 hours",
      url: "/resources/pdf/sat-vocabulary-list.pdf",
    },
  ],
  "video-lessons": [
    {
      id: "math-concepts",
      title: "SAT Math Concepts Explained",
      description: "Video explanations of key math concepts tested on the SAT",
      type: "video",
      category: "math",
      difficulty: "intermediate",
      estimatedTime: "5 hours",
      url: "https://www.youtube.com/playlist?list=PLZBQuJsCnFA5nB0vzKzfCGXjCbeQtY_aO",
      featured: true,
    },
    {
      id: "reading-strategies",
      title: "Advanced Reading Strategies",
      description: "Learn to tackle challenging reading passages effectively",
      type: "video",
      category: "reading",
      difficulty: "advanced",
      estimatedTime: "2 hours",
      url: "https://www.youtube.com/playlist?list=PLZBQuJsCnFA7D1bRQX5EB4k43FD7FyaLO",
    },
    {
      id: "grammar-videos",
      title: "SAT Grammar Rules Mastery",
      description: "Complete video series covering all SAT grammar rules",
      type: "video",
      category: "writing",
      difficulty: "intermediate",
      estimatedTime: "3 hours",
      url: "https://www.youtube.com/playlist?list=PLZBQuJsCnFA4OkpL73YUmx8MUIFmnQWOF",
      popular: true,
    },
    {
      id: "test-taking-strategies",
      title: "SAT Test-Taking Strategies",
      description: "Essential strategies for maximizing your score",
      type: "video",
      category: "general",
      difficulty: "beginner",
      estimatedTime: "1 hour",
      url: "https://www.youtube.com/playlist?list=PLZBQuJsCnFA3KWBSGcnMzL43J-X4Pmz56",
    },
  ],
  "practice-materials": [
    {
      id: "math-practice",
      title: "SAT Math Practice Problems",
      description: "Hundreds of practice problems with solutions",
      type: "practice",
      category: "math",
      difficulty: "intermediate",
      estimatedTime: "4 hours",
      url: "/resources/practice/sat-math-practice.html",
      popular: true,
    },
    {
      id: "reading-passages",
      title: "SAT Reading Practice Passages",
      description: "Practice passages with detailed explanations",
      type: "practice",
      category: "reading",
      difficulty: "intermediate",
      estimatedTime: "3 hours",
      url: "/resources/practice/sat-reading-practice.html",
    },
    {
      id: "writing-exercises",
      title: "SAT Writing & Language Exercises",
      description: "Targeted practice for the writing section",
      type: "practice",
      category: "writing",
      difficulty: "intermediate",
      estimatedTime: "2.5 hours",
      url: "/resources/practice/sat-writing-practice.html",
    },
    {
      id: "full-practice-test",
      title: "Full-Length SAT Practice Tests",
      description: "Complete practice tests with answer keys",
      type: "practice",
      category: "general",
      difficulty: "advanced",
      estimatedTime: "4 hours per test",
      url: "/resources/practice/sat-full-tests.html",
      featured: true,
    },
  ],
  "external-resources": [
    {
      id: "college-board",
      title: "Official College Board Resources",
      description: "Official SAT practice tests and study materials",
      type: "link",
      category: "general",
      url: "https://collegereadiness.collegeboard.org/sat/practice",
      popular: true,
    },
    {
      id: "khan-academy",
      title: "Khan Academy SAT Prep",
      description: "Free personalized SAT practice through Khan Academy",
      type: "link",
      category: "general",
      url: "https://www.khanacademy.org/sat",
      featured: true,
    },
    {
      id: "calculator-programs",
      title: "SAT-Approved Calculator Programs",
      description: "Useful programs for your graphing calculator",
      type: "link",
      category: "math",
      difficulty: "intermediate",
      url: "https://www.ticalc.org/pub/text/sat/",
    },
    {
      id: "vocab-flashcards",
      title: "Interactive Vocabulary Flashcards",
      description: "Build your vocabulary with interactive flashcards",
      type: "link",
      category: "reading",
      difficulty: "beginner",
      url: "https://quizlet.com/subject/sat-vocabulary/",
    },
  ],
};

// Category metadata
const categories = [
  {
    id: "study-guides",
    title: "Study Guides",
    description: "Comprehensive study materials for all SAT sections",
    icon: BookOpen,
    color: "blue",
  },
  {
    id: "video-lessons",
    title: "Video Lessons",
    description: "In-depth video explanations of key concepts",
    icon: Video,
    color: "red",
  },
  {
    id: "practice-materials",
    title: "Practice Materials",
    description: "Additional practice resources and worksheets",
    icon: FileText,
    color: "green",
  },
  {
    id: "external-resources",
    title: "External Resources",
    description: "Curated external resources to enhance your prep",
    icon: ExternalLink,
    color: "purple",
  },
];

// Subject icons for filtering
const subjectFilters = [
  { id: "all", label: "All Resources", icon: BookMarked },
  { id: "math", label: "Math", icon: Calculator },
  { id: "reading", label: "Reading", icon: BookOpen },
  { id: "writing", label: "Writing", icon: PenTool },
  { id: "general", label: "General", icon: Lightbulb },
];

export default function ResourcesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121220] text-white">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"></div>
          <div
            className="w-4 h-4 rounded-full bg-indigo-600 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-purple-600 animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  // Flatten resources for filtering
  const allResources = Object.values(resourceData).flat();

  // Filter resources
  const filteredResources = allResources.filter((resource) => {
    // Filter by search
    if (
      searchQuery &&
      !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (selectedCategory && !resource.id.includes(selectedCategory)) {
      return false;
    }

    // Filter by subject
    if (selectedSubject !== "all" && resource.category !== selectedSubject) {
      return false;
    }

    // Filter by difficulty
    if (selectedDifficulty && resource.difficulty !== selectedDifficulty) {
      return false;
    }

    return true;
  });

  // Function to get color for resource category
  const getResourceTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-blue-900/30 text-blue-400";
      case "video":
        return "bg-red-900/30 text-red-400";
      case "practice":
        return "bg-green-900/30 text-green-400";
      case "link":
        return "bg-purple-900/30 text-purple-400";
      default:
        return "bg-gray-900/30 text-gray-400";
    }
  };

  // Function to get icon for resource type
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "practice":
        return <FileQuestion className="h-4 w-4" />;
      case "link":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  // Function to get icon for subject
  const getSubjectIcon = (category: string) => {
    switch (category) {
      case "math":
        return <Calculator className="h-4 w-4" />;
      case "reading":
        return <BookOpen className="h-4 w-4" />;
      case "writing":
        return <PenTool className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  // Featured resources
  const featuredResources = allResources.filter(
    (resource) => resource.featured
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            SAT Study Resources
          </h1>
          <p className="text-gray-400 mt-2">
            Access comprehensive study materials, practice tests, and more to
            help you prepare for the SAT
          </p>
        </div>

        {/* Featured resources */}
        {featuredResources.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Star className="text-yellow-400 mr-2 h-5 w-5" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredResources.map((resource) => (
                <Link
                  href={resource.url}
                  key={resource.id}
                  target={resource.type === "link" ? "_blank" : "_self"}
                  className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-5 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`px-2 py-1 rounded-md flex items-center text-xs gap-1 ${getResourceTypeColor(
                        resource.type
                      )}`}
                    >
                      {getResourceTypeIcon(resource.type)}
                      <span>{resource.type.toUpperCase()}</span>
                    </div>
                    {resource.popular && (
                      <div className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3" /> Popular
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-auto">
                    <div className="text-xs bg-purple-900/20 text-purple-400 px-2 py-1 rounded-full flex items-center gap-1">
                      {getSubjectIcon(resource.category)}
                      <span>
                        {resource.category.charAt(0).toUpperCase() +
                          resource.category.slice(1)}
                      </span>
                    </div>
                    {resource.estimatedTime && (
                      <div className="text-xs bg-blue-900/20 text-blue-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {resource.estimatedTime}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search and filters */}
        <div className="mb-8 bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-5">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-3 pl-10 bg-[#252538] border border-purple-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Subject filter */}
            <div className="flex gap-2 flex-wrap">
              {subjectFilters.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedSubject(filter.id)}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${
                      selectedSubject === filter.id
                        ? "bg-purple-600 text-white"
                        : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional filters */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-purple-900/30">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Resource Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    selectedCategory === null
                      ? "bg-purple-600 text-white"
                      : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                  }`}
                >
                  All Types
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs ${
                      selectedCategory === category.id
                        ? "bg-purple-600 text-white"
                        : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Difficulty
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    selectedDifficulty === null
                      ? "bg-purple-600 text-white"
                      : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => setSelectedDifficulty("beginner")}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    selectedDifficulty === "beginner"
                      ? "bg-green-600 text-white"
                      : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                  }`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setSelectedDifficulty("intermediate")}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    selectedDifficulty === "intermediate"
                      ? "bg-yellow-600 text-white"
                      : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setSelectedDifficulty("advanced")}
                  className={`px-3 py-1.5 rounded-lg text-xs ${
                    selectedDifficulty === "advanced"
                      ? "bg-red-600 text-white"
                      : "bg-[#252538] text-gray-400 hover:bg-[#2a2a40]"
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resource results */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-[#1e1e2f] rounded-xl border border-purple-900/30">
            <p className="text-gray-400">
              No resources match your filters. Try adjusting your criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">All Resources</h2>
              <div className="text-sm text-gray-400">
                Showing {filteredResources.length} resource
                {filteredResources.length !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map((resource) => (
                <Link
                  href={resource.url}
                  key={resource.id}
                  target={resource.type === "link" ? "_blank" : "_self"}
                  className="bg-[#1e1e2f] rounded-xl border border-purple-900/30 p-5 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`px-2 py-1 rounded-md flex items-center text-xs gap-1 ${getResourceTypeColor(
                        resource.type
                      )}`}
                    >
                      {getResourceTypeIcon(resource.type)}
                      <span>{resource.type.toUpperCase()}</span>
                    </div>
                    {resource.popular && (
                      <div className="text-xs bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3" /> Popular
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-auto">
                    <div className="text-xs bg-purple-900/20 text-purple-400 px-2 py-1 rounded-full flex items-center gap-1">
                      {getSubjectIcon(resource.category)}
                      <span>
                        {resource.category.charAt(0).toUpperCase() +
                          resource.category.slice(1)}
                      </span>
                    </div>
                    {resource.estimatedTime && (
                      <div className="text-xs bg-blue-900/20 text-blue-400 px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {resource.estimatedTime}
                      </div>
                    )}
                    {resource.difficulty && (
                      <div
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                          resource.difficulty === "beginner"
                            ? "bg-green-900/20 text-green-400"
                            : resource.difficulty === "intermediate"
                            ? "bg-yellow-900/20 text-yellow-400"
                            : "bg-red-900/20 text-red-400"
                        }`}
                      >
                        <BarChart className="h-3 w-3" />
                        {resource.difficulty.charAt(0).toUpperCase() +
                          resource.difficulty.slice(1)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
