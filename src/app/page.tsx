"use client";

import type React from "react";
import Link from "next/link";
import {
  ChevronRight,
  BarChart2,
  Brain,
  PieChart,
  Check,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#1e1e2f] p-8 rounded-xl border border-purple-900/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(149,76,233,0.15)]">
      <div className="text-purple-500 mb-6">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <Link
        href="#"
        className="inline-flex items-center text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
      >
        Explore Feature <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

function PricingCard({
  title,
  price,
  features,
  ctaText,
  isPopular = false,
}: PricingCardProps) {
  return (
    <div
      className={`bg-[#1e1e2f] p-8 rounded-xl border ${
        isPopular
          ? "border-purple-500/50 shadow-[0_0_20px_rgba(149,76,233,0.2)]"
          : "border-purple-900/30"
      } relative`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-3xl font-bold text-white mb-2">{price}</p>
      <p className="text-gray-400 text-sm mb-6">per month</p>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-gray-300">
            <Check className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          isPopular
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(149,76,233,0.3)]"
            : "bg-[#2d2d3d] text-white hover:bg-[#34344a]"
        }`}
      >
        {ctaText}
      </button>
    </div>
  );
}

interface TestimonialCardProps {
  initials: string;
  name: string;
  role: string;
  quote: string;
  avatarColor?: string;
}

function TestimonialCard({
  initials,
  name,
  role,
  quote,
  avatarColor = "from-purple-600 to-indigo-600",
}: TestimonialCardProps) {
  return (
    <div className="bg-[#1e1e2f] p-6 rounded-xl border border-purple-900/30">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${avatarColor} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
        >
          {initials}
        </div>
        <div>
          <div className="mb-3 text-gray-300">
            <span className="text-purple-400 text-4xl leading-none font-serif">
              "
            </span>
            <p className="mt-1">{quote}</p>
          </div>
          <h4 className="font-bold text-white">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section className="my-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Get started with StudyPro in three simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600/20 via-indigo-600/50 to-purple-600/20 transform -translate-y-1/2 z-0"></div>

        {/* Step 1 */}
        <div className="bg-[#1e1e2f] p-8 rounded-xl border border-purple-900/30 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto">
            1
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Sign Up
          </h3>
          <p className="text-gray-400 text-center">
            Create your account in seconds and get immediate access to our
            AI-powered platform.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-[#1e1e2f] p-8 rounded-xl border border-purple-900/30 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto">
            2
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Choose Subject
          </h3>
          <p className="text-gray-400 text-center">
            Select the SAT subjects you want to focus on and let our AI analyze
            your strengths and weaknesses.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-[#1e1e2f] p-8 rounded-xl border border-purple-900/30 relative z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto">
            3
          </div>
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            Start Learning
          </h3>
          <p className="text-gray-400 text-center">
            Begin your personalized study journey with adaptive learning paths
            tailored to your goals.
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI tutoring work?",
      answer:
        "Our AI tutoring system analyzes your learning patterns, strengths, and weaknesses to create a personalized study plan. It adapts in real-time as you progress, focusing more on areas where you need improvement while ensuring comprehensive coverage of all SAT topics.",
    },
    {
      question: "Can I access StudyPro on mobile devices?",
      answer:
        "Yes! StudyPro is fully responsive and works on all devices including smartphones, tablets, laptops, and desktop computers. You can seamlessly switch between devices and your progress will always be synchronized.",
    },
    {
      question: "How much does StudyPro cost?",
      answer:
        "We offer flexible pricing plans starting at $9.99/month for our Basic plan. Our most popular Pro plan is $19.99/month and includes unlimited practice tests and advanced AI tutoring. We also offer special discounts for schools and educational institutions.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Absolutely. There are no long-term commitments required. You can cancel your subscription at any time with no questions asked, and you'll continue to have access until the end of your billing period.",
    },
    {
      question: "How much can I expect my SAT score to improve?",
      answer:
        "While results vary based on individual effort and starting point, our students see an average improvement of 150-200 points on their SAT scores. Some students have improved by 300+ points with consistent use of our platform.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about StudyPro
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className={`w-full text-left p-6 rounded-lg flex justify-between items-center ${
                openIndex === index
                  ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30"
                  : "bg-[#1e1e2f] hover:bg-[#252540]"
              } border border-purple-900/30 transition-all duration-200`}
            >
              <span className="font-bold text-white">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="h-5 w-5 text-purple-400" />
              ) : (
                <Plus className="h-5 w-5 text-purple-400" />
              )}
            </button>

            {openIndex === index && (
              <div className="bg-[#1e1e2f]/50 border border-t-0 border-purple-900/30 p-6 rounded-b-lg text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <div className="relative mt-24 mb-16 py-16 px-8 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 z-0"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 mix-blend-overlay z-0"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to transform your SAT scores?
        </h2>
        <p className="text-gray-300 mb-8">
          Join thousands of students who have already improved their scores with
          our AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/dashboard"
            className="bg-white text-purple-900 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Start Free Trial
          </a>
          <a
            href="#features"
            className="bg-purple-800/30 text-white border border-purple-500/30 hover:bg-purple-800/50 font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-purple-900/20 pt-12 pb-8 text-gray-400">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="text-white font-bold mb-4">StudyPro</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Press
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Webinars
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Community
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Connect</h4>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-purple-400 transition-colors"
              >
                Facebook
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm">
        <p>&copy; {new Date().getFullYear()} StudyPro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-[#121220] text-white min-h-screen">
      <style jsx global>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes floatAnimation {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulseAnimation {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.4;
          }
        }

        .animated-bg {
          background: linear-gradient(
            -45deg,
            #121220,
            #1e1e2f,
            #2d1a4d,
            #3a1a6f
          );
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
        }

        .floating-shape {
          animation: floatAnimation 6s ease-in-out infinite;
        }

        .pulse-shape {
          animation: pulseAnimation 4s ease-in-out infinite;
        }
      `}</style>

      <header className="border-b border-purple-900/20 py-4">
        <div className="container max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-600 to-indigo-600 mr-2"></div>
            <span className="font-bold text-xl">StudyPro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-gray-300 hover:text-white transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/signin"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Dashboard
            </Link>
          </nav>
          <button className="md:hidden text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Hero Section with Animation */}
        <section className="relative py-20 md:py-32 overflow-hidden animated-bg rounded-xl mt-8">
          {/* Animated shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-purple-600/10 floating-shape delay-0"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-indigo-600/10 floating-shape delay-100"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-500/10 floating-shape delay-200"></div>
          <div className="absolute top-2/3 left-1/4 w-20 h-20 rounded-full bg-indigo-500/10 floating-shape delay-300"></div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-purple-500/50 pulse-shape"></div>
          <div className="absolute bottom-1/3 right-1/3 w-6 h-6 rounded-full bg-indigo-500/50 pulse-shape delay-100"></div>
          <div className="absolute top-2/3 left-2/3 w-3 h-3 rounded-full bg-purple-400/50 pulse-shape delay-200"></div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Revolutionize Your SAT Prep
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white/80 mb-10">
              Unlock your potential with AI-powered learning. Personalized
              strategies, intelligent insights, and adaptive study plans
              tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <a
                href="/dashboard"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                Get Started - It's Free
              </a>
              <a
                href="#features"
                className="bg-[#1e1e2f]/80 text-white border border-purple-900/30 hover:border-purple-500/50 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="my-24">
          <HowItWorksSection />
        </section>

        {/* Features Section */}
        <section id="features" className="my-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Students and professionals use StudyPro for a range of tasks
              beyond traditional SAT prep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10" />}
              title="AI Study Plan"
              description="Dynamically generated roadmap that adapts to your unique learning style and performance."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10" />}
              title="Smart Tutoring"
              description="24/7 AI-powered tutor providing instant, contextual explanations and personalized support."
            />
            <FeatureCard
              icon={<PieChart className="h-10 w-10" />}
              title="Performance Analytics"
              description="Comprehensive insights and predictive analytics to track and boost your SAT preparation progress."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-[#1e1e2f] p-8 rounded-xl border border-purple-900/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Flashcards & Quizzes
              </h3>
              <p className="text-gray-400 mb-6">
                Review your notes with interactive flashcards and adaptive
                quizzes that focus on your weak areas.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#1e1e2f] p-8 rounded-xl border border-purple-900/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                AI Chat Assistant
              </h3>
              <p className="text-gray-400 mb-6">
                Chat with your AI tutor and get context-dependent answers to all
                your SAT prep questions.
              </p>
              <div className="flex items-center space-x-3 bg-[#2d2d3d] p-3 rounded-lg">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="bg-transparent border-none outline-none text-white flex-grow"
                  disabled
                />
                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium px-3 py-1 rounded">
                  Ask
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="my-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Flexible Pricing Plans
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose the perfect plan for your SAT preparation journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="$9.99"
              features={[
                "Basic Study Materials",
                "Limited Practice Tests",
                "Standard AI Tutor",
                "Email Support",
              ]}
              ctaText="Get Started"
            />
            <PricingCard
              title="Pro"
              price="$19.99"
              features={[
                "Comprehensive Study Materials",
                "Unlimited Practice Tests",
                "Advanced AI Tutor",
                "Performance Analytics",
                "Priority Support",
              ]}
              ctaText="Get Started"
              isPopular={true}
            />
            <PricingCard
              title="Enterprise"
              price="$49.99"
              features={[
                "All Pro Features",
                "Personal Mentor",
                "Priority Support",
                "Custom Learning Path",
                "Team Collaboration",
                "API Access",
              ]}
              ctaText="Contact Sales"
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="my-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Join 2,000,000+ learners
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real stories from students who transformed their SAT scores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              initials="JS"
              name="John Smith"
              role="High School Senior"
              quote="StudyPro's AI tutor helped me improve my SAT score by 200 points. The personalized study plan was a game-changer!"
              avatarColor="from-purple-600 to-indigo-600"
            />
            <TestimonialCard
              initials="EM"
              name="Emma Martinez"
              role="College Prep Student"
              quote="I was struggling with math, but the adaptive learning technology made complex problems feel manageable."
              avatarColor="from-pink-500 to-purple-600"
            />
            <TestimonialCard
              initials="TW"
              name="Tyler Wong"
              role="International Student"
              quote="The flashcards created by the AI helped me master vocabulary in record time. My verbal score improved dramatically!"
              avatarColor="from-indigo-500 to-blue-600"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FAQSection />
        </section>

        {/* CTA Section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
