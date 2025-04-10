"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-lg p-6 mb-8 text-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Hey {user.displayName || user.email?.split("@")[0]}, ready to
                  crush your goals today?
                </h1>
                <p className="text-lg opacity-90">
                  You're making great progress! Keep up the momentum.
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
                <p className="flex items-center">
                  <span className="mr-2">🔥</span> 5-day streak! Take today's
                  5-min challenge.
                </p>
              </div>
            </div>
          </div>

          <DashboardCards />
        </div>
      </main>
    </div>
  );
}
