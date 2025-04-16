"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db, auth, doc, setDoc, getDoc } from "@/lib/firebase";
import { Sun, Moon, ChevronRight, ChevronLeft } from "lucide-react";
import AssessmentQuiz, { AssessmentResults } from "@/components/AssessmentQuiz";
import StudyPlanGenerator, { StudyPlan } from "@/components/StudyPlanGenerator";

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
  const [assessmentResults, setAssessmentResults] =
    useState<AssessmentResults | null>(null);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);

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

  const handleAssessmentComplete = (results: AssessmentResults) => {
    setAssessmentResults(results);
    nextStep();
  };

  const handleStudyPlanComplete = (plan: StudyPlan) => {
    setStudyPlan(plan);
  };

  const submitOnboarding = async () => {
    if (!user || !assessmentResults || !studyPlan) return;

    setIsSubmitting(true);
    try {
      // Create user profile document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName || "User",
        email: user.email,
        testDate,
        targetScore,
        subjectProficiency: strengths,
        assessmentResults,
        studyPlan,
        onboarding: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

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
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
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

        <div className="mb-8">
          {/* Progress Steps */}
          <div className="flex justify-between items-center max-w-2xl mx-auto mb-4">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
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
          <div className="flex justify-between items-center max-w-2xl mx-auto text-xs text-gray-400">
            <div className="text-center">
              <span className={step >= 1 ? "text-purple-400" : ""}>
                Test Date
              </span>
            </div>
            <div className="text-center">
              <span className={step >= 2 ? "text-purple-400" : ""}>
                Target Score
              </span>
            </div>
            <div className="text-center">
              <span className={step >= 3 ? "text-purple-400" : ""}>
                Self Assessment
              </span>
            </div>
            <div className="text-center">
              <span className={step >= 4 ? "text-purple-400" : ""}>Quiz</span>
            </div>
            <div className="text-center">
              <span className={step >= 5 ? "text-purple-400" : ""}>
                Study Plan
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Test Date */}
        {step === 1 && (
          <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-8 border border-purple-900/30">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-4">
                When are you planning to take the SAT?
              </h2>
              <p className="text-gray-400 text-center mb-6">
                This helps us create a personalized study schedule for you.
              </p>

              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Test Date
                </label>
                <input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  min={minDateString}
                  max={maxDateString}
                  className="w-full px-4 py-2 rounded-lg border border-purple-900/30 bg-[#2d2d3d] text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-end">
              <button
                onClick={nextStep}
                disabled={!testDate}
                className={`flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all shadow-md hover:shadow-purple-500/20 ${
                  !testDate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Target Score */}
        {step === 2 && (
          <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-8 border border-purple-900/30">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-4">
                What's your target SAT score?
              </h2>
              <p className="text-gray-400 text-center mb-6">
                We'll help you achieve your goal with personalized study
                resources.
              </p>

              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Target Score (400-1600)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="400"
                    max="1600"
                    step="10"
                    value={targetScore}
                    onChange={(e) => setTargetScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#2d2d3d] rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <span className="bg-[#2d2d3d] px-3 py-1 rounded-md min-w-[80px] text-center">
                    {targetScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between">
              <button
                onClick={prevStep}
                className="flex items-center px-4 py-2 rounded-lg bg-[#2d2d3d] text-gray-300 hover:bg-purple-900/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all shadow-md hover:shadow-purple-500/20"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Strengths & Weaknesses */}
        {step === 3 && (
          <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-8 border border-purple-900/30">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-4">
                How would you rate your current abilities?
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Be honest! This helps us focus on areas where you need the most
                improvement.
              </p>

              <div className="space-y-6">
                {subjectAreas.map((subject) => (
                  <div
                    key={subject.id}
                    className="bg-[#252538] p-4 rounded-lg border border-purple-900/20"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h3 className="font-medium text-gray-200">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {subject.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {proficiencyLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() =>
                              handleProficiencyChange(subject.id, level.value)
                            }
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              strengths[subject.id] === level.value
                                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                                : "bg-[#2d2d3d] text-gray-400 hover:bg-purple-900/30"
                            }`}
                          >
                            {level.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-10 flex justify-between">
              <button
                onClick={prevStep}
                className="flex items-center px-4 py-2 rounded-lg bg-[#2d2d3d] text-gray-300 hover:bg-purple-900/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              <button
                onClick={nextStep}
                className="flex items-center px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all shadow-md hover:shadow-purple-500/20"
              >
                Continue to Assessment
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Initial Assessment */}
        {step === 4 && (
          <AssessmentQuiz
            onComplete={handleAssessmentComplete}
            onBack={prevStep}
          />
        )}

        {/* Step 5: Study Plan Generation */}
        {step === 5 && assessmentResults && (
          <>
            <StudyPlanGenerator
              testDate={testDate}
              targetScore={targetScore}
              assessmentResults={assessmentResults}
              onComplete={handleStudyPlanComplete}
            />

            {/* Final Submit Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={submitOnboarding}
                disabled={isSubmitting || !studyPlan}
                className={`flex items-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all shadow-md hover:shadow-purple-500/20 ${
                  isSubmitting || !studyPlan
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Saving...</span>
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  </>
                ) : (
                  "Go to Dashboard"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
