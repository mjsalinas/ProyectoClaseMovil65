import { createContext, useContext, useState, ReactNode } from "react";

const lightColors = {
  background: "#FFFFFF",
  surface: "#F5F5F5",
  text: "#1A1A1A",
  textSecondary: "#666666",
  primary: "#5f0650",
  border: "#E0E0E0",
  cardBackground: "#FFFFFF",
  cardBorder: "#E0E0E0",
};

const darkColors = {
  background: "#121212",
  surface: "#1E1E1E",
  text: "#F5F5F5",
  textSecondary: "#AAAAAA",
  primary: "#CE93D8",
  border: "#333333",
  cardBackground: "#2C2C2C",
  cardBorder: "#444444",
};

export type ThemeColors = typeof lightColors;

type ThemeContextType = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const colors = isDark ? darkColors : lightColors;
  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return ctx;
}
