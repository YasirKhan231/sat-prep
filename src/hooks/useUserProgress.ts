"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { addUserXP } from "@/lib/services/userService";

interface ProgressUpdates {
  xp?: number; // XP to add
  dailyGoals?: {
    reading?: boolean;
    math?: boolean;
    writing?: boolean;
  };
  questionsAnswered?: {
    correct: number;
    incorrect: number;
  };
}

/**
 * Custom hook to manage and update user progress with minimal Firestore calls
 * by batching updates and debouncing write operations
 */
export function useUserProgress() {
  const { user, userData, loading, userDataLoading } = useAuth();
  const [pendingUpdates, setPendingUpdates] = useState<ProgressUpdates>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any pending timeouts when unmounting
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Schedules an update to the user's progress
   * Updates are batched and written to Firestore after a delay
   */
  const scheduleUpdate = (updates: ProgressUpdates) => {
    setPendingUpdates((prev) => {
      const newUpdates = { ...prev };

      // Merge XP
      if (updates.xp) {
        newUpdates.xp = (newUpdates.xp || 0) + updates.xp;
      }

      // Merge daily goals
      if (updates.dailyGoals) {
        newUpdates.dailyGoals = {
          ...newUpdates.dailyGoals,
          ...updates.dailyGoals,
        };
      }

      // Merge questions answered
      if (updates.questionsAnswered) {
        if (!newUpdates.questionsAnswered) {
          newUpdates.questionsAnswered = {
            correct: 0,
            incorrect: 0,
          };
        }

        newUpdates.questionsAnswered.correct +=
          updates.questionsAnswered.correct;
        newUpdates.questionsAnswered.incorrect +=
          updates.questionsAnswered.incorrect;
      }

      return newUpdates;
    });

    // Schedule the actual update with debouncing (wait 5 seconds after last update)
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      commitUpdates();
    }, 5000);
  };

  /**
   * Force immediate update to Firestore
   */
  const commitUpdates = async () => {
    if (!user || isUpdating || Object.keys(pendingUpdates).length === 0) {
      return;
    }

    setIsUpdating(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const updates: Record<string, any> = {
        updatedAt: serverTimestamp(),
        lastActive: serverTimestamp(),
      };

      // Handle daily goals update
      if (pendingUpdates.dailyGoals && userData) {
        const newDailyGoals = {
          ...userData.dailyGoals,
          ...pendingUpdates.dailyGoals,
        };

        // Check if all goals completed for streak
        const allGoalsCompleted = Object.values(newDailyGoals).every(Boolean);

        // Check if it's a new day compared to last active
        const lastActive = userData.lastActive.toDate();
        const today = new Date();
        const isNewDay =
          lastActive.getDate() !== today.getDate() ||
          lastActive.getMonth() !== today.getMonth() ||
          lastActive.getFullYear() !== today.getFullYear();

        // Update streak if needed
        if (isNewDay) {
          let newStreak = userData.streak;
          if (allGoalsCompleted) {
            newStreak += 1;
            updates.streak = newStreak;
          } else {
            updates.streak = 0;
          }
        }

        updates.dailyGoals = newDailyGoals;
      }

      // Handle questions answered
      if (pendingUpdates.questionsAnswered) {
        // Update total answered and correct rate
        if (!userData?.progressMetrics) {
          updates.progressMetrics = {
            totalQuestionsAnswered:
              pendingUpdates.questionsAnswered.correct +
              pendingUpdates.questionsAnswered.incorrect,
            correctAnswerRate:
              pendingUpdates.questionsAnswered.correct /
              (pendingUpdates.questionsAnswered.correct +
                pendingUpdates.questionsAnswered.incorrect),
            weakestTopics: [],
            strongestTopics: [],
          };
        } else {
          const totalAnswered =
            userData.progressMetrics.totalQuestionsAnswered +
            pendingUpdates.questionsAnswered.correct +
            pendingUpdates.questionsAnswered.incorrect;

          const correctAnswers =
            userData.progressMetrics.correctAnswerRate *
              userData.progressMetrics.totalQuestionsAnswered +
            pendingUpdates.questionsAnswered.correct;

          updates["progressMetrics.totalQuestionsAnswered"] = totalAnswered;
          updates["progressMetrics.correctAnswerRate"] =
            correctAnswers / totalAnswered;
        }
      }

      // Perform the Firestore update
      await updateDoc(userRef, updates);

      // Handle XP separately to ensure level ups are processed
      if (pendingUpdates.xp && pendingUpdates.xp > 0) {
        await addUserXP(user.uid, pendingUpdates.xp);
      }

      // Clear the pending updates
      setPendingUpdates({});
    } catch (error) {
      console.error("Error updating user progress:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Update the user's XP
   */
  const addXP = (amount: number) => {
    scheduleUpdate({ xp: amount });
  };

  /**
   * Update daily goals
   */
  const updateDailyGoals = (goals: ProgressUpdates["dailyGoals"]) => {
    scheduleUpdate({ dailyGoals: goals });
  };

  /**
   * Track answered questions
   */
  const recordAnsweredQuestion = (isCorrect: boolean) => {
    scheduleUpdate({
      questionsAnswered: {
        correct: isCorrect ? 1 : 0,
        incorrect: isCorrect ? 0 : 1,
      },
      xp: isCorrect ? 5 : 1, // Give XP for trying, more for correct answers
    });
  };

  return {
    userData,
    loading: loading || userDataLoading,
    isUpdating,
    addXP,
    updateDailyGoals,
    recordAnsweredQuestion,
    commitUpdates, // Force immediate update
  };
}
