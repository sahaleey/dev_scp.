import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { SiCodefresh } from "react-icons/si";

const IntroScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const controls = useAnimation();
  const textControls = useAnimation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const introTexts = [
    { text: "Welcome", subtext: "to my digital portfolio" },
    { text: "Muhammed Sahel CP", subtext: "Senior Full-Stack Engineer" },
    { text: "Let's build", subtext: "something extraordinary together" },
  ];

  useEffect(() => {
    const sequence = async () => {
      // Initial delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Animate in the first text
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      });

      // Text switching sequence
      for (let i = 1; i < introTexts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        await textControls.start({
          opacity: 0,
          y: -20,
          transition: { duration: 0.5 },
        });
        setCurrentTextIndex(i);
        await textControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        });
      }

      // Final delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Exit animation
      await controls.start({
        scale: 1.1,
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      });

      setVisible(false);
      onComplete();
    };

    sequence();
  }, [controls, textControls, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={controls}
        >
          <div className="relative z-10 max-w-2xl px-6">
            {/* Animated logo/brand mark */}
            <motion.div
              className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center mb-10 mx-auto shadow-2xl shadow-blue-500/20"
              initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
              }}
              transition={{
                delay: 0.3,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                <SiCodefresh size={60} color="white" />
              </motion.div>
            </motion.div>

            <motion.div
              className="text-center overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={textControls}
              >
                {introTexts[currentTextIndex].text}
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 font-light"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.8 },
                }}
                key={currentTextIndex}
              >
                {introTexts[currentTextIndex].subtext}
              </motion.p>
            </motion.div>

            <motion.div
              className="flex justify-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              <div className="flex items-center gap-3 text-gray-400 group">
                <motion.div
                  animate={{
                    x: [0, 6, 0],
                    transition: { repeat: Infinity, duration: 1.8 },
                  }}
                  className="group-hover:text-cyan-400 transition-colors"
                >
                  <FiArrowRight className="rotate-90" />
                </motion.div>
                <span className="group-hover:text-white transition-colors">
                  Loading Portfolio
                </span>
              </div>
            </motion.div>
          </div>

          {/* Animated grid background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvZz48L3N2Zz4=')]" />
          </motion.div>

          {/* Floating gradient circles */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `radial-gradient(circle, rgba(${
                    Math.random() > 0.5 ? "34, 211, 238" : "99, 102, 241"
                  }, ${Math.random() * 0.2 + 0.1}) 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.5, 1.5],
                  x: [0, (Math.random() - 0.5) * 300],
                  y: [0, (Math.random() - 0.5) * 300],
                }}
                transition={{
                  duration: Math.random() * 25 + 25,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 10,
                }}
              />
            ))}
          </motion.div>

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 border-8 border-transparent pointer-events-none"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              borderColor: "rgba(255, 255, 255, 0.03)",
            }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
