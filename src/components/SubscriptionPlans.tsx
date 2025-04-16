"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, Rocket } from "lucide-react";

interface Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "premium";
}

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: "free",
      title: "Free Plan",
      price: "$0",
      features: [
        "Basic lessons",
        "Limited AI chat (5 messages/day)",
        "10 daily practice questions",
        "Basic progress tracking",
      ],
      buttonText: "Get Started",
      buttonVariant: "default",
    },
    {
      id: "premium",
      title: "Premium",
      price: "$19.99",
      features: [
        "Unlimited AI tutoring",
        "Full-length practice tests",
        "Advanced analytics & insights",
        "Priority feature access",
        "Unlimited practice questions",
        "Study bootcamps",
      ],
      isPopular: true,
      buttonText: "Upgrade Now",
      buttonVariant: "premium",
    },
  ];

 

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-[#1e1e2f] p-6 rounded-xl border ${
              plan.isPopular
                ? "border-purple-500 shadow-lg shadow-purple-500/10"
                : "border-purple-900/30"
            } relative`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
              <span className="text-2xl font-bold text-white">
                {plan.price}
              </span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <Check className="h-5 w-5 text-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                plan.buttonVariant === "premium"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  : "bg-[#2d2d3d] text-white hover:bg-[#32324a]"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6 text-white">
          One-Time Purchases
        </h3>
        
      </div>
    </div>
  );
}
