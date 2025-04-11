// app/study-plan/page.tsx
"use client";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

type Plan = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  duration?: string;
  intensity?: string;
  mockTests?: string;
  dailyStudy?: string;
};

type Task = {
  id: string;
  type?: "reading" | "math" | "writing";
  title: string;
  duration: string;
};

type Day = {
  name: string;
  tasks: Task[];
};

const plansData: Plan[] = [
  {
    id: "fast-track",
    emoji: "🚀",
    title: "Fast Track Plan",
    description: "2 Weeks to Go",
    duration: "2 weeks",
    intensity: "High",
    mockTests: "1-2 per week",
    dailyStudy: "3-4 hours",
  },
  {
    id: "slow-steady",
    emoji: "🐢",
    title: "Slow & Steady Plan",
    description: "3 Months Prep",
    duration: "3 months",
    intensity: "Medium",
    mockTests: "1 per 2 weeks",
    dailyStudy: "1-2 hours",
  },
  {
    id: "weekend-warrior",
    emoji: "🏋️",
    title: "Weekend Warrior",
    description: "Busy Weekdays",
    duration: "2 months",
    intensity: "Medium",
    mockTests: "1 per week",
    dailyStudy: "4-5 hours (weekends)",
  },
  {
    id: "section-focused",
    emoji: "🎯",
    title: "Section-Focused Plan",
    description: "Target Weak Areas",
    duration: "6 weeks",
    intensity: "High",
    mockTests: "1 per week",
    dailyStudy: "2-3 hours",
  },
  {
    id: "early-bird",
    emoji: "🕰",
    title: "Early Bird Plan",
    description: "6+ Months Prep",
    duration: "6 months",
    intensity: "Low",
    mockTests: "1 per month",
    dailyStudy: "1 hour",
  },
  {
    id: "mock-test-master",
    emoji: "📝",
    title: "Mock Test Master Plan",
    description: "Learn by Practice Tests",
    duration: "4 weeks",
    intensity: "Very High",
    mockTests: "3 per week",
    dailyStudy: "4-5 hours",
  },
  {
    id: "night-owl",
    emoji: "🌙",
    title: "Night Owl Plan",
    description: "Late Night Study",
    duration: "8 weeks",
    intensity: "Medium",
    mockTests: "1 per week",
    dailyStudy: "2-3 hours (evenings)",
  },
  {
    id: "visual-learner",
    emoji: "🎨",
    title: "Visual Learner Plan",
    description: "Hate Text, Love Videos",
    duration: "5 weeks",
    intensity: "Medium",
    mockTests: "1 per week",
    dailyStudy: "2 hours",
  },
  {
    id: "score-booster",
    emoji: "🔥",
    title: "Score Booster Plan",
    description: "Gain 100+ Points Fast",
    duration: "3 weeks",
    intensity: "Very High",
    mockTests: "2 per week",
    dailyStudy: "4 hours",
  },
  {
    id: "minimalist",
    emoji: "😴",
    title: "Minimalist Plan",
    description: "Do Bare Minimum",
    duration: "4 weeks",
    intensity: "Low",
    mockTests: "1 total",
    dailyStudy: "30 minutes",
  },
];

