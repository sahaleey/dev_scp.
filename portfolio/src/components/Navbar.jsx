// src/components/Navbar.jsx
import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-scroll";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { scrollY } = useScroll();

  const navigation = [
    { name: "Home", href: "hero" },
    { name: "About", href: "about" },
    { name: "Work", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Contact", href: "contact" },
  ];

  // detect scroll for subtle background fade
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleScroll = useCallback(() => {
    const sections = navigation.map((item) => item.href);
    const current = sections.find((id) => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });
    if (current) setActiveLink(current);
  }, [navigation]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // theme toggle (you can link it to your global dark mode later)
  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "backdrop-blur-md bg-white/90 dark:bg-black/50 shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => setActiveLink("hero")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent font-myfont"
        >
          SCP
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              onSetActive={() => setActiveLink(item.href)}
              className="relative text-sm font-medium cursor-pointer"
            >
              <span
                className={`transition-colors duration-300 ${
                  activeLink === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {item.name}
              </span>
              {activeLink === item.href && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={handleThemeToggle}
            className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition"
          >
            {darkMode ? (
              <MdLightMode className="text-yellow-400" size={20} />
            ) : (
              <MdDarkMode
                className="text-gray-700 dark:text-gray-300"
                size={20}
              />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {isOpen ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt3 size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 dark:bg-black/70 backdrop-blur-md border-t border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                  onSetActive={() => {
                    setActiveLink(item.href);
                    setIsOpen(false);
                  }}
                  className={`block py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    activeLink === item.href
                      ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Dark mode in mobile */}
              <button
                onClick={handleThemeToggle}
                className="flex items-center gap-2 py-3 px-4 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
              >
                {darkMode ? (
                  <MdLightMode className="text-yellow-400" size={20} />
                ) : (
                  <MdDarkMode
                    className="text-gray-700 dark:text-gray-300"
                    size={20}
                  />
                )}
                <span className="text-black dark:text-white">
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
