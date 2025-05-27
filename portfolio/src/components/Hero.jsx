import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import RobotSection from "./GreetingAi";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showElements, setShowElements] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [text] = useTypewriter({
    words: ["Digital Experiences", "Full Stack Magic", "Responsive Designs"],
    loop: 0,
    delaySpeed: 1500,
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Staggered text appearance
  useEffect(() => {
    const timers = showElements.map((_, i) =>
      setTimeout(() => {
        setShowElements((prev) => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, i * 200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen pt-20 sm:pt-28 md:pt-20 pb-10 px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.2],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Custom cursor trail */}
      <motion.div
        className="fixed w-8 h-8 rounded-full bg-blue-500/20 pointer-events-none z-50"
        style={{
          left: cursorPosition.x - 16,
          top: cursorPosition.y - 16,
          mixBlendMode: "screen",
        }}
        animate={{
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 0.5 : 0.3,
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />

      {/* Main content */}
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-12 px-2 md:px-6">
          {/* Left Content */}
          <div className="w-full md:w-4/5 lg:w-1/3 ml-0 md:ml-8 lg:ml-[20vh] text-center md:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              <motion.p className="text-blue-400 mb-4 text-lg font-mono">
                Hi, my name is
              </motion.p>

              <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
                Muhammed Sahel CP
              </motion.h1>

              <motion.h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-300 mb-6 leading-tight">
                I build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {text}
                </span>
                <Cursor cursorStyle="|" />
              </motion.h2>

              <motion.p className="text-gray-400 max-w-xl mx-auto md:mx-0 mb-8 text-lg leading-relaxed">
                I'm a full-stack developer specializing in creating beautiful,
                functional, and user-centric web applications with modern
                technologies.
              </motion.p>

              <Link
                to="projects"
                spy={true}
                smooth={true}
                duration={500}
                className="group relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.span className="relative z-10 px-8 py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl shadow-cyan-500/20 ring-1 ring-white/10 backdrop-blur-md hover:blur-0 hover:brightness-110 transition-all duration-300 ease-in-out flex items-center gap-2">
                  View my projects
                  <motion.span
                    animate={{ x: isHovered ? 8 : 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="text-xl"
                  >
                    <FiArrowRight />
                  </motion.span>
                </motion.span>
                <span className="absolute inset-0 rounded-xl blur-xl bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-blue-500/40 opacity-60 group-hover:opacity-90 transition duration-500 group-hover:scale-105"></span>
              </Link>
            </motion.div>
          </div>

          {/* Right Spline Robot */}
          <RobotSection />
        </div>
      </div>
    </section>
  );
};

export default Hero;
