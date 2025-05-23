import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showElements, setShowElements] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Dynamic cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Sequential animation trigger
  useEffect(() => {
    const timers = showElements.map((_, i) => {
      return setTimeout(() => {
        setShowElements((prev) => {
          const newState = [...prev];
          newState[i] = true;
          return newState;
        });
      }, i * 200);
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.5 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section
      id="hero"
      className="min-h-screen pt-24 py-24 flex items-center  justify-center px-4 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated background elements */}
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

      {/* Custom cursor effect */}
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
          backgroundColor: isHovered
            ? "rgba(59, 130, 246, 0.3)"
            : "rgba(59, 130, 246, 0.2)",
        }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-2/3">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              <motion.p
                variants={textVariants}
                className="text-blue-400 mb-4 text-lg font-mono"
              >
                Hi, my name is
              </motion.p>

              <motion.h1
                variants={textVariants}
                className="text-5xl md:text-7xl font-bold mb-4 text-white leading-tight"
              >
                Muhammed Sahel CP
              </motion.h1>

              <motion.h2
                variants={textVariants}
                className="text-3xl md:text-5xl font-bold text-gray-300 mb-6 leading-tight"
              >
                I build{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  digital experiences
                </span>
              </motion.h2>

              <motion.p
                variants={textVariants}
                className="text-gray-400 max-w-xl mb-8 text-lg leading-relaxed"
              >
                I'm a full-stack developer specializing in creating beautiful,
                functional, and user-centric web applications with modern
                technologies.
              </motion.p>

              <motion.div variants={textVariants}>
                <Link
                  to="projects"
                  spy={true}
                  smooth={true}
                  duration={500}
                  className="group relative inline-block"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <motion.span
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="relative z-10 px-8 py-4 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl shadow-cyan-500/20 ring-1 ring-white/10 backdrop-blur-md hover:blur-0 hover:brightness-110 transition-all duration-300 ease-in-out flex items-center gap-2"
                  >
                    View my projects
                    <motion.span
                      animate={{ x: isHovered ? 8 : 0 }}
                      transition={{ type: "spring", stiffness: 500 }}
                      className="text-xl"
                    >
                      <FiArrowRight />
                    </motion.span>
                  </motion.span>

                  {/* Glowing ring effect */}
                  <span className="absolute inset-0 rounded-xl blur-xl bg-gradient-to-r from-blue-500/40 via-cyan-400/40 to-blue-500/40 opacity-60 group-hover:opacity-90 transition duration-500 group-hover:scale-105"></span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-400 mb-2 "
          >
            Scroll down
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 5], opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 0.5 }}
              className="w-1 h-2 bg-gray-400 rounded-full mt-1"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
