"use client";

import { useEffect, useState } from "react";
import { Award, Sparkles, X, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
  rewards?: {
    xpBonus?: number;
    newFeature?: string;
    badge?: string;
  };
}

export default function LevelUpModal({
  level,
  onClose,
  rewards,
}: LevelUpModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // Level benefits by level
  const levelBenefits: Record<number, string[]> = {
    2: ["Unlock 5-minute quick quizzes", "Earn 10% more XP from daily goals"],
    3: ["Unlock achievement badges", "Earn streak multipliers"],
    4: ["Access to advanced practice tests", "Custom study reminders"],
    5: ["Unlock AI tutor features", "Weekly progress reports"],
    10: ["Unlock all premium features", "Special badge: Knowledge Master"],
  };

  // Get benefits for this level
  const benefits = levelBenefits[level] || [
    "Increased XP earning potential",
    "Access to more challenging content",
  ];

  useEffect(() => {
    setMounted(true);

    // Play level up sound
    const audio = new Audio("/sounds/level-up.mp3");
    audio.volume = 0.7;
    audio.play().catch((e) => console.log("Audio failed to play:", e));

    // Auto-close after 8 seconds if still open
    const timeout = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
    }, 500); // Match animation duration
  };

  if (!mounted) return null;

  // Use createPortal to render at the root level of the document
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        animateOut ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative bg-gradient-to-b from-[#1e1e2f] to-[#121220] rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_35px_rgba(149,76,233,0.25)] max-w-md w-full ${
          animateOut ? "animate-scale-out" : "animate-scale-in"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-[#252538] text-gray-400 hover:text-white hover:bg-[#32324a] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="p-6 pt-10">
          {/* Sparkles animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7 + 0.3,
                  animation: `float ${Math.random() * 4 + 3}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Level up icon */}
          <div className="relative flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Award className="h-12 w-12 text-white" />

              {/* Animated sparkles */}
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -left-2">
                <Sparkles
                  className="h-6 w-6 text-yellow-400 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>
            </div>
          </div>

          {/* Level up text */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Level Up!</h2>
            <div className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent text-4xl font-bold mb-3">
              Level {level}
            </div>
            <p className="text-gray-300">
              Congratulations! You've reached a new level in your study journey.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-[#252538] rounded-lg p-4 mb-6 border border-purple-900/20">
            <h3 className="font-medium text-gray-200 mb-2">
              New Benefits Unlocked:
            </h3>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <ChevronRight className="h-5 w-5 text-purple-400 mr-2 flex-shrink-0 mt-px" />
                  <span>{benefit}</span>
                </li>
              ))}

              {rewards?.xpBonus && (
                <li className="flex items-start text-yellow-300">
                  <ChevronRight className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0 mt-px" />
                  <span>XP Bonus: +{rewards.xpBonus} XP</span>
                </li>
              )}

              {rewards?.badge && (
                <li className="flex items-start text-indigo-300">
                  <ChevronRight className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0 mt-px" />
                  <span>New Badge: {rewards.badge}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Continue button */}
          <button
            onClick={handleClose}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all font-medium shadow-md hover:shadow-purple-500/20"
          >
            Continue Studying
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(0.8);
            opacity: 0.5;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scale-out {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.9);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        .animate-fade-out {
          animation: fade-out 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-scale-out {
          animation: scale-out 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>,
    document.body
  );
}
