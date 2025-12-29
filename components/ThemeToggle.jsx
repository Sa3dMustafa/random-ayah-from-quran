"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.dataset.theme = "dark";
      setDark(true);
    }
  }, []);

  const toggle = () => {
    const mode = dark ? "light" : "dark";
    document.documentElement.dataset.theme = mode;
    localStorage.setItem("theme", mode);
    setDark(!dark);
  };

  return (
    <button className="theme-btn" onClick={toggle}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
