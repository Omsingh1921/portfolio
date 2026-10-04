import { useState, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'

const STORAGE_KEY = 'portfolio-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check saved preference in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY)
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
      }
      // 2. Respect system preference if no saved theme exists
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light'
      }
    }
    // 3. Default to dark mode
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