const sampleWeek: Day[] = [
  {
    name: "Monday",
    tasks: [
      {
        id: "1",
        type: "reading",
        title: "Reading: Literary Passage",
        duration: "45m",
      },
      {
        id: "2",
        type: "math",
        title: "Math: Algebraic Expressions",
        duration: "30m",
      },
      {
        id: "3",
        type: "writing",
        title: "Writing: Standard English Conventions",
        duration: "30m",
      },
    ],
  },
  {
    name: "Tuesday",
    tasks: [
      {
        id: "4",
        type: "reading",
        title: "Reading: Science Passage",
        duration: "45m",
      },
      {
        id: "5",
        type: "math",
        title: "Math: Problem Solving",
        duration: "45m",
      },
      {
        id: "6",
        type: "writing",
        title: "Writing: Expression of Ideas",
        duration: "30m",
      },
    ],
  },
  {
    name: "Wednesday",
    tasks: [
      {
        id: "7",
        type: "reading",
        title: "Reading: Historical Documents",
        duration: "45m",
      },
      { id: "8", type: "math", title: "Math: Advanced Math", duration: "45m" },
      {
        id: "9",
        type: "writing",
        title: "Writing: Command of Evidence",
        duration: "30m",
      },
    ],
  },
  {
    name: "Thursday",
    tasks: [
      {
        id: "10",
        type: "reading",
        title: "Reading: Paired Passages",
        duration: "60m",
      },
      {
        id: "11",
        type: "math",
        title: "Math: Geometry & Trigonometry",
        duration: "45m",
      },
    ],
  },
  {
    name: "Friday",
    tasks: [
      {
        id: "12",
        type: "reading",
        title: "Reading: Social Science",
        duration: "45m",
      },
      { id: "13", type: "math", title: "Math: Data Analysis", duration: "45m" },
      {
        id: "14",
        type: "writing",
        title: "Writing: Full Section Practice",
        duration: "35m",
      },
    ],
  },
  {
    name: "Saturday",
    tasks: [
      { id: "15", title: "Full Mock Test #1", duration: "3h" },
      { id: "16", title: "Review & Error Analysis", duration: "2h" },
    ],
  },
  {
    name: "Sunday",
    tasks: [
      { id: "17", title: "Strategic Review", duration: "2h" },
      { id: "18", title: "Practice Weak Areas", duration: "2h" },
    ],
  },
];

const weekViewTasks = [
  {
    day: "Monday",
    tasks: [
      {
        id: "1",
        type: "reading",
        title: "Reading Comprehension: Literary Analysis",
        duration: "45m",
      },
      {
        id: "2",
        type: "math",
        title: "Math No-Calculator: Equations",
        duration: "30m",
      },
      {
        id: "3",
        type: "writing",
        title: "Grammar & Writing: Punctuation",
        duration: "30m",
      },
    ],
  },
  // ... other days same as sampleWeek
];

