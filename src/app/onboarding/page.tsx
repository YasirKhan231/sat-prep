"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db, auth, doc, setDoc, getDoc } from "@/lib/firebase";
import { Sun, Moon, ChevronRight, ChevronLeft } from "lucide-react";
import StudyPlanGenerator, {
  StudyPlan,
  generateStudyPlan,
} from "@/components/StudyPlanGenerator";

// Define subject areas for SAT
const subjectAreas = [
  {
    id: "reading",
    name: "Reading & Writing",
    description: "Comprehension, vocabulary, grammar",
  },
  {
    id: "math_no_calc",
    name: "Math (No Calculator)",
    description: "Algebra, problem-solving without calculator",
  },
  {
    id: "math_calc",
    name: "Math (Calculator)",
    description: "Advanced math problems with calculator",
  },
];

// Define proficiency levels
const proficiencyLevels = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Developing" },
  { value: 3, label: "Proficient" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" },
];

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Onboarding data
  const [testDate, setTestDate] = useState("");
  const [targetScore, setTargetScore] = useState<number>(1200);
  const [strengths, setStrengths] = useState<Record<string, number>>({
    reading: 3,
    math_no_calc: 3,
    math_calc: 3,
  });
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [currentScore, setCurrentScore] = useState<number>(400);

  // Calculate minimum date (today + 1 day)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateString = minDate.toISOString().split("T")[0];

  // Calculate maximum date (today + 1 year)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Check if user has already completed onboarding
    const checkOnboardingStatus = async () => {
      if (user) {
        try {
          const userProfileRef = doc(db, "users", user.uid);
          const userProfileDoc = await getDoc(userProfileRef);

          if (
            userProfileDoc.exists() &&
            userProfileDoc.data().onboarding === true
          ) {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Error checking onboarding status:", error);
        }
      }
    };

    if (user && !loading) {
      checkOnboardingStatus();
    }
  }, [user, loading, router]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleProficiencyChange = (subjectId: string, level: number) => {
    setStrengths((prev) => ({
      ...prev,
      [subjectId]: level,
    }));
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(1, prevStep - 1));
  };

  const handleStudyPlanComplete = (plan: StudyPlan) => {
    setStudyPlan(plan);
  };

  const submitOnboarding = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Create user profile document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName || "User",
        email: user.email,
        testDate,
        currentScore,
        targetScore,
        subjectProficiency: strengths,
        onboarding: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Generate study plan in the background after redirect
      const studyPlan = await generateStudyPlan(
        testDate,
        targetScore,
        strengths
      );
      await setDoc(doc(db, "users", user.uid), { studyPlan }, { merge: true });

      // Redirect to dashboard after successful onboarding
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#121220] text-white">
      <div className="max-w-lg mx-auto py-6 sm:py-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            StudyPro Onboarding
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[#2d2d3d] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>

        <div className="mb-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center max-w-xs mx-auto mb-3">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all text-sm ${
                    step === stepNumber
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      : step > stepNumber
                      ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
                      : "bg-[#2d2d3d] text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
              </div>
            ))}
          </div>

          {/* Progress labels */}
          <div className="flex justify-between items-center max-w-xs mx-auto text-[10px] text-gray-400">
            <div className="text-center">
              <span className={step >= 1 ? "text-purple-400" : ""}>
                Test Date
              </span>
            </div>
            <div className="text-center">
              <span className={step >= 2 ? "text-purple-400" : ""}>Scores</span>
            </div>
            <div className="text-center">
              <span className={step >= 3 ? "text-purple-400" : ""}>
                Assessment
              </span>
            </div>
            <div className="text-center">
              <span className={step >= 4 ? "text-purple-400" : ""}>Verify</span>
            </div>
          </div>
        </div>

        {/* Step 1: Test Date */}
        {step === 1 && (
          <div className="bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-purple-900/30">
            <h2 className="text-lg font-semibold mb-4">
              When is your SAT exam?
            </h2>
            <input
              type="date"
              min={minDateString}
              max={maxDateString}
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#2d2d3d] border border-purple-900/30 text-white mb-4 text-sm"
            />
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                disabled={!testDate}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Current and Target Scores */}
        {step === 2 && (
          <div className="bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-purple-900/30">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                What's your current SAT score?
              </h2>
              <p className="text-xs text-gray-400 mb-3">
                If you haven't taken the SAT yet, estimate based on practice
                tests
              </p>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="400"
                  max="1600"
                  step="10"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(parseInt(e.target.value))}
                  className="flex-grow"
                />
                <span className="text-lg font-bold text-purple-400 min-w-[60px] text-center">
                  {currentScore}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">
                What's your target SAT score?
              </h2>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="400"
                  max="1600"
                  step="10"
                  value={targetScore}
                  onChange={(e) => setTargetScore(parseInt(e.target.value))}
                  className="flex-grow"
                />
                <span className="text-lg font-bold text-purple-400 min-w-[60px] text-center">
                  {targetScore}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-purple-600 rounded-lg font-medium text-sm"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={targetScore <= currentScore}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Self Assessment */}
        {step === 3 && (
          <div className="bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-purple-900/30">
            <h2 className="text-lg font-semibold mb-4">
              Rate your current proficiency
            </h2>
            <div className="space-y-6 mb-4">
              {subjectAreas.map((subject) => (
                <div key={subject.id}>
                  <label className="block text-base font-medium mb-2">
                    {subject.name}
                  </label>
                  <p className="text-xs text-gray-400 mb-2">
                    {subject.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proficiencyLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() =>
                          handleProficiencyChange(subject.id, level.value)
                        }
                        className={`px-3 py-2 rounded-lg text-xs ${
                          strengths[subject.id] === level.value
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                            : "bg-[#2d2d3d] text-gray-400"
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-purple-600 rounded-lg font-medium text-sm"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Verify Information */}
        {step === 4 && (
          <div className="bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-purple-900/30">
            <h2 className="text-lg font-semibold mb-4">
              Verify Your Information
            </h2>

            <div className="space-y-4 mb-6">
              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Test Date
                </h3>
                <p className="text-base">
                  {new Date(testDate).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Current Score
                </h3>
                <p className="text-base">{currentScore}</p>
              </div>

              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Target Score
                </h3>
                <p className="text-base">{targetScore}</p>
              </div>

              <div className="bg-[#252538] p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  Subject Proficiency
                </h3>
                <ul className="space-y-2">
                  {Object.entries(strengths).map(([subject, level]) => (
                    <li key={subject} className="flex justify-between text-sm">
                      <span>
                        {subject === "reading"
                          ? "Reading & Writing"
                          : subject === "math_no_calc"
                          ? "Math (No Calculator)"
                          : "Math (Calculator)"}
                      </span>
                      <span className="text-purple-400">
                        {
                          proficiencyLevels.find((l) => l.value === level)
                            ?.label
                        }
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="px-4 py-2 border border-purple-600 rounded-lg font-medium text-sm"
              >
                Back
              </button>
              <button
                onClick={submitOnboarding}
                disabled={isSubmitting}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Complete Setup"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
