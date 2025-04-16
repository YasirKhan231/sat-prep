"use client";

import { useState } from "react";
import {
  Award,
  Star,
  Zap,
  Medal,
  Trophy,
  Clock,
  Flag,
  Target,
  BookOpen,
} from "lucide-react";
import { UserProgress } from "@/lib/schemas/userProgress";

interface UserAchievementsProps {
  userProgress: UserProgress;
}

// Achievement badges definition with unlock requirements
const achievementBadges = [
  {
    id: "streak_3",
    name: "Consistency Champion",
    description: "Maintain a 3-day study streak",
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    color: "from-yellow-600 to-orange-600",
    requirement: (progress: UserProgress) => progress.streak >= 3,
    rewardXp: 50,
  },
  {
    id: "streak_7",
    name: "Weekly Warrior",
    description: "Maintain a 7-day study streak",
    icon: <Star className="h-6 w-6 text-yellow-400" />,
    color: "from-yellow-500 to-amber-500",
    requirement: (progress: UserProgress) => progress.streak >= 7,
    rewardXp: 100,
  },
  {
    id: "level_5",
    name: "Rising Star",
    description: "Reach level 5",
    icon: <Award className="h-6 w-6 text-purple-400" />,
    color: "from-purple-600 to-indigo-600",
    requirement: (progress: UserProgress) => progress.level >= 5,
    rewardXp: 0,
  },
  {
    id: "level_10",
    name: "Knowledge Master",
    description: "Reach level 10",
    icon: <Trophy className="h-6 w-6 text-purple-400" />,
    color: "from-purple-500 to-indigo-500",
    requirement: (progress: UserProgress) => progress.level >= 10,
    rewardXp: 0,
  },
  {
    id: "goal_10",
    name: "Goal Getter",
    description: "Complete 10 daily goals",
    icon: <Target className="h-6 w-6 text-green-400" />,
    color: "from-green-600 to-emerald-600",
    requirement: (progress: UserProgress) => {
      // This would require a count of completed goals from user history
      // For simplicity, we're checking the level as a proxy
      return progress.level >= 3;
    },
    rewardXp: 25,
  },
  {
    id: "test_complete",
    name: "Test Taker",
    description: "Complete your first practice test",
    icon: <Flag className="h-6 w-6 text-blue-400" />,
    color: "from-blue-600 to-cyan-600",
    requirement: (progress: UserProgress) => {
      // Check if any activity exists with type 'practice'
      return progress.recentActivities.some((a) => a.type === "practice");
    },
    rewardXp: 30,
  },
  {
    id: "quiz_master",
    name: "Quiz Master",
    description: "Complete 5 quizzes",
    icon: <BookOpen className="h-6 w-6 text-blue-400" />,
    color: "from-blue-500 to-cyan-500",
    requirement: (progress: UserProgress) => {
      // Count quiz activities
      const quizCount = progress.recentActivities.filter(
        (a) => a.type === "quiz"
      ).length;
      return quizCount >= 5;
    },
    rewardXp: 40,
  },
  {
    id: "studious",
    name: "Studious",
    description: "Study for 7 consecutive days",
    icon: <Clock className="h-6 w-6 text-amber-400" />,
    color: "from-amber-600 to-orange-600",
    requirement: (progress: UserProgress) => progress.streak >= 7,
    rewardXp: 75,
  },
];

export default function UserAchievements({
  userProgress,
}: UserAchievementsProps) {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  // Count unlocked achievements
  const unlockedAchievements = achievementBadges.filter((badge) =>
    badge.requirement(userProgress)
  );

  const unlockedCount = unlockedAchievements.length;
  const totalCount = achievementBadges.length;

  return (
    <div className="bg-[#1e1e2f] rounded-xl shadow-lg overflow-hidden p-6 border border-purple-900/30">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Achievements & Badges</h2>
          <p className="text-gray-400 text-sm">
            {unlockedCount} of {totalCount} badges unlocked
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#252538] px-3 py-1.5 rounded-lg border border-purple-900/20">
          <Medal className="h-5 w-5 text-yellow-400" />
          <span className="font-medium">
            {unlockedCount} / {totalCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {achievementBadges.map((badge) => {
          const isUnlocked = badge.requirement(userProgress);

          return (
            <button
              key={badge.id}
              onClick={() =>
                setSelectedBadge(selectedBadge === badge.id ? null : badge.id)
              }
              className={`relative rounded-lg p-4 text-center transition-transform hover:scale-105 ${
                isUnlocked
                  ? `bg-gradient-to-br ${badge.color} border border-white/10`
                  : "bg-[#252538]/50 border border-purple-900/10 filter grayscale opacity-60"
              } ${selectedBadge === badge.id ? "ring-2 ring-white/30" : ""}`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isUnlocked ? "bg-[#1e1e2f]/80" : "bg-[#1e1e2f]"
                  }`}
                >
                  {badge.icon}
                </div>
                <h3 className="text-sm font-medium mb-1 line-clamp-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-300 opacity-80 line-clamp-2">
                  {badge.description}
                </p>

                {!isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <div className="bg-[#121220]/90 px-2 py-1 rounded text-xs font-medium">
                      Locked
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedBadge && (
        <div className="bg-[#252538] p-4 rounded-lg border border-purple-900/20">
          {(() => {
            const badge = achievementBadges.find((b) => b.id === selectedBadge);
            const isUnlocked = badge?.requirement(userProgress);

            if (!badge) return null;

            return (
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${
                    isUnlocked ? badge.color : "from-gray-700 to-gray-800"
                  }`}
                >
                  {badge.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium">{badge.name}</h3>
                  <p className="text-gray-400">{badge.description}</p>

                  {isUnlocked ? (
                    <div className="mt-2 flex items-center text-green-400">
                      <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                      <span className="text-sm">Unlocked</span>

                      {badge.rewardXp > 0 && (
                        <div className="ml-4 flex items-center gap-1 text-yellow-400">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm">+{badge.rewardXp} XP</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                      <span className="text-sm">
                        Locked - Keep studying to unlock
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
