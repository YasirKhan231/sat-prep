"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Check } from "lucide-react";

export default function SubscriptionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

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

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Get started with basic SAT preparation",
      features: [
        "Access to basic study materials",
        "Limited practice questions",
        "Basic progress tracking",
        "Community forum access",
      ],
      buttonText: "Current Plan",
      isCurrent: true,
    },
    {
      name: "Premium",
      price: "$19.99/month",
      description: "Unlock advanced features and full content access",
      features: [
        "All Basic features",
        "Unlimited practice questions",
        "Personalized study plans",
        "Advanced analytics",
        "AI-powered tutoring",
        "Live chat support",
      ],
      buttonText: "Upgrade Now",
      isCurrent: false,
      isPopular: true,
    },
    {
      name: "Ultimate",
      price: "$29.99/month",
      description: "Get the complete SAT preparation experience",
      features: [
        "All Premium features",
        "1-on-1 tutoring sessions",
        "Essay review service",
        "Priority support",
        "Score improvement guarantee",
        "Parent progress reports",
      ],
      buttonText: "Get Ultimate",
      isCurrent: false,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-400">
            Select the plan that best fits your SAT preparation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-[#1e1e2f] rounded-lg border ${
                plan.isPopular ? "border-purple-500" : "border-purple-900/30"
              } p-6 relative`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
                <div className="text-2xl font-bold text-purple-400 mb-2">
                  {plan.price}
                </div>
                <p className="text-sm text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-2 rounded-lg font-medium text-sm ${
                  plan.isCurrent
                    ? "bg-gray-600 cursor-default"
                    : plan.isPopular
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                    : "bg-[#252538] hover:bg-[#2d2d3d]"
                }`}
                disabled={plan.isCurrent}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
