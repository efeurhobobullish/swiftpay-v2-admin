import { useTheme } from "@/hooks";
import { Moon, Sun } from "lucide-react";
  

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className="border-b border-line sticky top-0 backdrop-blur-sm">
        <nav className="layout h-[70px] flex items-center justify-between">
            <a href="#">
                <img src="/full-logo-color.svg" alt="logo" height={50} width={150} />
            </a>

            <div
            onClick={toggleTheme}
            className="h-11 w-11 center bg-secondary rounded-full"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </nav>
    </header>
  )
}

export default Header