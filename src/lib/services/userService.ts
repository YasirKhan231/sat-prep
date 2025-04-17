import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserData } from "../types/user";
import {
  createDefaultUserData,
  calculateStudyPlanLevel,
} from "../utils/userUtils";

/**
 * Creates a new user document in Firestore
 */
export async function createUser(
  uid: string,
  name: string,
  email: string
): Promise<void> {
  const userData = createDefaultUserData(uid, name, email);

  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    ...userData,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    lastActive: serverTimestamp(),
  });
}

/**
 * Gets a user document from Firestore
 */
export async function getUser(uid: string): Promise<UserData | null> {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserData;
  }

  return null;
}

/**
 * Updates user onboarding information and calculates study plan level
 */
export async function updateUserOnboarding(
  uid: string,
  data: {
    testDate: string;
    targetScore: number;
    studyHoursPerWeek: number;
    subjectStrengths: string[];
    subjectWeaknesses: string[];
  }
): Promise<void> {
  const {
    testDate,
    targetScore,
    studyHoursPerWeek,
    subjectStrengths,
    subjectWeaknesses,
  } = data;

  // Calculate study plan level
  const studyPlanLevel = calculateStudyPlanLevel(
    targetScore,
    studyHoursPerWeek,
    testDate
  );

  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    testDate,
    targetScore,
    studyHoursPerWeek,
    subjectStrengths,
    subjectWeaknesses,
    studyPlanLevel,
    onboarded: true,
    updatedAt: serverTimestamp(),
    lastActive: serverTimestamp(),
  });
}

/**
 * Updates user streak and daily goals
 */
export async function updateUserStreak(
  uid: string,
  dailyGoals: {
    reading: boolean;
    math: boolean;
    writing?: boolean;
  }
): Promise<void> {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return;

  const userData = userDoc.data() as UserData;
  const allGoalsCompleted = Object.values(dailyGoals).every(Boolean);

  // Check if the last active timestamp is from a different day
  const lastActive = userData.lastActive.toDate();
  const today = new Date();
  const isNewDay =
    lastActive.getDate() !== today.getDate() ||
    lastActive.getMonth() !== today.getMonth() ||
    lastActive.getFullYear() !== today.getFullYear();

  // Calculate new streak
  let newStreak = userData.streak;
  if (isNewDay) {
    if (allGoalsCompleted) {
      newStreak += 1; // Increment streak if all goals completed
    } else {
      newStreak = 0; // Reset streak if goals not completed
    }
  }

  // Update user data
  await updateDoc(userRef, {
    streak: newStreak,
    dailyGoals,
    lastActive: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Adds XP to the user and potentially levels them up
 */
export async function addUserXP(uid: string, xpToAdd: number): Promise<void> {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return;

  const userData = userDoc.data() as UserData;
  const currentXP = userData.xp || 0;
  const currentLevel = userData.level || 1;

  // Calculate new XP and level
  const newXP = currentXP + xpToAdd;

  // Level up calculation (100 XP per level, increasing by 50 XP per level)
  const xpNeededForNextLevel = 100 + (currentLevel - 1) * 50;
  let newLevel = currentLevel;

  if (newXP >= xpNeededForNextLevel) {
    newLevel = currentLevel + 1;
  }

  // Update user data
  await updateDoc(userRef, {
    xp: newXP,
    level: newLevel,
    updatedAt: serverTimestamp(),
    lastActive: serverTimestamp(),
  });
}

/**
 * Adds a practice test result
 */
export async function addPracticeTest(
  uid: string,
  testData: UserData["practiceTests"][0]
): Promise<void> {
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return;

  const userData = userDoc.data() as UserData;
  const practiceTests = userData.practiceTests || [];

  // Calculate total score if not provided
  if (!testData.score.total) {
    testData.score.total =
      testData.score.reading + testData.score.math + testData.score.writing;
  }

  // Add the new test
  practiceTests.push(testData);

  // Update user data
  await updateDoc(userRef, {
    practiceTests,
    updatedAt: serverTimestamp(),
    lastActive: serverTimestamp(),
  });

  // Add XP for completing a test
  const xpToAdd = testData.type === "full" ? 100 : 50;
  await addUserXP(uid, xpToAdd);
}
