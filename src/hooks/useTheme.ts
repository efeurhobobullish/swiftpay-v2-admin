import { useThemeStore } from "@/stores";
import { useEffect, useState } from "react";

const useTheme = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [isDark, setIsDark] = useState(theme === "dark");

  useEffect(() => {
    document.documentElement.classList.add(theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }

    return () => {
      document.documentElement.classList.remove(theme);
      if (theme === "dark") {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    };
  }, [theme]);

  return { theme, toggleTheme, isDark };
};

export default useTheme;
