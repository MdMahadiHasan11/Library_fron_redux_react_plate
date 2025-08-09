import { useEffect, useState } from "react";
import {
  ThemeProviderContext,
  type Theme,
} from "../contexts/ThemeProviderContext";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "library-management-ui-theme",
  ...props
}: ThemeProviderProps) {
  const detectSystemTheme = (): Theme => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    // যদি savedTheme "system" বা invalid হয় → system theme detect করবো
    const systemTheme = detectSystemTheme();
    localStorage.setItem(storageKey, systemTheme);
    return systemTheme;
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme === "light" || newTheme === "dark") {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    } else {
      const systemTheme = detectSystemTheme();
      localStorage.setItem(storageKey, systemTheme);
      setThemeState(systemTheme);
    }
  };

  const value = { theme, setTheme };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
