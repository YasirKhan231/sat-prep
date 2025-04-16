import { db, doc, getDoc, setDoc, updateDoc } from "../firebase";

// Daily goal interface
export interface DailyGoal {
  id: string;
  title: string;
  xp: number;
  completed: boolean;
}

// Activity interface
export interface Activity {
  id: string;
  type: "goal" | "quiz" | "practice" | "lesson" | "streak";
  title: string;
  timestamp: string;
  xpEarned: number;
}

// User progress interface
export interface UserProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  lastStudyDate: string;
  dailyGoalCompleted: boolean;
  dailyGoals: DailyGoal[];
  recentActivities: Activity[];
}

// Get default daily goals
export const getDefaultDailyGoals = (): DailyGoal[] => [
  {
    id: "g1",
    title: "Complete 10 practice questions",
    xp: 20,
    completed: false,
  },
  { id: "g2", title: "Review a challenging topic", xp: 15, completed: false },
  { id: "g3", title: "Take a 5-minute quiz", xp: 25, completed: false },
];

// Calculate XP needed for a level
export const calculateXpForLevel = (level: number): number => {
  let xp = 100; // Base XP for level 1
  for (let i = 1; i < level; i++) {
    xp = Math.floor(xp * 1.5);
  }
  return xp;
};

// Default user progress
export const defaultUserProgress: UserProgress = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  lastStudyDate: new Date().toISOString().split("T")[0],
  dailyGoalCompleted: false,
  dailyGoals: getDefaultDailyGoals(),
  recentActivities: [],
};

// Get user progress
export const getUserProgress = async (
  userId: string
): Promise<UserProgress> => {
  try {
    const progressRef = doc(db, "userProgress", userId);
    const progressDoc = await getDoc(progressRef);

    if (progressDoc.exists()) {
      return progressDoc.data() as UserProgress;
    } else {
      // Create new default progress
      const today = new Date().toISOString().split("T")[0];
      const newProgress = {
        ...defaultUserProgress,
        lastStudyDate: today,
      };

      // Save to firestore
      await setDoc(progressRef, newProgress);
      return newProgress;
    }
  } catch (error) {
    console.error("Error getting user progress:", error);
    return defaultUserProgress;
  }
};

// Update user progress
export const updateUserProgress = async (
  userId: string,
  progress: Partial<UserProgress>
): Promise<boolean> => {
  try {
    const progressRef = doc(db, "userProgress", userId);
    await updateDoc(progressRef, progress);
    return true;
  } catch (error) {
    console.error("Error updating user progress:", error);
    return false;
  }
};

// Add XP to user
export const addUserXP = async (
  userId: string,
  xpAmount: number,
  activityType: Activity["type"],
  activityTitle: string
): Promise<{ success: boolean; leveledUp: boolean; newLevel?: number }> => {
  try {
    // Get current progress
    const progress = await getUserProgress(userId);

    // Calculate new XP
    let newXP = progress.xp + xpAmount;
    let newLevel = progress.level;
    let newXpToNextLevel = progress.xpToNextLevel;
    let leveledUp = false;

    // Level up if needed
    while (newXP >= newXpToNextLevel) {
      newXP -= newXpToNextLevel;
      newLevel++;
      newXpToNextLevel = calculateXpForLevel(newLevel);
      leveledUp = true;
    }

    // Create new activity
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: activityType,
      title: activityTitle,
      timestamp: new Date().toISOString(),
      xpEarned: xpAmount,
    };

    // Update progress
    const updatedProgress = {
      xp: newXP,
      level: newLevel,
      xpToNextLevel: newXpToNextLevel,
      recentActivities: [newActivity, ...progress.recentActivities.slice(0, 9)],
    };

    // Save to firestore
    await updateUserProgress(userId, updatedProgress);

    return {
      success: true,
      leveledUp,
      newLevel: leveledUp ? newLevel : undefined,
    };
  } catch (error) {
    console.error("Error adding XP:", error);
    return { success: false, leveledUp: false };
  }
};

// Reset daily goals
export const resetDailyGoals = async (userId: string): Promise<boolean> => {
  try {
    // Get current progress
    const progress = await getUserProgress(userId);

    // Check if we need to reset (if date is different)
    const today = new Date().toISOString().split("T")[0];
    if (progress.lastStudyDate === today) {
      return true; // Already reset for today
    }

    // Reset goals
    const updatedProgress = {
      dailyGoals: getDefaultDailyGoals(),
      dailyGoalCompleted: false,
      lastStudyDate: today,
    };

    // Check if streak should be reset (if more than a day passed)
    const lastDate = new Date(progress.lastStudyDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      lastDate.toISOString().split("T")[0] !==
      yesterday.toISOString().split("T")[0]
    ) {
      // Reset streak if more than a day was missed
      updatedProgress["streak"] = 0;
    }

    // Save to firestore
    await updateUserProgress(userId, updatedProgress);
    return true;
  } catch (error) {
    console.error("Error resetting daily goals:", error);
    return false;
  }
};
