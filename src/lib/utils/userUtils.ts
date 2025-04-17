import { Timestamp } from "firebase/firestore";
import { UserData } from "../types/user";

/**
 * Calculates the study plan level based on user onboarding data
 * @param targetScore The user's target SAT score
 * @param studyHoursPerWeek How many hours per week the user can dedicate to studying
 * @param testDate The target test date (to calculate available weeks)
 * @returns The calculated study plan level
 */
export function calculateStudyPlanLevel(
  targetScore: number,
  studyHoursPerWeek: number,
  testDate: string
): UserData["studyPlanLevel"] {
  // Calculate weeks until test
  const now = new Date();
  const test = new Date(testDate);
  const weeksUntilTest = Math.max(
    1,
    Math.floor((test.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000))
  );

  // Calculate total study hours available
  const totalStudyHours = weeksUntilTest * studyHoursPerWeek;

  // Score ambition factor (higher target score needs more preparation)
  const scoreAmbition =
    targetScore >= 1500
      ? 2
      : targetScore >= 1400
      ? 1.5
      : targetScore >= 1300
      ? 1
      : 0.5;

  // Calculate plan level based on available study hours and score ambition
  const studyIntensity = totalStudyHours * scoreAmbition;

  if (studyIntensity >= 200) return "best";
  if (studyIntensity >= 150) return "better";
  if (studyIntensity >= 100) return "good";
  if (studyIntensity >= 50) return "avg";
  return "poor";
}

/**
 * Creates a default user data structure with required fields
 * @param uid User ID
 * @param name User's name
 * @param email User's email
 * @returns A default UserData object with minimum required fields
 */
export function createDefaultUserData(
  uid: string,
  name: string,
  email: string
): Partial<UserData> {
  const now = Timestamp.now();

  return {
    uid,
    name,
    email,
    onboarded: false,
    xp: 0,
    level: 1,
    streak: 0,
    dailyGoals: {
      reading: false,
      math: false,
    },
    practiceTests: [],
    flashcards: {
      aiGenerated: [],
      customDecks: [],
    },
    customGoals: [],
    lastActive: now,
    createdAt: now,
    updatedAt: now,
  };
}
