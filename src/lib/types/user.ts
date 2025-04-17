import { Timestamp } from "firebase/firestore";

export interface UserData {
  uid: string;
  name: string;
  email: string;

  // Onboarding Status
  onboarded: boolean;

  // Onboarding Preferences
  testDate: string;
  targetScore: number;
  subjectStrengths: string[];
  subjectWeaknesses: string[];
  studyPlanLevel: "poor" | "avg" | "good" | "better" | "best";
  studyHoursPerWeek?: number;

  // Study Plan Customization
  studyPreferences?: {
    preferredTimeOfDay?: "morning" | "afternoon" | "evening";
    sessionsPerWeek?: number;
    focusAreas?: string[];
  };

  // Gamification
  xp: number;
  level: number;
  streak: number;
  dailyGoals: {
    reading: boolean;
    math: boolean;
    writing?: boolean;
  };
  achievements?: {
    id: string;
    name: string;
    description: string;
    unlockedAt: Timestamp;
  }[];

  // Practice Test Results
  practiceTests: {
    type: "full" | "mini";
    testId: string;
    date: string;
    score: {
      reading: number;
      math: number;
      writing: number;
      total?: number;
    };
    timeStats: {
      avgTimePerQuestion: number;
      totalTime?: number;
    };
    areas?: {
      strengths: string[];
      weaknesses: string[];
    };
  }[];

  // Flashcards
  flashcards: {
    aiGenerated: {
      id: string;
      front: string;
      back: string;
      createdAt: string;
      category?: string;
      lastReviewed?: string;
      proficiency?: number;
    }[];
    customDecks: {
      deckName: string;
      cards: {
        front: string;
        back: string;
        category?: string;
        lastReviewed?: string;
        proficiency?: number;
      }[];
    }[];
  };

  // Goal Tracking
  customGoals: {
    goal: string;
    completed: boolean;
    target?: number;
    current?: number;
    deadline?: string;
  }[];

  // Progress Metrics
  progressMetrics?: {
    totalQuestionsAnswered: number;
    correctAnswerRate: number;
    weakestTopics: string[];
    strongestTopics: string[];
    improvementRate?: number;
  };

  // Subscription
  subscription?: {
    plan: "free" | "premium" | "ultimate";
    startDate: Timestamp;
    endDate: Timestamp;
    active: boolean;
    paymentMethod?: string;
  };

  // System Fields
  lastActive: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
