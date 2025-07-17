import { useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import image from "../../assets/logo/image.png";

const particles = ["✨", "⚡", "❄️", "⭐"];

const HeroImage = () => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 25);
    y.set((e.clientY - centerY) / 25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    controls.start({ scale: 1 });
  };

  const handleMouseEnter = () => {
    controls.start({ scale: 1.03 });
  };

  return (
    <motion.div
      className="relative w-full max-w-[500px] sm:max-w-[600px] mx-auto aspect-square"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Fancy glow backdrop */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-20 z-0"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Image with 3D motion */}
      <motion.img
        src={image} // replace with your image path
        alt="Hero Visual"
        className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
        style={{
          x,
          y,
          rotateX: y,
          rotateY: x,
        }}
        animate={controls}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl pointer-events-none"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            color: ["#a78bfa", "#f472b6", "#60a5fa", "#34d399"][i % 4],
            zIndex: 1,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -30],
            x: [0, (Math.random() - 0.5) * 30],
            scale: [1, 1.5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.5,
          }}
        >
          {particles[i % particles.length]}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HeroImage;
