import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
    persist((set) => ({
        theme: "light",
        toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }), {
        name: "theme",
        partialize: (state) => ({ theme: state.theme }),
    })
);

export default useThemeStore;
