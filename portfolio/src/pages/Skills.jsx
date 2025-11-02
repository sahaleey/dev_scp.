import {
  motion,
  useAnimation,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { FiCode, FiServer, FiTool, FiCpu, FiDatabase } from "react-icons/fi";
import { FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiGraphql,
  SiJest,
  SiDocker,
} from "react-icons/si";
import { useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

// ✅ separate component stays fine
const AnimatedGlow = ({ mouseX, mouseY }) => {
  const x = useTransform(mouseX, (v) => `${v}px`);
  const y = useTransform(mouseY, (v) => `${v}px`);
  const bg = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX} ${latestY}, rgba(63,146,244,0.15), transparent 60%)`
  );

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ background: bg }}
    />
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const controls = useAnimation();

  const handleMouseMove = useCallback(
    ({ clientX: x, clientY: y }) => {
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  // ✅ move useInView above any conditional returns
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // ✅ safe to return null now (after all hooks are declared)
  if (!mounted) return null;

  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: <FiCode className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      darkColor: "from-blue-400 to-cyan-400",
      borderColor: "border-blue-500/20",
      skills: [
        {
          name: "React & Next.js",
          level: 92,
          icon: <FaReact className="text-[#61DAFB]" />,
          description: "Building performant, interactive UIs",
        },
        {
          name: "TypeScript",
          level: 88,
          icon: <SiTypescript className="text-[#3178C6]" />,
          description: "Strongly typed JavaScript for scalable apps",
        },
        {
          name: "Tailwind CSS",
          level: 90,
          icon: <SiTailwindcss className="text-[#06B6D4]" />,
          description: "Utility-first CSS for rapid UI dev",
        },
        {
          name: "Framer Motion",
          level: 85,
          icon: <SiFramer className="text-[#0055FF]" />,
          description: "Production-ready animations",
        },
        {
          name: "Responsive Design",
          level: 94,
          icon: <FaFigma className="text-[#A259FF]" />,
          description: "Pixel-perfect layouts across devices",
        },
      ],
    },
    {
      title: "Backend & DevOps",
      icon: <FiServer className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      darkColor: "from-purple-400 to-pink-400",
      borderColor: "border-purple-500/20",
      skills: [
        {
          name: "Node.js & Express",
          level: 87,
          icon: <FaNodeJs className="text-[#68A063]" />,
          description: "Scalable server-side apps",
        },
        {
          name: "GraphQL",
          level: 82,
          icon: <SiGraphql className="text-[#E535AB]" />,
          description: "Efficient, type-safe API queries",
        },
        {
          name: "Database Systems",
          level: 84,
          icon: <FiDatabase className="text-[#47A248]" />,
          description: "MongoDB, PostgreSQL, Redis",
        },
        {
          name: "Docker & CI/CD",
          level: 78,
          icon: <SiDocker className="text-[#2496ED]" />,
          description: "Containerization & pipelines",
        },
        {
          name: "Cloud Services",
          level: 76,
          icon: <FiCpu className="text-[#FF9900]" />,
          description: "AWS, Vercel & others",
        },
      ],
    },
    {
      title: "Quality & Tools",
      icon: <FiTool className="text-2xl" />,
      color: "from-emerald-500 to-green-500",
      darkColor: "from-emerald-400 to-green-400",
      borderColor: "border-emerald-500/20",
      skills: [
        {
          name: "Testing (Jest)",
          level: 83,
          icon: <SiJest className="text-[#C63D14]" />,
          description: "Unit, integration, E2E testing",
        },
        {
          name: "Git & Version Control",
          level: 89,
          icon: <div className="text-[#F05032] font-bold">⎇</div>,
          description: "Collaborative workflows",
        },
        {
          name: "Performance Optimization",
          level: 85,
          icon: <div className="text-yellow-500 font-bold">⚡</div>,
          description: "Lighthouse >90",
        },
        {
          name: "UI/UX Principles",
          level: 82,
          icon: <div className="text-pink-500 font-bold">✏️</div>,
          description: "User-centered design",
        },
        {
          name: "Agile Methodologies",
          level: 80,
          icon: <div className="text-blue-500 font-bold">🔄</div>,
          description: "Scrum, Kanban",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const skillCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 },
    }),
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 px-4 
      bg-gradient-to-b from-white to-gray-100 
      dark:from-black dark:to-gray-900 
      transition-colors duration-700 overflow-hidden"
    >
      <AnimatedGlow mouseX={mouseX} mouseY={mouseY} />

      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full 
            bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Technical Stack
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
            Technical Expertise
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A curated showcase of my professional toolkit and capabilities.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={i}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border ${
                activeCategory === i
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : `bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600`
              }`}
              onClick={() => setActiveCategory(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                {cat.title}
              </div>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={skillCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-xl mt-1"
                    animate={{
                      rotate: hoveredSkill === i ? [0, 5, -5, 0] : 0,
                      scale: hoveredSkill === i ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {skill.name}
                      </h3>
                      <span
                        className={`font-bold bg-gradient-to-r ${skillCategories[activeCategory].color} bg-clip-text text-transparent`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {skill.description}
                    </p>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        custom={skill.level}
                        variants={progressBarVariants}
                        initial="hidden"
                        whileInView="visible"
                        className={`h-full rounded-full bg-gradient-to-r ${skillCategories[activeCategory].color}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
