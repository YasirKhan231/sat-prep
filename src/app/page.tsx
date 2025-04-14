"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2.5 px-6 rounded-full transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121220]">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-600/20 blur-[120px] top-[-400px] left-[calc(50%-400px)]"></div>
            <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px] bottom-[-300px] right-[-200px]"></div>
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6 pt-32 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="md:w-1/2"
              >
                <div className="relative">
                  <div className="absolute -top-12 -left-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent flex items-center justify-center"
                    >
                      <span className="text-3xl">✨</span>
                    </motion.div>
                  </div>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                    Learn faster...
                  </span>
                  <br />
                  <span className="text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    like magic.
                  </span>
                </h1>
                <p className="text-gray-300 text-lg mb-8 max-w-xl leading-relaxed">
                  Transform any audio, video, or PDF into instant notes,
                  flashcards, quizzes, and an AI chatbot that revolutionizes
                  your learning experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link
                    href="/signin"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-7 rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 text-center"
                  >
                    Get Started - It's Free
                  </Link>
                  <Link
                    href="#watch-demo"
                    className="border border-purple-500/30 hover:border-purple-500/60 text-white font-medium py-3 px-7 rounded-xl transition-all hover:bg-purple-500/10 text-center flex items-center justify-center group"
                  >
                    <svg
                      className="w-5 h-5 mr-2 group-hover:text-purple-400 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path>
                    </svg>
                    Watch Demo
                  </Link>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-[#121220]"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-[#121220]"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/2.jpg"
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-[#121220]"
                    />
                  </div>
                  <p className="text-gray-400">
                    Joined by{" "}
                    <span className="text-purple-400 font-medium">
                      2 million+
                    </span>{" "}
                    students
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="md:w-1/2 relative"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-600/20 to-transparent rounded-full blur-2xl"></div>

                <div className="bg-gradient-to-br from-purple-700/30 to-indigo-700/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(149,76,233,0.2)] backdrop-blur-sm">
                  <div className="rounded-xl overflow-hidden border border-purple-500/30 shadow-[0_0_30px_rgba(149,76,233,0.15)]">
                    <div className="aspect-[4/3] bg-[#1e1e2f] flex items-start justify-start relative">
                      <div className="absolute top-0 left-0 right-0 h-10 bg-[#13131f] flex items-center px-4 border-b border-purple-500/20">
                        <div className="flex space-x-2 mr-4">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="w-48 h-5 bg-gray-700/50 rounded-full"></div>
                      </div>

                      <div className="mt-12 p-6 w-full">
                        <div className="flex mb-4">
                          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                            AI
                          </div>
                          <div className="bg-[#262636] p-3 rounded-lg rounded-tl-none max-w-xs">
                            <p className="text-sm text-white">
                              I've analyzed your lecture on quantum mechanics.
                              Here are the key concepts:
                            </p>
                          </div>
                        </div>

                        <div className="bg-[#262636] p-3 mb-4 rounded-lg w-full">
                          <div className="h-4 w-3/4 bg-purple-500/20 rounded-full mb-2"></div>
                          <div className="h-4 w-full bg-purple-500/20 rounded-full mb-2"></div>
                          <div className="h-4 w-1/2 bg-purple-500/20 rounded-full"></div>
                        </div>

                        <div className="flex mb-4 justify-end">
                          <div className="bg-purple-600 p-3 rounded-lg rounded-tr-none max-w-xs">
                            <p className="text-sm text-white">
                              Can you create flashcards about wave functions?
                            </p>
                          </div>
                        </div>

                        <div className="flex">
                          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                            AI
                          </div>
                          <div className="bg-[#262636] p-3 rounded-lg rounded-tl-none flex-1">
                            <div className="h-4 w-3/4 bg-purple-500/20 rounded-full mb-2"></div>
                            <div className="h-4 w-1/2 bg-purple-500/20 rounded-full"></div>
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
        <section className="bg-gradient-to-b from-[#121220] to-black py-16">
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-center text-xl mb-10 text-white">
                <span className="inline-block px-4 py-1 bg-purple-900/30 rounded-full text-purple-300 font-medium mb-3">
                  TRUSTED WORLDWIDE
                </span>
                <br />
                <span className="text-2xl">
                  Trusted by students at 5,000+ colleges
                </span>
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-gray-300 font-serif text-lg">
                    PRINCETON UNIVERSITY
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-gray-300 text-lg font-bold">
                    STANFORD
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-gray-300 text-lg">
                    UNIVERSITY OF OXFORD
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-gray-300 text-lg font-bold tracking-widest">
                    MIT
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-gray-300 text-lg font-bold">TEXAS</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 px-8 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <span className="text-gray-300 text-lg font-bold">Duke</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-24 bg-gradient-to-b from-[#121220] via-[#1a1a2e] to-[#262650]"
        >
          <div className="container max-w-7xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-purple-900/30 rounded-full text-purple-300 font-medium mb-3">
                TESTIMONIALS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                Join 2,000,000+ learners.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 shadow-lg hover:shadow-purple-500/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-red-700/20">
                    MIT
                  </div>
                  <div>
                    <div className="mb-3 text-gray-300">
                      <span className="text-purple-400 text-4xl leading-none font-serif">
                        "
                      </span>
                      <p className="mt-1 text-lg">
                        I can focus on understanding concepts, not just jotting
                        down notes. It's like having a personal study assistant.
                      </p>
                    </div>
                    <h4 className="font-bold text-white">Sheryl Berge</h4>
                    <p className="text-purple-300 text-sm">
                      Physics Major at MIT
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 shadow-lg hover:shadow-purple-500/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-orange-600/20">
                    P
                  </div>
                  <div>
                    <div className="mb-3 text-gray-300">
                      <span className="text-purple-400 text-4xl leading-none font-serif">
                        "
                      </span>
                      <p className="mt-1 text-lg">
                        Love how it generates quizzes from my lectures. Makes
                        revising so much more efficient and less stressful.
                      </p>
                    </div>
                    <h4 className="font-bold text-white">Kiehn Po</h4>
                    <p className="text-purple-300 text-sm">Princeton Student</p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 shadow-lg hover:shadow-purple-500/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-red-700/20">
                    S
                  </div>
                  <div>
                    <div className="mb-3 text-gray-300">
                      <span className="text-purple-400 text-4xl leading-none font-serif">
                        "
                      </span>
                      <p className="mt-1 text-lg">
                        I love how it can take an article and break it into
                        bite-sized materials. Reading academic articles feels
                        less daunting now.
                      </p>
                    </div>
                    <h4 className="font-bold text-white">Peter Renolds</h4>
                    <p className="text-purple-300 text-sm">
                      Political Science Major
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 shadow-lg hover:shadow-purple-500/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-blue-700/20">
                    D
                  </div>
                  <div>
                    <div className="mb-3 text-gray-300">
                      <span className="text-purple-400 text-4xl leading-none font-serif">
                        "
                      </span>
                      <p className="mt-1 text-lg">
                        The flashcards created are tailored to my learning
                        style. It's like the AI knows exactly what I need to
                        study.
                      </p>
                    </div>
                    <h4 className="font-bold text-white">Yash Sharma</h4>
                    <p className="text-purple-300 text-sm">
                      Public Policy Student at Duke
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 shadow-lg hover:shadow-purple-500/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-red-700/20">
                    S
                  </div>
                  <div>
                    <div className="mb-3 text-gray-300">
                      <span className="text-purple-400 text-4xl leading-none font-serif">
                        "
                      </span>
                      <p className="mt-1 text-lg">
                        It turns my youtube binges into productive study
                        sessions. It's a game-changer.
                      </p>
                    </div>
                    <h4 className="font-bold text-white">Presley Burghardt</h4>
                    <p className="text-purple-300 text-sm">
                      Premed student at Stanford
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 shadow-lg hover:shadow-purple-500/10 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-blue-700/20">
                    D
                  </div>
                  <div>
                    <div className="mb-3 text-gray-300">
                      <span className="text-purple-400 text-4xl leading-none font-serif">
                        "
                      </span>
                      <p className="mt-1 text-lg">
                        I feel like I'm studying smarter, not harder. It's a
                        boon for anyone who values efficiency.
                      </p>
                    </div>
                    <h4 className="font-bold text-white">Rithik Duvva</h4>
                    <p className="text-purple-300 text-sm">
                      Economics Major at Duke
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Institutional Plans Section */}
        <section
          id="institutions"
          className="py-24 bg-gradient-to-b from-[#262650] to-[#121220] relative overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600 blur-[150px] -top-[250px] -left-[100px]"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-600 blur-[150px] -bottom-[200px] -right-[100px]"></div>
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-purple-900/30 rounded-full text-purple-300 font-medium mb-3">
                FOR INSTITUTIONS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                Institutional Plans
              </h2>
              <p className="mb-10 text-xl max-w-2xl mx-auto text-gray-300">
                Purchase turbolearn for your classroom, club, department, or
                university. Improve learning outcomes at scale.
              </p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Link
                  href="/signin"
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-md transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
                >
                  Learn more
                </Link>
                <Link
                  href="/signin"
                  className="inline-block border border-purple-500/30 hover:border-purple-500/60 text-white font-medium py-3 px-8 rounded-md transition-all hover:bg-purple-500/10"
                >
                  Contact sales
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-[#1e1e2f]/70 backdrop-blur-sm p-6 rounded-xl border border-purple-900/30">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 mb-4 mx-auto">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Classrooms
                  </h3>
                  <p className="text-gray-400">
                    Empower students with AI-assisted learning tools
                  </p>
                </div>

                <div className="bg-[#1e1e2f]/70 backdrop-blur-sm p-6 rounded-xl border border-purple-900/30">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 mb-4 mx-auto">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Departments
                  </h3>
                  <p className="text-gray-400">
                    Scale learning solutions across multiple courses
                  </p>
                </div>

                <div className="bg-[#1e1e2f]/70 backdrop-blur-sm p-6 rounded-xl border border-purple-900/30">
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 mb-4 mx-auto">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Universities
                  </h3>
                  <p className="text-gray-400">
                    Campus-wide solutions with enterprise features
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-[#121220] relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600 blur-[150px] top-[10%] right-[5%]"></div>
            <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-600 blur-[150px] bottom-[10%] left-[5%]"></div>
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 bg-purple-900/30 rounded-full text-purple-300 font-medium mb-3 text-sm">
                POWERFUL FEATURES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                Everything you need to excel
              </h2>
              <p className="mb-8 text-center text-lg text-gray-400 max-w-3xl mx-auto">
                Students and professionals use Turbolearn for a range of tasks
                beyond notetaking. Transform content into knowledge.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beauty Feature */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 hover:border-purple-500/40 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Beauty
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-5 text-gray-300">
                  Our notes include tables, diagrams, emojis, and equations —
                  beautifully formatted for optimal learning.
                </p>
                <div className="bg-[#12121e] rounded-lg p-4 border border-purple-900/20 shadow-inner">
                  <div className="text-white font-mono flex items-center justify-center overflow-x-auto py-3">
                    <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                      ρ(∂u/∂t + u·∇u) = -∇p + μ∇²u + f
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Multimodality Feature */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 hover:border-purple-500/40 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Multimodality
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-5 text-gray-300">
                  Create notes from audio, video, or PDF. Process any learning
                  material in the format you prefer.
                </p>
                <div className="flex gap-3 justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg shadow-red-600/20 transform transition-transform hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current text-white"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/20 transform transition-transform hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current text-white"
                    >
                      <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
                    </svg>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20 transform transition-transform hover:scale-105">
                    <div className="text-white font-bold text-sm">PDF</div>
                  </div>
                </div>
              </motion.div>

              {/* Flashcards & Quizzes Feature */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 hover:border-purple-500/40 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Flashcards & Quizzes
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-5 text-gray-300">
                  Automatically generate flashcards and quizzes to test your
                  knowledge and reinforce learning.
                </p>
                <div className="flex flex-col gap-2">
                  <div className="w-full h-14 bg-[#12121e] rounded-lg flex items-center justify-center px-4 border border-purple-900/20 shadow-inner group-hover:border-purple-500/20 transition-all">
                    <span className="text-purple-300 font-medium text-sm">
                      What is Bernoulli's principle?
                    </span>
                  </div>
                  <div className="w-full h-9 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center cursor-pointer transform hover:translate-y-[-2px] transition-transform">
                    <span className="text-white font-medium text-sm">
                      Check Answer
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Chat Feature */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a45] p-6 rounded-xl border border-purple-900/30 hover:border-purple-500/40 shadow-lg shadow-purple-500/5 hover:shadow-purple-500/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Chat
                  </h3>
                  <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <p className="mb-5 text-gray-300">
                  Chat with your uploads and get context-dependent answers to
                  deepen your understanding.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything about your notes..."
                    className="w-full px-3 py-2 bg-[#12121e] rounded-lg border border-purple-900/30 text-gray-300 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                    disabled
                  />
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-2 rounded-lg shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11h4a1 1 0 00.943-1.332l-3-7z"></path>
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="py-24 bg-gradient-to-b from-[#121220] to-[#21215a] relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600 blur-[150px] -top-[250px] left-[20%]"></div>
            <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-600 blur-[100px] bottom-[-100px] right-[10%]"></div>
          </div>

          <div className="container max-w-7xl mx-auto px-4 md:px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-purple-900/30 rounded-full text-purple-300 font-medium mb-3">
                GET STARTED
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white">
                Scan to Try It Now
              </h2>

              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block bg-white p-6 rounded-xl shadow-[0_0_40px_rgba(149,76,233,0.4)] mb-8"
              >
                <div className="w-56 h-56 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center rounded-lg">
                  <div className="w-52 h-52 bg-white flex items-center justify-center rounded-md">
                    <div className="text-gray-700 font-bold text-lg">
                      QR Code
                    </div>
                  </div>
                </div>
              </motion.div>

              <p className="text-gray-300 max-w-md mx-auto">
                Scan with your phone camera or click the button below to get
                started with turbolearn today
              </p>

              <div className="mt-6">
                <Link
                  href="/signin"
                  className="inline-block bg-white text-purple-700 font-medium py-3 px-8 rounded-md transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-0.5"
                >
                  Start Learning
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#21215a] py-12">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center mb-6">
                <svg
                  width="28"
                  height="28"
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
                <span className="font-bold text-xl">StudyPro</span>
              </Link>
              <p className="text-gray-400 mb-4">
                Transform any content into effective learning materials with the
                power of AI.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-1">
              <h3 className="text-white font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Institutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <h3 className="text-white font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-purple-900/30 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2023 StudyPro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
