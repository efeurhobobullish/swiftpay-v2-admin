import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, Loader, Moon, Power, Sun } from "lucide-react";
import { useAuth, useTheme } from "@/hooks";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Modal } from "@/components";
const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const navigate = useNavigate();
  const { logout, isLoading, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logout();
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <header className=" sticky top-0 backdrop-blur-sm z-30">
        <nav className="layout h-[70px] flex items-center justify-between">
          {isDashboard && (
            <div className="h-11 w-11 overflow-hidden rounded-full bg-primary">
              <img
                src={`https://api.dicebear.com/9.x/micah/svg?seed=${user?.name}`}
                alt="avatar"
                className="h-full w-full object-fit-cover"
              />
            </div>
          )}
          {!isDashboard && (
            <button
              onClick={() => navigate(-1)}
              className="h-11 w-11 center bg-secondary rounded-full"
            >
              <ChevronLeft />
            </button>
          )}

          <div className="flex items-center gap-4">
            <div
              onClick={toggleTheme}
              className="h-11 w-11 center bg-secondary rounded-full"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            {/* <Link to="/notifications">
            <div className="h-11 w-11 relative center bg-secondary rounded-full">
              <Bell size={20} />
              <div className="h-3 w-3 bg-red-500 rounded-full absolute top-0 right-1" />
            </div>
          </Link> */}

            <button
              className="h-11 w-11 center bg-red-500/10 text-red-500 hover:bg-red-500/30 transition-all duration-300 rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <Power size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <Modal
            title="Logout"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-secondary text-sm font-medium hover:bg-secondary/80 transition-all duration-300 rounded-lg px-4 h-10"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={isLoading}
                  className="bg-red-500 text-white text-sm font-medium hover:bg-red-500/30 transition-all duration-300 rounded-lg px-4 h-10"
                  onClick={handleLogout}
                >
                  {isLoading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
