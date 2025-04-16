import SubscriptionPlans from "@/components/SubscriptionPlans";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-[#121220] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Subscription & Monetization
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
              <div className="text-purple-500 mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Free Version
              </h2>
              <p className="text-gray-400">
                Access basic features to get started with your SAT/ACT
                preparation.
              </p>
            </div>
            <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30 shadow-lg shadow-purple-500/5">
              <div className="text-purple-500 mb-4">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-white">
                Premium Features
              </h2>
              <p className="text-gray-400">
                Unlock the full potential of our platform with advanced features
                and unlimited access.
              </p>
            </div>
          </div>
          <SubscriptionPlans />
        </div>
      </div>
    </div>
  );
}
