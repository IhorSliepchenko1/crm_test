import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

     const getStoredTheme = () => {
          const storedTheme = localStorage.getItem('theme');
          try {
               return storedTheme ? JSON.parse(storedTheme) : "light";
          } catch {
               return "light";
          }
     };

     const [theme, setTheme] = useState(getStoredTheme());

     const toggleTheme = () => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
          localStorage.setItem(`theme`, JSON.stringify(newTheme));
     };



     return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
               {children}
          </ThemeContext.Provider>
     );
};

export const useTheme = () => useContext(ThemeContext);
