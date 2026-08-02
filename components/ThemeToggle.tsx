"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Determine initial theme on client side
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = savedTheme === "light" || (!savedTheme && systemPrefersLight) ? "light" : "dark";
    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 text-stone-400 hover:text-stone-50 rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        // Moon icon (to switch to dark theme)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        // Sun icon (to switch to light theme)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m0 13.5V21m9.75-9h-2.25m-13.5 0H3m15.364-6.364l-1.591 1.591M6.346 17.654l-1.591 1.591m12.728 0l-1.591-1.591M6.346 6.346L4.755 4.755M12 9a3 3 0 100 6 3 3 0 000-6z"
          />
        </svg>
      )}
    </button>
  );
}
