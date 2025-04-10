"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    // Initialize theme from localStorage
    const currentTheme = localStorage.getItem("studyProTheme") || "dark";
    document.documentElement.classList.toggle(
      "light-theme",
      currentTheme === "light"
    );
  }, []);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("light-theme");

    const theme = htmlElement.classList.contains("light-theme")
      ? "light"
      : "dark";
    localStorage.setItem("studyProTheme", theme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300 hover:rotate-180 z-[100]"
    >
      <i className="fas fa-adjust text-[var(--text-primary)] text-xl"></i>
    </button>
  );
}
