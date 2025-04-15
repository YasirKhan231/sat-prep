"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#121220] text-white min-h-screen">
      {/* Header */}
      <header className="fixed w-full z-50 backdrop-blur-md bg-[#121220]/80 border-b border-purple-900/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <Link href="/" className="flex items-center group">
            <motion.svg
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path d="M13 19L22 12L13 5V19Z" fill="white" />
              <path d="M2 19L11 12L2 5V19Z" fill="white" fillOpacity="0.5" />
            </motion.svg>
            <span className="font-bold text-xl group-hover:text-purple-400 transition-colors">
              StudyPro
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/signin"
              className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all"
            >
              Start today - It's Free
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121220]">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 pt-32 relative z-10">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="md:w-1/2"
              >
                <h1 className="text-5xl md:text-5xl font-bold mb-6 leading-tight">
                  Learn faster...
                  <br />
                  <span className="text-5xl md:text-5xl">
                    like, a lot faster.
                  </span>
                </h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/signin"
                    className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-7 rounded-lg transition-all text-center"
                  >
                    Get Started - It's Free
                  </Link>
                </div>

                <p className="text-gray-300 text-lg mb-8">
                  Any audio, video, or PDF → Instant notes,
                  <br />
                  flashcards, quizzes, and chatbot.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="md:w-1/2 relative"
              >
                <div className="relative">
                  {/* Reduced purple glow intensity */}
                  <div className="absolute inset-0 w-full h-full bg-violet-600/20 rounded-3xl blur-xl transform scale-105"></div>

                  {/* Laptop screenshot */}
                  <div className="relative bg-violet-900/10 backdrop-blur-sm rounded-3xl p-5 border border-violet-500/10 shadow-lg">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <div className="bg-[#121220] border border-violet-500/10">
                        <div className="bg-[#121220] border-b border-gray-700 p-2 flex items-center space-x-1">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <div className="flex-1 flex justify-center">
                            <div className="h-4 bg-gray-800 rounded-full w-72 mx-auto"></div>
                          </div>
                        </div>
                        <div className="p-4 flex">
                          <div className="w-16 bg-[#18181f] p-2 rounded-lg mr-4 flex flex-col space-y-4">
                            <div className="h-8 w-8 bg-violet-600/20 rounded-full mx-auto"></div>
                            <div className="h-8 w-8 bg-gray-800 rounded-full mx-auto"></div>
                            <div className="h-8 w-8 bg-gray-800 rounded-full mx-auto"></div>
                            <div className="h-8 w-8 bg-gray-800 rounded-full mx-auto"></div>
                            <div className="h-8 w-8 bg-gray-800 rounded-full mx-auto"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                              <div className="h-6 bg-gray-800 rounded-full w-40"></div>
                              <div className="h-6 bg-gray-800 rounded-full w-16"></div>
                            </div>
                            <div className="text-center py-16">
                              <h3 className="text-xl font-medium text-white mb-2">
                                We're Creating Your Notes...
                              </h3>
                              <div className="h-2 bg-gray-800 rounded-full w-full mb-2">
                                <div className="h-2 bg-violet-600 rounded-full w-1/2"></div>
                              </div>
                              <p className="text-sm text-gray-400">
                                50% Completed
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-10 bg-[#121220] overflow-hidden">
          <div className="max-w-full">
            <div className="text-center mb-8">
              <h3 className="text-lg font-medium text-white">
                Trusted by students at 5,000+ colleges
              </h3>
            </div>

            <div className="relative w-full overflow-hidden">
              <div className="w-[200%] flex items-center animate-marquee">
                <div className="w-full flex items-center justify-evenly">
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      PRINCETON
                      <br />
                      UNIVERSITY
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      STANFORD
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      UNIVERSITY
                      <br />
                      OF OXFORD
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-bold tracking-widest text-xl">
                      MIT
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      TEXAS
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      Duke
                    </span>
                  </div>
                </div>
                <div className="w-full flex items-center justify-evenly">
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      PRINCETON
                      <br />
                      UNIVERSITY
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      STANFORD
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      UNIVERSITY
                      <br />
                      OF OXFORD
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-bold tracking-widest text-xl">
                      MIT
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      TEXAS
                    </span>
                  </div>
                  <div className="mx-8 px-6 py-4 text-gray-400 opacity-80">
                    <span className="font-serif text-lg font-semibold">
                      Duke
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section with reduced gradient */}
        <section
          id="testimonials"
          className="py-24 bg-gradient-to-t from-[#5E4497]/60 to-[#18181B]/90"
        >
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-4xl font-bold mb-6">
                Join 2,000,000+ learners.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Testimonial 1 */}
              <div className="bg-[#13131f] p-5 rounded-lg border-gray-800">
                <div className="">
                  <span className="text-5xl">"</span>
                </div>
                <p className="text-white text-sm mb-8">
                  I can focus on understanding concepts, not just jotting down
                  notes. It's like having a personal study assistant.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-red-600 flex items-center justify-center text-white mr-3">
                    MIT
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Sheryl Berge</h4>
                    <p className="text-gray-400 text-sm">
                      Physics Major at MIT
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#13131f] p-5 rounded-lg border-gray-800">
                <div className="">
                  <span className="text-5xl">"</span>
                </div>
                <p className="text-white text-sm mb-8">
                  Love how it generates quizzes from my lectures. Makes revising
                  so much more efficient and less stressful.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-orange-500 flex items-center justify-center text-white mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Kiehn Po</h4>
                    <p className="text-gray-400 text-sm">Princeton Student</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#13131f] p-5 rounded-lg border-gray-800">
                <div className="">
                  <span className="text-5xl">"</span>
                </div>
                <p className="text-white text-sm mb-8">
                  I love how it can take an article and break it into bite-sized
                  materials. Reading academic articles feels less daunting now.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-red-600 flex items-center justify-center text-white mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Peter Renolds</h4>
                    <p className="text-gray-400 text-sm">
                      Political Science Major
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-[#13131f] p-5 rounded-lg border-gray-800">
                <div className="">
                  <span className="text-5xl">"</span>
                </div>
                <p className="text-white text-sm mb-8">
                  The flashcards created are tailored to my learning style. It's
                  like the AI knows exactly what I need to study.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Yash Sharma</h4>
                    <p className="text-gray-400 text-sm">
                      Public Policy Student at Duke
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-[#13131f] p-5 rounded-lg border-gray-800">
                <div className="">
                  <span className="text-5xl">"</span>
                </div>
                <p className="text-white text-sm mb-8">
                  It turns my youtube binges into productive study sessions.
                  It's a game-changer.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-red-600 flex items-center justify-center text-white mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Presley Burghardt</h4>
                    <p className="text-gray-400 text-sm">
                      Premed student at Stanford
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-[#13131f] p-5 rounded-lg border-gray-800">
                <div className="">
                  <span className="text-5xl">"</span>
                </div>
                <p className="text-white text-sm mb-8">
                  I feel like I'm studying smarter, not harder. It's a boon for
                  anyone who values efficiency.
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center text-white mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Rithik Duvva</h4>
                    <p className="text-gray-400 text-sm">
                      Economics Major at Duke
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Plans Section with reduced gradient */}
        <section
          id="institutions"
          className="py-24 bg-gradient-to-b from-[#5E4497]/50 to-[#18181B] relative overflow-hidden"
        >
          <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-4xl font-bold mb-6 bg-clip-text bg-gradient-to-r text-white">
                Institutional Plans
              </h2>
              <p className="mb-10  max-w-2xl mx-auto text-gray-300">
                Purchase studypro for your classroom, club, department, or
                university. Improve learning outcomes at scale.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/signin"
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-md transition-all shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-0.5"
                >
                  Learn more
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[#121220] relative">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-4xl font-bold mb-5">Features</h2>
              <p className="mb-8 text-center text-gray-300 max-w-3xl mx-auto">
                Students and professionals use studypro for a range of tasks
                beyond notetaking.
              </p>
            </motion.div>

            <div className="border border-gray-800 rounded-lg overflow-hidden">
              {/* First row */}
              <div className="flex flex-col md:flex-row">
                {/* Beauty Feature */}
                <div className="bg-[#13131f] p-8 border-r border-b border-gray-800 md:w-3/5">
                  <h3 className="text-2xl font-bold text-white mb-2">Beauty</h3>
                  <p className="text-gray-300 mb-6">
                    Our notes include tables, diagrams, emojis, and equations.
                  </p>
                  <div className="bg-[#13131f] inline-block p-3">
                    <div className="text-white font-mono">
                      ρ(∂u/∂t + u·∇u) = -∇p + μ∇²u + f
                    </div>
                  </div>
                </div>

                {/* Multimodality Feature */}
                <div className="bg-[#13131f] p-8 border-b border-gray-800 md:w-2/5">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Multimodality
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Create notes from audio, video, or PDF.
                  </p>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3z"
                          fill="currentColor"
                        />
                        <path
                          d="M17 12c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">PDF</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second row */}
              <div className="flex flex-col md:flex-row">
                {/* Flashcards & Quizzes Feature */}
                <div className="bg-[#13131f] p-8 border-r border-gray-800 md:w-2/5">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Flashcards & Quizzes
                  </h3>
                  <p className="text-gray-300 mb-6">Review your notes.</p>
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <path
                          d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M9 15L4 15"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11 9L9 9"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M5 9L7 9"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M12 7V12L15 15"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Chat Feature */}
                <div className="bg-[#13131f] p-8 border-gray-800 md:w-3/5">
                  <h3 className="text-2xl font-bold text-white mb-2">Chat</h3>
                  <p className="text-gray-300 mb-6">
                    Chat with your upload and get context dependent answers.
                  </p>
                  <div className="flex">
                    <input
                      type="text"
                      defaultValue="Type your question here..."
                      className="w-full px-3 py-2 bg-gray-200 rounded-l-lg text-gray-800 focus:outline-none text-sm"
                    />
                    <button className="bg-violet-600 text-white px-3 py-2 rounded-r-lg">
                      <span className="px-2">ASK</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Description Section */}
        <section id="feature-details" className="py-24 bg-[#121220]">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                How StudyPro Works
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Our advanced AI technology transforms your learning materials
                into engaging, effective study tools.
              </p>
            </motion.div>

            {/* Feature 1: Text on left, video on right */}
            <div className="flex flex-col md:flex-row items-center gap-10 mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h3 className="text-3xl font-bold mb-4 text-purple-400">
                  Smart Content Processing
                </h3>
                <div className="h-1 w-20 bg-violet-600 mb-6"></div>
                <p className="text-gray-300 mb-4">
                  Our AI engine analyzes your content—whether it's a lecture
                  video, audio recording, or PDF document—and extracts the most
                  important concepts and information.
                </p>
                <p className="text-gray-300">
                  Using advanced natural language processing, we identify key
                  terms, relationships between concepts, and critical
                  information that you need to know for exams and assignments.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-1/2 relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-600/20 rounded-xl blur-xl transform scale-105"></div>
                  <div className="relative bg-[#13131f] rounded-xl overflow-hidden border border-violet-500/20">
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-gray-300 flex flex-col items-center">
                        <svg
                          className="w-20 h-20 text-violet-500 mb-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-lg">Smart Processing Demo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature 2: Video on left, text on right */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-10 mb-24">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h3 className="text-3xl font-bold mb-4 text-purple-400">
                  Personalized Study Materials
                </h3>
                <div className="h-1 w-20 bg-violet-600 mb-6"></div>
                <p className="text-gray-300 mb-4">
                  StudyPro generates custom study materials tailored to your
                  learning style and the content you're studying.
                </p>
                <p className="text-gray-300">
                  From concise notes that highlight key concepts to interactive
                  flashcards that test your knowledge, our platform creates the
                  perfect tools to help you master any subject efficiently.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-1/2 relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-600/20 rounded-xl blur-xl transform scale-105"></div>
                  <div className="relative bg-[#13131f] rounded-xl overflow-hidden border border-violet-500/20">
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-gray-300 flex flex-col items-center">
                        <svg
                          className="w-20 h-20 text-violet-500 mb-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-lg">Personalization Demo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature 3: Text on left, video on right */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="md:w-1/2"
              >
                <h3 className="text-3xl font-bold mb-4 text-purple-400">
                  AI-Powered Learning Assistant
                </h3>
                <div className="h-1 w-20 bg-violet-600 mb-6"></div>
                <p className="text-gray-300 mb-4">
                  Have questions about your course material? Our AI learning
                  assistant is available 24/7 to provide context-aware answers.
                </p>
                <p className="text-gray-300">
                  Unlike generic chatbots, our assistant has deep knowledge of
                  your specific materials, allowing for more relevant and
                  accurate assistance tailored to your coursework.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-1/2 relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-600/20 rounded-xl blur-xl transform scale-105"></div>
                  <div className="relative bg-[#13131f] rounded-xl overflow-hidden border border-violet-500/20">
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-gray-300 flex flex-col items-center">
                        <svg
                          className="w-20 h-20 text-violet-500 mb-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-lg">AI Assistant Demo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QR Code Section with reduced gradient */}
        <section className="bg-gradient-to-t pt-32 from-[#5E4497]/50 to-[#18181B] relative overflow-hidden">
          <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="py-1 px-2 text-xs text-gray-500">
              <div className="flex items-center justify-center text-white pb-8">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path d="M13 19L22 12L13 5V19Z" fill="white" />
                  <path
                    d="M2 19L11 12L2 5V19Z"
                    fill="white"
                    fillOpacity="0.5"
                  />
                </svg>
                <span className="font-medium text-lg">StudyPro </span>
              </div>
              {/* Links */}
              <div className="flex justify-center text-sm text-gray-400 space-x-8 pb-20">
                <a href="#" className="text-white transition-colors font-bold">
                  Terms of Service
                </a>
                <a href="#" className="text-white transition-colors font-bold">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