export default function StudyPlanSystem() {
  const [currentView, setCurrentView] = useState<
    "selection" | "detail" | "dashboard" | "customization"
  >("selection");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [studyTime, setStudyTime] = useState("3-4 hours");
  const [focusArea, setFocusArea] = useState("Balanced");
  const [practiceTests, setPracticeTests] = useState("2 per week");
  const [studyDays, setStudyDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });
  const [notificationPrefs, setNotificationPrefs] = useState({
    dailyReminders: true,
    progressUpdates: true,
    testReminders: true,
  });

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setCurrentView("detail");
  };

  const handleStartPlan = () => {
    setCurrentView("dashboard");
  };

  const handleCustomizePlan = () => {
    setCurrentView("customization");
  };

  const handleSaveCustomization = () => {
    setCurrentView("dashboard");
  };

  const handleCancelCustomization = () => {
    setCurrentView("detail");
  };

  const toggleStudyDay = (day: keyof typeof studyDays) => {
    setStudyDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const toggleNotificationPref = (pref: keyof typeof notificationPrefs) => {
    setNotificationPrefs((prev) => ({ ...prev, [pref]: !prev[pref] }));
  };

  return (
    <div className={`study-plan-system ${inter.className}`}>
      <style jsx global>{`
        :root {
          --primary: #3b82f6;
          --primary-dark: #2563eb;
          --secondary: #10b981;
          --secondary-dark: #059669;
          --accent: #8b5cf6;
          --light-bg: #f3f4f6;
          --card-bg: #ffffff;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --text-light: #9ca3af;
          --border: #e5e7eb;
          --danger: #ef4444;
          --warning: #f59e0b;
        }

        .study-plan-system {
          color: var(--text-primary);
          background-color: var(--light-bg);
          line-height: 1.5;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .navbar {
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 500;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-block;
          text-decoration: none;
          border: none;
        }

        .btn-primary {
          background-color: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--primary-dark);
        }

        .btn-secondary {
          background-color: var(--secondary);
          color: white;
        }

        .btn-secondary:hover {
          background-color: var(--secondary-dark);
        }

        .btn-outline {
          border: 1px solid var(--border);
          background-color: transparent;
          color: var(--text-primary);
        }

        .btn-outline:hover {
          background-color: var(--light-bg);
        }

        .header {
          text-align: center;
          margin: 2rem 0;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .header p {
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .card {
          background-color: var(--card-bg);
          border-radius: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-description {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .details-container {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
        }

        .details-sidebar {
          width: 30%;
        }

        .details-content {
          width: 70%;
        }

        .plan-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .plan-header h2 {
          font-size: 2rem;
          margin-bottom: 0;
        }

        .plan-emoji {
          font-size: 3rem;
        }

        section {
          margin-bottom: 2rem;
        }

        section h3 {
          font-size: 1.5rem;
          border-bottom: 2px solid var(--primary);
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }

        ul {
          list-style-type: none;
        }

        ul li {
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        ul li::before {
          content: "•";
          color: var(--primary);
          font-weight: bold;
        }

        .sample-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }

        .day {
          background-color: var(--light-bg);
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .day-header {
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .task {
          padding: 0.5rem;
          background-color: white;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .task.reading {
          border-left: 3px solid var(--primary);
        }

        .task.math {
          border-left: 3px solid var(--secondary);
        }

        .task.writing {
          border-left: 3px solid var(--accent);
        }

        .dashboard {
          display: flex;
          gap: 2rem;
        }

        .dashboard-sidebar {
          width: 20%;
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          height: fit-content;
        }

        .dashboard-content {
          width: 80%;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .sidebar-nav a {
          text-decoration: none;
          color: var(--text-secondary);
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }

        .sidebar-nav a:hover {
          background-color: var(--light-bg);
        }

        .sidebar-nav a.active {
          background-color: var(--primary);
          color: white;
        }

        .welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .calendar {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .calendar-navigation {
          display: flex;
          gap: 0.5rem;
        }

        .week-view {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1rem;
        }

        .week-day {
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          padding: 1rem;
          min-height: 200px;
        }

        .week-day-header {
          text-align: center;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
          font-weight: 600;
        }

        .calendar-task {
          background-color: var(--light-bg);
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .calendar-task:hover {
          background-color: rgba(59, 130, 246, 0.1);
        }

        .calendar-task.reading {
          border-left: 3px solid var(--primary);
        }

        .calendar-task.math {
          border-left: 3px solid var(--secondary);
        }

        .calendar-task.writing {
          border-left: 3px solid var(--accent);
        }

        .progress-summary {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .progress-card {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .progress-bar-container {
          height: 1rem;
          background-color: var(--light-bg);
          border-radius: 0.5rem;
          overflow: hidden;
          margin: 0.5rem 0 1rem;
        }

        .progress-bar {
          height: 100%;
          background-color: var(--primary);
          width: 65%;
        }

        .progress-bar.reading {
          background-color: var(--primary);
          width: 75%;
        }

        .progress-bar.math {
          background-color: var(--secondary);
          width: 45%;
        }

        .progress-bar.writing {
          background-color: var(--accent);
          width: 60%;
        }

        .motivational-card {
          background-color: var(--accent);
          color: white;
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .motivational-card h3 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          border: none;
        }

        .motivational-card p {
          font-style: italic;
        }

        .customization-form {
          background-color: white;
          border-radius: 1rem;
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .checkbox-group input {
          width: auto;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--light-bg);
          transition: 0.4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background-color: var(--primary);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(26px);
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard {
            flex-direction: column;
          }

          .dashboard-sidebar {
            width: 100%;
            margin-bottom: 1.5rem;
          }

          .dashboard-content {
            width: 100%;
          }

          .sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .details-container {
            flex-direction: column;
          }

          .details-sidebar,
          .details-content {
            width: 100%;
          }

          .sample-week {
            grid-template-columns: repeat(3, 1fr);
          }

          .week-view {
            grid-template-columns: 1fr;
          }

          .progress-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="logo">
          <span>📚</span> SAT Study Planner
        </div>
        <div className="nav-links">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentView("selection")}
          >
            Home
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setCurrentView("dashboard")}
          >
            Dashboard
          </button>
          <button className="btn btn-primary">Login</button>
        </div>
      </nav>

      {currentView === "selection" && (
        <section>
          <div className="container">
            <div className="header">
              <h1>Choose Your SAT Study Plan</h1>
              <p>
                Select from our expert-designed study plans tailored to your
                schedule and learning style
              </p>
            </div>

            <div className="grid">
              {plansData.map((plan) => (
                <div
                  key={plan.id}
                  className="card"
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="card-title">
                    <span className="card-icon">{plan.emoji}</span>
                    {plan.title}
                  </div>
                  <div className="card-description">{plan.description}</div>
                  <button className="btn btn-primary">View Plan</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentView === "detail" && selectedPlan && (
        <section>
          <div className="container">
            <div className="plan-header">
              <span className="plan-emoji">{selectedPlan.emoji}</span>
              <h2>{selectedPlan.title}</h2>
            </div>

            <div className="details-container">
              <div className="details-sidebar">
                <div className="card">
                  <h3>Plan Summary</h3>
                  <ul>
                    <li>Duration: {selectedPlan.duration}</li>
                    <li>Intensity: {selectedPlan.intensity}</li>
                    <li>Mock Tests: {selectedPlan.mockTests}</li>
                    <li>Daily Study: {selectedPlan.dailyStudy}</li>
                  </ul>

                  <div style={{ marginTop: "2rem" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span>Enable Notifications</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notificationsEnabled}
                          onChange={() =>
                            setNotificationsEnabled(!notificationsEnabled)
                          }
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </label>
                  </div>

                  <div style={{ marginTop: "2rem" }}>
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={handleStartPlan}
                    >
                      Start This Plan
                    </button>
                  </div>
                </div>
              </div>

              <div className="details-content">
                <section>
                  <h3>Who is this for?</h3>
                  <p>
                    The {selectedPlan.title} is perfect for students who have{" "}
                    {selectedPlan.description.toLowerCase()}. This{" "}
                    {selectedPlan.duration} plan is designed for those who need
                    to maximize their preparation in minimal time, focusing on
                    high-impact strategies and targeted practice.
                  </p>
                </section>

                <section>
                  <h3>Plan Highlights</h3>
                  <ul>
                    <li>Daily study sessions ({selectedPlan.dailyStudy})</li>
                    <li>{selectedPlan.mockTests} full-length mock tests</li>
                    <li>
                      Strategic content review focused on high-frequency topics
                    </li>
                    <li>
                      Daily practice sets targeting all three test sections
                    </li>
                    <li>Emphasis on error analysis and mistake prevention</li>
                    <li>Test-day strategies and time management techniques</li>
                  </ul>
                </section>

                <section>
                  <h3>Sample Week View</h3>
                  <div className="sample-week">
                    {sampleWeek.map((day) => (
                      <div key={day.name} className="day">
                        <div className="day-header">{day.name}</div>
                        {day.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`task ${task.type || ""}`}
                          >
                            {task.title} ({task.duration})
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>

                <section style={{ marginTop: "2rem" }}>
                  <button
                    className="btn btn-outline"
                    onClick={handleCustomizePlan}
                  >
                    Customize This Plan
                  </button>
                </section>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentView === "dashboard" && (
        <section>
          <div className="container">
            <div className="welcome-header">
              <h2>Welcome, Alex</h2>
              <div>
                <span>{selectedPlan?.title || "Fast Track Plan"}</span>
                <button
                  className="btn btn-outline"
                  onClick={() => setCurrentView("selection")}
                >
                  Change Plan
                </button>
              </div>
            </div>

            <div className="dashboard">
              <div className="dashboard-sidebar">
                <div className="sidebar-nav">
                  <a href="#" className="active">
                    Calendar
                  </a>
                  <a href="#">Progress</a>
                  <a href="#">Settings</a>
                </div>
              </div>

              <div className="dashboard-content">
                <div className="calendar">
                  <div className="calendar-header">
                    <h3>This Week's Schedule</h3>
                    <div className="calendar-navigation">
                      <button className="btn btn-outline">Previous</button>
                      <button className="btn btn-outline">Next</button>
                    </div>
                  </div>

                  <div className="week-view">
                    {weekViewTasks.map((day) => (
                      <div key={day.day} className="week-day">
                        <div className="week-day-header">{day.day}</div>
                        {day.tasks.map((task) => (
                          <div
                            key={task.id}
                            className={`calendar-task ${task.type || ""}`}
                          >
                            {task.title} ({task.duration})
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="progress-summary">
                  <div className="progress-card">
                    <h3>Overall Progress</h3>
                    <div className="progress-bar-container">
                      <div className="progress-bar"></div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>65% Complete</span>
                      <span>15 of 23 tasks</span>
                    </div>

                    <div style={{ marginTop: "1.5rem" }}>
                      <h4>Section Progress</h4>

                      <div style={{ marginTop: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Reading</span>
                          <span>75%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar reading"></div>
                        </div>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Math</span>
                          <span>45%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar math"></div>
                        </div>
                      </div>

                      <div style={{ marginTop: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Writing</span>
                          <span>60%</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar writing"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="motivational-card">
                    <h3>Keep it up!</h3>
                    <p>
                      "Success is the sum of small efforts, repeated day in and
                      day out."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {currentView === "customization" && (
        <section>
          <div className="container">
            <h2>Customize Your Plan</h2>
            <p>
              Adjust the {selectedPlan?.title || "Fast Track Plan"} to better
              fit your schedule and learning needs
            </p>

            <div className="customization-form">
              <div className="form-group">
                <label>Available study time per day</label>
                <select
                  value={studyTime}
                  onChange={(e) => setStudyTime(e.target.value)}
                >
                  <option>1-2 hours</option>
                  <option>3-4 hours</option>
                  <option>5+ hours</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred focus area</label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                >
                  <option>Balanced</option>
                  <option>More Reading</option>
                  <option>More Math</option>
                  <option>More Writing</option>
                </select>
              </div>

              <div className="form-group">
                <label>Number of practice tests</label>
                <select
                  value={practiceTests}
                  onChange={(e) => setPracticeTests(e.target.value)}
                >
                  <option>1 per week</option>
                  <option>2 per week</option>
                  <option>3 per week</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred study days</label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "1rem",
                  }}
                >
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="monday"
                      checked={studyDays.monday}
                      onChange={() => toggleStudyDay("monday")}
                    />
                    <label htmlFor="monday">Monday</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="tuesday"
                      checked={studyDays.tuesday}
                      onChange={() => toggleStudyDay("tuesday")}
                    />
                    <label htmlFor="tuesday">Tuesday</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="wednesday"
                      checked={studyDays.wednesday}
                      onChange={() => toggleStudyDay("wednesday")}
                    />
                    <label htmlFor="wednesday">Wednesday</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="thursday"
                      checked={studyDays.thursday}
                      onChange={() => toggleStudyDay("thursday")}
                    />
                    <label htmlFor="thursday">Thursday</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="friday"
                      checked={studyDays.friday}
                      onChange={() => toggleStudyDay("friday")}
                    />
                    <label htmlFor="friday">Friday</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="saturday"
                      checked={studyDays.saturday}
                      onChange={() => toggleStudyDay("saturday")}
                    />
                    <label htmlFor="saturday">Saturday</label>
                  </div>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="sunday"
                      checked={studyDays.sunday}
                      onChange={() => toggleStudyDay("sunday")}
                    />
                    <label htmlFor="sunday">Sunday</label>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Notification preferences</label>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="daily-reminders"
                    checked={notificationPrefs.dailyReminders}
                    onChange={() => toggleNotificationPref("dailyReminders")}
                  />
                  <label htmlFor="daily-reminders">Daily study reminders</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="progress-updates"
                    checked={notificationPrefs.progressUpdates}
                    onChange={() => toggleNotificationPref("progressUpdates")}
                  />
                  <label htmlFor="progress-updates">
                    Weekly progress updates
                  </label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="test-reminders"
                    checked={notificationPrefs.testReminders}
                    onChange={() => toggleNotificationPref("testReminders")}
                  />
                  <label htmlFor="test-reminders">Mock test reminders</label>
                </div>
              </div>

              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <button
                  className="btn btn-primary"
                  onClick={handleSaveCustomization}
                >
                  Save & Apply
                </button>
                <button
                  className="btn btn-outline"
                  onClick={handleCancelCustomization}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
  