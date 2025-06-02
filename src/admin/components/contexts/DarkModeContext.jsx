import React, { createContext, useState, useContext } from "react";

// Create a context
const DarkModeContext = createContext();

// Custom hook to use Dark Mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Provider component to wrap the app with context
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
