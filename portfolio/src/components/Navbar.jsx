import { useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("hero");

  const [hidden, setHidden] = useState(false);
  const navRef = useRef(null);

  const { scrollY } = useScroll();
  const scrollThreshold = 150;
  let ticking = false;

  const links = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Work", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Contact", to: "contact" },
  ];

  // Scroll Hide / Show Navbar (Debounced)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const prev = scrollY.getPrevious();
        if (latest > prev && latest > scrollThreshold) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Active link tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (
          window.scrollY >= top - 200 &&
          window.scrollY < top + height - 200
        ) {
          setActiveLink(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 bg-transparent  transition-shadow duration-300 shadow 
      `}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      variants={navVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ backdropFilter: "blur(12px)", height: "64px" }} // consistent height
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text cursor-pointer"
          >
            CODE.SCP
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              duration={500}
              className={`text-sm font-medium cursor-pointer transition-colors ${
                activeLink === link.to
                  ? "text-cyan-500 "
                  : "text-gray-700 hover:text-gray-900 "
              }`}
              onSetActive={() => setActiveLink(link.to)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden p-2 text-gray-700 "
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiOutlineX size={24} /> : <HiOutlineMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#0c0c0f]  px-4 pb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3 mt-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  className={`block px-2 py-2 rounded text-base font-medium ${
                    activeLink === link.to ? "text-cyan-500" : "text-gray-700 "
                  }`}
                  onClick={() => setIsOpen(false)}
                  onSetActive={() => setActiveLink(link.to)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-300 "></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
