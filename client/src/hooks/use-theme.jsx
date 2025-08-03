import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const stored = localStorage.getItem('theme')
    return stored || 'dark' // Default to dark theme
  })

  useEffect(() => {
    const root = document.documentElement
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark')
    
    // Add the current theme class
    if (theme === 'dark') {
      root.classList.add('dark')
    }
    
    // Store in localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const setDarkTheme = () => setTheme('dark')
  const setLightTheme = () => setTheme('light')

  return {
    theme,
    toggleTheme,
    setDarkTheme,
    setLightTheme,
    isDark: theme === 'dark'
  }
}
