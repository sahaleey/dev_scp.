import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const IntroScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const controls = useAnimation();
  const textControls = useAnimation();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const introTexts = ["Welcome", "Muhammed Sahel CP", "Full-Stack Developer"];

  useEffect(() => {
    const sequence = async () => {
      // Initial delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Animate in the first text
      await textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
      });

      // Text switching sequence
      for (let i = 1; i < introTexts.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        await textControls.start({
          opacity: 0,
          y: -20,
          transition: { duration: 0.4 },
        });
        setCurrentTextIndex(i);
        await textControls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        });
      }

      // Final delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Exit animation
      await controls.start({
        scale: 1.2,
        opacity: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
          className="fixed inset-0 z-50 bg-[#0c0c0f] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={controls}
        >
          <div className="relative">
            {/* Animated logo/brand mark could go here */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-8 mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-4xl text-white"
              >
                SCP
              </motion.div>
            </div>

            <motion.div
              className="text-center overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={textControls}
              >
                {introTexts[currentTextIndex]}
              </motion.h1>
            </motion.div>

            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <div className="flex items-center gap-2 text-gray-400">
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                    transition: { repeat: Infinity, duration: 2 },
                  }}
                >
                  <FiArrowRight className="rotate-90" />
                </motion.div>
                <span>Loading Portfolio</span>
              </div>
            </motion.div>
          </div>

          {/* Background elements */}
          <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: "blur(60px)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 0.2, 0],
                  scale: [0.5, 1.5],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: Math.random() * 20 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
