"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextType {
  theme: "dark" | "light"
  setTheme: (theme: "dark" | "light") => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: "dark" | "light") => {
    const root = document.documentElement

    if (newTheme === "light") {
      root.classList.add("light")
      root.style.setProperty("--background", "248 250 252")
      root.style.setProperty("--foreground", "15 23 42")
      document.body.style.background = "rgb(248, 250, 252)"
      document.body.style.color = "rgb(15, 23, 42)"
    } else {
      root.classList.remove("light")
      root.style.setProperty("--background", "20 20 20")
      root.style.setProperty("--foreground", "255 255 255")
      document.body.style.background = "rgb(20, 20, 20)"
      document.body.style.color = "rgb(255, 255, 255)"
    }
  }

  const changeTheme = (newTheme: "dark" | "light") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    changeTheme(newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme: changeTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
