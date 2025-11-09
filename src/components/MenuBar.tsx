import {
    Home,
    LayoutGrid,
    Settings,
    UserRound,
    X,
    Wifi,
    PhoneCall,
    Wallet,
  } from "lucide-react";
  import { useEffect, useState } from "react";
  import { NavLink } from "react-router-dom";
  import { AnimatePresence, motion } from "framer-motion";
  
  const menuItems = [
    { name: "Overview", icon: Home, link: "/dashboard" },
    { name: "Settings", icon: Settings, link: "/settings" },
    { name: "Users", icon: UserRound, link: "/users" },
    { name: "Transactions", icon: Wallet, link: "/transactions" },
    { name: "Data Plans", icon: Wifi, link: "/data" },
    { name: "Airtime", icon: PhoneCall, link: "/airtime" },
  ];
  
  const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const firstTwo = menuItems.slice(0, 2);
    const lastThree = menuItems.slice(2);
  
    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [isOpen]);
  
    return (
      <>
        {/* Main floating bar */}
        <div className="bg-primary p-4 rounded-full fixed bottom-4 left-1/2 -translate-x-1/2 z-50 shadow-xl">
          <ul className="flex items-center gap-20">
            {firstTwo.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-2 text-sm font-medium bg-white/20 rounded-full p-2 pr-4 border border-white/10"
                      : "text-white flex items-center gap-2 text-sm font-medium rounded-full p-2 pr-4"
                  }
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
  
          <button
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Open menu"
            className="absolute border-4 border-primary -top-1/2 left-1/2 -translate-x-1/2 bg-white text-primary h-18 w-18 flex items-center justify-center rounded-full"
          >
            {isOpen ? <X size={24} /> : <LayoutGrid size={24} />}
          </button>
        </div>
  
      <AnimatePresence>

        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
  
            {/* Bottom sheet */}
            <motion.div
            initial={{y: "100%", opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: "100%", opacity: 0}}
            className="fixed bottom-40 left-1/2 -translate-x-1/2 w-[80%] md:w-[480px] bg-background dark:bg-foreground p-4 rounded-3xl z-50 shadow-xl">
              <ul className="space-y-2">
                {lastThree.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-2 text-sm font-medium bg-foreground rounded-lg p-4 border border-white/10 backdrop-blur-sm"
                          : "flex items-center gap-2 text-sm font-medium text-muted rounded-lg hover:text-main hover:border-line hover:bg-foreground hover:dark:border-white/10 border border-transparent p-4"
                      }
                    >
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </>
    );
  };
  
  export default MenuBar;
  