import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FiCode, FiServer, FiTool, FiCpu, FiDatabase } from "react-icons/fi";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiFramer } from "react-icons/si";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import ScrollVelocity from "./ui/ScrollVelocity";

const Skills = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FiCode className="text-2xl" />,
      color: "#3f92f4",
      skills: [
        {
          name: "React",
          level: 90,
          icon: <FaReact className="text-blue-400" />,
        },
        {
          name: "TypeScript",
          level: 85,
          icon: <SiTypescript className="text-blue-600" />,
        },
        {
          name: "HTML/CSS",
          level: 95,
          icon: <div className="text-orange-500">{"</>"}</div>,
        },
        {
          name: "Tailwind CSS",
          level: 88,
          icon: <SiTailwindcss className="text-cyan-400" />,
        },
        {
          name: "Framer Motion",
          level: 82,
          icon: <SiFramer className="text-purple-500" />,
        },
      ],
    },
    {
      title: "Backend Development",
      icon: <FiServer className="text-2xl" />,
      color: "#715adf",
      skills: [
        {
          name: "Node.js",
          level: 82,
          icon: <FaNodeJs className="text-green-500" />,
        },
        {
          name: "Express",
          level: 80,
          icon: <FiCpu className="text-gray-300" />,
        },
        {
          name: "MongoDB",
          level: 75,
          icon: <FiDatabase className="text-green-600" />,
        },
        {
          name: "REST APIs",
          level: 85,
          icon: <div className="text-yellow-400">{"{}"}</div>,
        },
        {
          name: "Authentication",
          level: 78,
          icon: <div className="text-red-400">{"🔒"}</div>,
        },
      ],
    },
    {
      title: "Tools & Others",
      icon: <FiTool className="text-2xl" />,
      color: "#51cf66",
      skills: [
        {
          name: "Git",
          level: 88,
          icon: <div className="text-orange-600">{"⎇"}</div>,
        },
        {
          name: "UI/UX Design",
          level: 85,
          icon: <div className="text-pink-400">{"✏️"}</div>,
        },
        {
          name: "Responsive Design",
          level: 92,
          icon: <div className="text-blue-300">{"📱"}</div>,
        },
        {
          name: "Performance",
          level: 80,
          icon: <div className="text-green-300">{"⚡"}</div>,
        },
        {
          name: "Testing",
          level: 75,
          icon: <div className="text-red-300">{"🧪"}</div>,
        },
      ],
    },
  ];

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    floatX.set((x - window.innerWidth / 2) / 50);
    floatY.set((y - window.innerHeight / 2) / 50);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const interval = setInterval(() => setIsAnimating((prev) => !prev), 3000);

    // Background animation sequence
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [controls]);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        stiffness: 80,
        damping: 15,
      },
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(34, 211, 238, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      x: 5,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: "backOut" },
    }),
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen py-28 px-4 bg-[#0c0c0f] text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0f]/80 to-[#0c0c0f] z-0" />

        <FloatingBlob
          x={floatX}
          y={floatY}
          opacity={useTransform(floatY, [-10, 0, 10], [0.3, 0.5, 0.3])}
          scaleAnim={isAnimating ? [1, 1.2, 1] : [1, 0.8, 1]}
          className="top-1/4 left-1/4 w-32 h-32 bg-[#3f92f4]/10"
        />
        <FloatingBlob
          x={useTransform(floatX, (x) => -x * 1.5)}
          y={useTransform(floatY, (y) => -y * 1.5)}
          scaleAnim={isAnimating ? [1, 1.3, 1] : [1, 0.7, 1]}
          className="bottom-1/3 right-1/4 w-40 h-40 bg-[#715adf]/10"
        />

        {/* Floating Tech Icons */}
        {skillCategories
          .flatMap((category) => category.skills)
          .map((skill, i) => (
            <motion.div
              key={i}
              className="absolute text-xl z-0"
              style={{
                color: skill.icon.props.className?.includes("blue-400")
                  ? "#3f92f4"
                  : skill.icon.props.className?.includes("cyan-400")
                  ? "#22d3ee"
                  : skill.icon.props.className?.includes("green-500")
                  ? "#22c55e"
                  : skill.icon.props.className?.includes("purple-500")
                  ? "#a855f7"
                  : skill.icon.props.className?.includes("orange-500")
                  ? "#f97316"
                  : skill.icon.props.className?.includes("green-600")
                  ? "#16a34a"
                  : skill.icon.props.className?.includes("gray-300")
                  ? "#d1d5db"
                  : skill.icon.props.className?.includes("yellow-400")
                  ? "#facc15"
                  : skill.icon.props.className?.includes("red-400")
                  ? "#f87171"
                  : skill.icon.props.className?.includes("orange-600")
                  ? "#ea580c"
                  : skill.icon.props.className?.includes("pink-400")
                  ? "#f472b6"
                  : skill.icon.props.className?.includes("blue-300")
                  ? "#93c5fd"
                  : skill.icon.props.className?.includes("green-300")
                  ? "#86efac"
                  : skill.icon.props.className?.includes("red-300")
                  ? "#fca5a5"
                  : "#ffffff",
                top: `${10 + ((i * 10) % 80)}%`,
                left: `${5 + ((i * 15) % 80)}%`,
              }}
              animate={{
                y: [0, 10, 0],
                rotate: [0, 5, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {skill.icon}
            </motion.div>
          ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Skills
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Technologies and tools I work with to create exceptional digital
            experiences
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              className={`group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-${category.color}/30 transition-all duration-300 backdrop-blur-sm`}
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                transformStyle: "preserve-3d",
                "--glow-color": category.color,
              }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 p-6">
                <motion.div
                  className="p-3 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}80, ${category.color}40)`,
                  }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.icon}
                </motion.div>
                <motion.h3
                  className="text-2xl font-semibold text-white"
                  whileHover={{ x: 3 }}
                >
                  {category.title}
                </motion.h3>
              </div>

              {/* Skills List */}
              <div className="p-6 pt-0 space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={skillItemVariants}
                    className="group relative"
                    custom={skillIndex * 0.1}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          {skill.icon}
                        </motion.div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-cyan-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        custom={skill.level}
                        variants={progressBarVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className={`h-full rounded-full`}
                        style={{
                          background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                          boxShadow: `0 0 8px ${category.color}80`,
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredCategory === index ? 0.3 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center, ${category.color}30 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FloatingBlob = ({ x, y, opacity, scaleAnim, className }) => (
  <motion.div
    className={`absolute rounded-full blur-xl z-0 ${className}`}
    style={{ x, y, opacity }}
    animate={{ scale: scaleAnim }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default Skills;
<ScrollVelocity
  texts={["React", "Tailwind", "Framer"]}
  className="custom-scroll-text mt-10"
/>;
