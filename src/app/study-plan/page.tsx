"use client"

import { useState } from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

type Plan = {
  id: string
  emoji: string
  title: string
  description: string
  duration?: string
  intensity?: string
  mockTests?: string
  dailyStudy?: string
}

type Task = {
  id: string
  type?: "reading" | "math" | "writing"
  title: string
  duration: string
}

type Day = {
  name: string
  tasks: Task[]
}

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
]

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
]

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
]

export default function StudyPlanSystem() {
  const [currentView, setCurrentView] = useState<"selection" | "detail" | "dashboard" | "customization">("selection")
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [studyTime, setStudyTime] = useState("3-4 hours")
  const [focusArea, setFocusArea] = useState("Balanced")
  const [practiceTests, setPracticeTests] = useState("2 per week")
  const [studyDays, setStudyDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  })
  const [notificationPrefs, setNotificationPrefs] = useState({
    dailyReminders: true,
    progressUpdates: true,
    testReminders: true,
  })

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan)
    setCurrentView("detail")
  }

  const handleStartPlan = () => {
    setCurrentView("dashboard")
  }

  const handleCustomizePlan = () => {
    setCurrentView("customization")
  }

  const handleSaveCustomization = () => {
    setCurrentView("dashboard")
  }

  const handleCancelCustomization = () => {
    setCurrentView("detail")
  }

  const toggleStudyDay = (day: keyof typeof studyDays) => {
    setStudyDays((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  const toggleNotificationPref = (pref: keyof typeof notificationPrefs) => {
    setNotificationPrefs((prev) => ({ ...prev, [pref]: !prev[pref] }))
  }

  return (
    <div className={`turbo-study-plan-system ${inter.className}`}>
      <style jsx>{`
        .turbo-study-plan-system {
          color: var(--turbo-text-primary);
          background: radial-gradient(circle at top, #2A1569 0%, #121212 70%);
          line-height: 1.5;
          min-height: 100vh;
          font-family: var(--font-inter);
        }
        
        .turbo-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }
        
        .turbo-navbar {
          background-color: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 12px rgba(138, 43, 226, 0.2);
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--turbo-border);
        }
        
        .turbo-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--turbo-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .turbo-nav-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .turbo-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-block;
          text-decoration: none;
          border: none;
        }
        
        .turbo-btn-primary {
          background: linear-gradient(135deg, var(--turbo-primary), var(--turbo-primary-dark));
          color: white;
          box-shadow: 0 4px 14px rgba(138, 43, 226, 0.3);
        }
        
        .turbo-btn-primary:hover {
          background: linear-gradient(135deg, var(--turbo-primary-dark), var(--turbo-primary));
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(138, 43, 226, 0.4);
        }
        
        .turbo-btn-outline {
          border: 1px solid var(--turbo-border);
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--turbo-text-primary);
        }
        
        .turbo-btn-outline:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: var(--turbo-primary);
        }
        
        .turbo-header {
          text-align: center;
          margin: 3rem 0;
        }
        
        .turbo-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #fff, #b195e4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        
        .turbo-header p {
          color: var(--turbo-text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }
        
        .turbo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        
        .turbo-card {
          background: rgba(30, 30, 40, 0.6);
          border-radius: 1rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(80, 80, 100, 0.2);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        
        .turbo-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--turbo-primary), var(--turbo-accent));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .turbo-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(138, 43, 226, 0.2);
        }
        
        .turbo-card:hover::before {
          opacity: 1;
        }
        
        .turbo-card-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .turbo-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .turbo-card-description {
          color: var(--turbo-text-secondary);
          margin-bottom: 1.5rem;
        }
        
        .turbo-details-container {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .turbo-details-sidebar {
          width: 30%;
        }
        
        .turbo-details-content {
          width: 70%;
        }
        
        .turbo-plan-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .turbo-plan-header h2 {
          font-size: 2rem;
          margin-bottom: 0;
          background: linear-gradient(to right, #fff, #b195e4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .turbo-plan-emoji {
          font-size: 3rem;
          filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.4));
        }
        
        .turbo-section {
          margin-bottom: 2rem;
        }
        
        .turbo-section h3 {
          font-size: 1.5rem;
          border-bottom: 2px solid var(--turbo-primary);
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
          color: var(--turbo-text-primary);
        }
        
        .turbo-ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .turbo-ul li {
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .turbo-ul li::before {
          content: "•";
          color: var(--turbo-primary);
          font-weight: bold;
        }
        
        .turbo-sample-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 0.5rem;
        }
        
        .turbo-day {
          background-color: rgba(30, 30, 40, 0.6);
          border: 1px solid rgba(80, 80, 100, 0.2);
          border-radius: 0.5rem;
          padding: 1rem;
        }
        
        .turbo-day-header {
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-align: center;
          color: var(--turbo-text-primary);
        }
        
        .turbo-task {
          padding: 0.5rem;
          background-color: rgba(20, 20, 30, 0.8);
          border-radius: 0.25rem;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          border-left: 3px solid transparent;
        }
        
        .turbo-task.reading {
          border-left: 3px solid var(--turbo-primary);
        }
        
        .turbo-task.math {
          border-left: 3px solid var(--turbo-secondary);
        }
        
        .turbo-task.writing {
          border-left: 3px solid var(--turbo-accent);
        }
        
        .turbo-dashboard {
          display: flex;
          gap: 2rem;
        }
        
        .turbo-dashboard-sidebar {
          width: 20%;
          background-color: rgba(30, 30, 40, 0.6);
          border: 1px solid rgba(80, 80, 100, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          height: fit-content;
        }
        
        .turbo-dashboard-content {
          width: 80%;
        }
        
        .turbo-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .turbo-sidebar-nav a {
          text-decoration: none;
          color: var(--turbo-text-secondary);
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }
        
        .turbo-sidebar-nav a:hover {
          background-color: rgba(80, 80, 100, 0.2);
          color: var(--turbo-text-primary);
        }
        
        .turbo-sidebar-nav a.active {
          background: linear-gradient(135deg, var(--turbo-primary), var(--turbo-primary-dark));
          color: white;
        }
        
        .turbo-welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .turbo-calendar {
          background-color: rgba(30, 30, 40, 0.6);
          border: 1px solid rgba(80, 80, 100, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .turbo-calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .turbo-calendar-navigation {
          display: flex;
          gap: 0.5rem;
        }
        
        .turbo-week-view {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1rem;
        }
        
        .turbo-week-day {
          border: 1px solid rgba(80, 80, 100, 0.2);
          border-radius: 0.5rem;
          padding: 1rem;
          min-height: 200px;
          background-color: rgba(20, 20, 30, 0.5);
        }
        
        .turbo-week-day-header {
          text-align: center;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
          border-bottom: 1px solid rgba(80, 80, 100, 0.2);
          font-weight: 600;
          color: var(--turbo-text-primary);
        }
        
        .turbo-calendar-task {
          background-color: rgba(40, 40, 50, 0.8);
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: background-color 0.2s ease, transform 0.2s ease;
          border-left: 3px solid transparent;
        }
        
        .turbo-calendar-task:hover {
          background-color: rgba(60, 60, 70, 0.8);
          transform: translateY(-2px);
        }
        
        .turbo-calendar-task.reading {
          border-left: 3px solid var(--turbo-primary);
        }
        
        .turbo-calendar-task.math {
          border-left: 3px solid var(--turbo-secondary);
        }
        
        .turbo-calendar-task.writing {
          border-left: 3px solid var(--turbo-accent);
        }
        
        .turbo-progress-summary {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        
        .turbo-progress-card {
          background-color: rgba(30, 30, 40, 0.6);
          border: 1px solid rgba(80, 80, 100, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .turbo-progress-bar-container {
          height: 0.75rem;
          background-color: rgba(80, 80, 100, 0.2);
          border-radius: 1rem;
          overflow: hidden;
          margin: 0.5rem 0 1rem;
        }
        
        .turbo-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, var(--turbo-primary), var(--turbo-primary-light));
          width: 65%;
          border-radius: 1rem;
        }
        
        .turbo-progress-bar.reading {
          background: linear-gradient(90deg, var(--turbo-primary), var(--turbo-primary-light));
          width: 75%;
        }
        
        .turbo-progress-bar.math {
          background: linear-gradient(90deg, var(--turbo-secondary), var(--turbo-secondary-light));
          width: 45%;
        }
        
        .turbo-progress-bar.writing {
          background: linear-gradient(90deg, var(--turbo-accent), var(--turbo-accent-light));
          width: 60%;
        }
        
        .turbo-motivational-card {
          background: linear-gradient(135deg, var(--turbo-accent), var(--turbo-primary-dark));
          color: white;
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          box-shadow: 0 4px 20px rgba(138, 43, 226, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .turbo-motivational-card::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E");
          opacity: 0.2;
        }
        
        .turbo-motivational-card h3 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          border: none;
          color: white;
        }
        
        .turbo-motivational-card p {
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .turbo-customization-form {
          background-color: rgba(30, 30, 40, 0.6);
          border: 1px solid rgba(80, 80, 100, 0.2);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .turbo-form-group {
          margin-bottom: 1.5rem;
        }
        
        .turbo-form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--turbo-text-primary);
        }
        
        .turbo-form-group input,
        .turbo-form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid rgba(80, 80, 100, 0.3);
          border-radius: 0.5rem;
          background-color: rgba(20, 20, 30, 0.6);
          color: var(--turbo-text-primary);
        }
        
        .turbo-form-group input:focus,
        .turbo-form-group select:focus {
          border-color: var(--turbo-primary);
          outline: none;
          box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
        }
        
        .turbo-checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .turbo-checkbox-group input {
          width: auto;
        }
        
        .turbo-toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        
        .turbo-toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .turbo-toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(80, 80, 100, 0.2);
          transition: 0.4s;
          border-radius: 34px;
        }
        
        .turbo-toggle-slider:before {
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
        
        input:checked + .turbo-toggle-slider {
          background: linear-gradient(135deg, var(--turbo-primary), var(--turbo-primary-dark));
        }
        
        input:checked + .turbo-toggle-slider:before {
          transform: translateX(26px);
        }
        
        @media (max-width: 1024px) {
          .turbo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .turbo-dashboard {
            flex-direction: column;
          }
          
          .turbo-dashboard-sidebar {
            width: 100%;
            margin-bottom: 1.5rem;
          }
          
          .turbo-dashboard-content {
            width: 100%;
          }
          
          .turbo-sidebar-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .turbo-grid {
            grid-template-columns: 1fr;
          }
          
          .turbo-details-container {
            flex-direction: column;
          }
          
          .turbo-details-sidebar,
          .turbo-details-content {
            width: 100%;
          }
          
          .turbo-sample-week {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .turbo-week-view {
            grid-template-columns: 1fr;
          }
          
          .turbo-progress-summary {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Global styles to avoid conflicts */}
      <style jsx global>{`
        :root {
          --turbo-primary: #8A2BE2;
          --turbo-primary-dark: #6A1CB0;
          --turbo-primary-light: #B768FF;
          --turbo-secondary: #00E676;
          --turbo-secondary-dark: #00B248;
          --turbo-secondary-light: #66FFA6;
          --turbo-accent: #FF4081;
          --turbo-accent-light: #FF80AB;
          --turbo-dark-bg: #121212;
          --turbo-card-bg: rgba(30, 30, 40, 0.6);
          --turbo-text-primary: #FFFFFF;
          --turbo-text-secondary: #B0B0C0;
          --turbo-text-light: #8080A0;
          --turbo-border: rgba(80, 80, 100, 0.2);
          --turbo-danger: #FF5252;
          --turbo-warning: #FFD740;
          --font-inter: 'Inter', sans-serif;
        }
      `}</style>

      <div className="turbo-background-image">
        <nav className="turbo-navbar">
          <div className="turbo-logo">
            <span>📚</span> SAT Study Planner
          </div>
          <div className="turbo-nav-links">
            <button className="turbo-btn turbo-btn-outline" onClick={() => setCurrentView("selection")}>
              Home
            </button>
            <button className="turbo-btn turbo-btn-outline" onClick={() => setCurrentView("dashboard")}>
              Dashboard
            </button>
            <button className="turbo-btn turbo-btn-primary">Login</button>
          </div>
        </nav>

        {currentView === "selection" && (
          <section>
            <div className="turbo-container">
              <div className="turbo-header">
                <h1>Choose Your SAT Study Plan</h1>
                <p>Select from our expert-designed study plans tailored to your schedule and learning style</p>
              </div>

              <div className="turbo-grid">
                {plansData.map((plan) => (
                  <div key={plan.id} className="turbo-card" onClick={() => handlePlanSelect(plan)}>
                    <div className="turbo-card-title">
                      <span className="turbo-card-icon">{plan.emoji}</span>
                      {plan.title}
                    </div>
                    <div className="turbo-card-description">{plan.description}</div>
                    <button className="turbo-btn turbo-btn-primary">View Plan</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentView === "detail" && selectedPlan && (
          <section>
            <div className="turbo-container">
              <div className="turbo-plan-header">
                <span className="turbo-plan-emoji">{selectedPlan.emoji}</span>
                <h2>{selectedPlan.title}</h2>
              </div>

              <div className="turbo-details-container">
                <div className="turbo-details-sidebar">
                  <div className="turbo-card">
                    <h3>Plan Summary</h3>
                    <ul className="turbo-ul">
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
                        <label className="turbo-toggle-switch">
                          <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                          />
                          <span className="turbo-toggle-slider"></span>
                        </label>
                      </label>
                    </div>

                    <div style={{ marginTop: "2rem" }}>
                      <button
                        className="turbo-btn turbo-btn-primary"
                        style={{ width: "100%" }}
                        onClick={handleStartPlan}
                      >
                        Start This Plan
                      </button>
                    </div>
                  </div>
                </div>

                <div className="turbo-details-content">
                  <section className="turbo-section">
                    <h3>Who is this for?</h3>
                    <p>
                      The {selectedPlan.title} is perfect for students who have {selectedPlan.description.toLowerCase()}
                      . This {selectedPlan.duration} plan is designed for those who need to maximize their preparation
                      in minimal time, focusing on high-impact strategies and targeted practice.
                    </p>
                  </section>

                  <section className="turbo-section">
                    <h3>Plan Highlights</h3>
                    <ul className="turbo-ul">
                      <li>Daily study sessions ({selectedPlan.dailyStudy})</li>
                      <li>{selectedPlan.mockTests} full-length mock tests</li>
                      <li>Strategic content review focused on high-frequency topics</li>
                      <li>Daily practice sets targeting all three test sections</li>
                      <li>Emphasis on error analysis and mistake prevention</li>
                      <li>Test-day strategies and time management techniques</li>
                    </ul>
                  </section>

                  <section className="turbo-section">
                    <h3>Sample Week View</h3>
                    <div className="turbo-sample-week">
                      {sampleWeek.map((day) => (
                        <div key={day.name} className="turbo-day">
                          <div className="turbo-day-header">{day.name}</div>
                          {day.tasks.map((task) => (
                            <div key={task.id} className={`turbo-task ${task.type || ""}`}>
                              {task.title} ({task.duration})
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </section>

                  <section style={{ marginTop: "2rem" }}>
                    <button className="turbo-btn turbo-btn-outline" onClick={handleCustomizePlan}>
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
            <div className="turbo-container">
              <div className="turbo-welcome-header">
                <h2>Welcome, Alex</h2>
                <div>
                  <span>{selectedPlan?.title || "Fast Track Plan"}</span>
                  <button className="turbo-btn turbo-btn-outline" onClick={() => setCurrentView("selection")}>
                    Change Plan
                  </button>
                </div>
              </div>

              <div className="turbo-dashboard">
                <div className="turbo-dashboard-sidebar">
                  <div className="turbo-sidebar-nav">
                    <a href="#" className="active">
                      Calendar
                    </a>
                    <a href="#">Progress</a>
                    <a href="#">Settings</a>
                  </div>
                </div>

                <div className="turbo-dashboard-content">
                  <div className="turbo-calendar">
                    <div className="turbo-calendar-header">
                      <h3>This Week's Schedule</h3>
                      <div className="turbo-calendar-navigation">
                        <button className="turbo-btn turbo-btn-outline">Previous</button>
                        <button className="turbo-btn turbo-btn-outline">Next</button>
                      </div>
                    </div>

                    <div className="turbo-week-view">
                      {sampleWeek.map((day) => (
                        <div key={day.name} className="turbo-week-day">
                          <div className="turbo-week-day-header">{day.name}</div>
                          {day.tasks.map((task) => (
                            <div key={task.id} className={`turbo-calendar-task ${task.type || ""}`}>
                              {task.title} ({task.duration})
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="turbo-progress-summary">
                    <div className="turbo-progress-card">
                      <h3>Overall Progress</h3>
                      <div className="turbo-progress-bar-container">
                        <div className="turbo-progress-bar"></div>
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
                          <div className="turbo-progress-bar-container">
                            <div className="turbo-progress-bar reading"></div>
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
                          <div className="turbo-progress-bar-container">
                            <div className="turbo-progress-bar math"></div>
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
                          <div className="turbo-progress-bar-container">
                            <div className="turbo-progress-bar writing"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="turbo-motivational-card">
                      <h3>Keep it up!</h3>
                      <p>"Success is the sum of small efforts, repeated day in and day out."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentView === "customization" && (
          <section>
            <div className="turbo-container">
              <h2>Customize Your Plan</h2>
              <p>
                Adjust the {selectedPlan?.title || "Fast Track Plan"} to better fit your schedule and learning needs
              </p>

              <div className="turbo-customization-form">
                <div className="turbo-form-group">
                  <label>Available study time per day</label>
                  <select value={studyTime} onChange={(e) => setStudyTime(e.target.value)}>
                    <option>1-2 hours</option>
                    <option>3-4 hours</option>
                    <option>5+ hours</option>
                  </select>
                </div>

                <div className="turbo-form-group">
                  <label>Preferred focus area</label>
                  <select value={focusArea} onChange={(e) => setFocusArea(e.target.value)}>
                    <option>Balanced</option>
                    <option>More Reading</option>
                    <option>More Math</option>
                    <option>More Writing</option>
                  </select>
                </div>

                <div className="turbo-form-group">
                  <label>Number of practice tests</label>
                  <select value={practiceTests} onChange={(e) => setPracticeTests(e.target.value)}>
                    <option>1 per week</option>
                    <option>2 per week</option>
                    <option>3 per week</option>
                  </select>
                </div>

                <div className="turbo-form-group">
                  <label>Preferred study days</label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "1rem",
                    }}
                  >
                    <div className="turbo-checkbox-group">
                      <input
                        type="checkbox"
                        id="monday"
                        checked={studyDays.monday}
                        onChange={() => toggleStudyDay("monday")}
                      />
                      <label htmlFor="monday">Monday</label>
                    </div>
                    <div className="turbo-checkbox-group">
                      <input
                        type="checkbox"
                        id="tuesday"
                        checked={studyDays.tuesday}
                        onChange={() => toggleStudyDay("tuesday")}
                      />
                      <label htmlFor="tuesday">Tuesday</label>
                    </div>
                    <div className="turbo-checkbox-group">
                      <input
                        type="checkbox"
                        id="wednesday"
                        checked={studyDays.wednesday}
                        onChange={() => toggleStudyDay("wednesday")}
                      />
                      <label htmlFor="wednesday">Wednesday</label>
                    </div>
                    <div className="turbo-checkbox-group">
                      <input
                        type="checkbox"
                        id="thursday"
                        checked={studyDays.thursday}
                        onChange={() => toggleStudyDay("thursday")}
                      />
                      <label htmlFor="thursday">Thursday</label>
                    </div>
                    <div className="turbo-checkbox-group">
                      <input
                        type="checkbox"
                        id="friday"
                        checked={studyDays.friday}
                        onChange={() => toggleStudyDay("friday")}
                      />
                      <label htmlFor="friday">Friday</label>
                    </div>
                    <div className="turbo-checkbox-group">
                      <input
                        type="checkbox"
                        id="saturday"
                        checked={studyDays.saturday}
                        onChange={() => toggleStudyDay("saturday")}
                      />
                      <label htmlFor="saturday">Saturday</label>
                    </div>
                    <div className="turbo-checkbox-group">
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

                <div className="turbo-form-group">
                  <label>Notification preferences</label>
                  <div className="turbo-checkbox-group">
                    <input
                      type="checkbox"
                      id="daily-reminders"
                      checked={notificationPrefs.dailyReminders}
                      onChange={() => toggleNotificationPref("dailyReminders")}
                    />
                    <label htmlFor="daily-reminders">Daily study reminders</label>
                  </div>
                  <div className="turbo-checkbox-group">
                    <input
                      type="checkbox"
                      id="progress-updates"
                      checked={notificationPrefs.progressUpdates}
                      onChange={() => toggleNotificationPref("progressUpdates")}
                    />
                    <label htmlFor="progress-updates">Weekly progress updates</label>
                  </div>
                  <div className="turbo-checkbox-group">
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
                  <button className="turbo-btn turbo-btn-primary" onClick={handleSaveCustomization}>
                    Save & Apply
                  </button>
                  <button className="turbo-btn turbo-btn-outline" onClick={handleCancelCustomization}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
