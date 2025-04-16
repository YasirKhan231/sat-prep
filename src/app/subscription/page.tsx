import Link from "next/link";
import { Check, X } from "lucide-react";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-[#121220] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Upgrade Your SAT Preparation
          </h1>
          <p className="text-xl text-gray-300">
            Get unlimited access to AI-powered SAT training tools and
            personalized study plans
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-[#1E1E2E] rounded-lg shadow-xl p-8 border border-gray-700 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">Free</h2>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-extrabold text-white">$0</span>
              <span className="text-gray-400 ml-2">/forever</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Limited question bank access
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">1 simulated SAT exam</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Basic performance tracking
                </span>
              </li>
              <li className="flex items-start">
                <X className="h-6 w-6 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  AI explanations and tutoring
                </span>
              </li>
              <li className="flex items-start">
                <X className="h-6 w-6 text-red-400 mr-2 flex-shrink-0" />
                <span className="text-gray-400">Personalized study plans</span>
              </li>
            </ul>

            <button className="w-full px-4 py-3 border border-gray-600 text-white rounded-md hover:bg-[#2A2A3A] transition-colors">
              Current Plan
            </button>
          </div>

          {/* Weekly Access Plan */}
          <div className="bg-[#1E1E2E] rounded-lg shadow-xl p-8 border border-indigo-500 flex flex-col relative">
            <div className="absolute -top-4 right-4">
              <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                POPULAR
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Weekly Access
            </h2>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-extrabold text-white">$19.99</span>
              <span className="text-gray-400 ml-2">/week</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Full question bank access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Unlimited simulated SAT exams
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Advanced analytics & progress tracking
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  AI explanations and tutoring
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Personalized study plans</span>
              </li>
            </ul>

            <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium">
              Subscribe Weekly
            </button>
          </div>

          {/* Full Access Plan */}
          <div className="bg-[#1E1E2E] rounded-lg shadow-xl p-8 border border-gray-700 flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-2">Full Access</h2>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-extrabold text-white">$199</span>
              <span className="text-gray-400 ml-2">/one-time</span>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Full question bank access</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Unlimited simulated SAT exams
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  Advanced analytics & progress tracking
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">
                  AI explanations and tutoring
                </span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Personalized study plans</span>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-green-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">Lifetime access</span>
              </li>
            </ul>

            <button className="w-full px-4 py-3 bg-[#2A2A3A] text-white rounded-md hover:bg-[#353545] transition-colors font-medium">
              Pay Once
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            100% Satisfaction Guarantee
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            If you're not satisfied with your subscription within the first 7
            days, we'll provide a full refund. No questions asked.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
