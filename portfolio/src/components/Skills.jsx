import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { FiCode, FiServer, FiTool, FiCpu, FiDatabase } from "react-icons/fi";
import { FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiNextdotjs,
  SiGraphql,
  SiJest,
  SiDocker,
} from "react-icons/si";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const containerRef = useRef(null);
  const controls = useAnimation();
  const [isAnimating, setIsAnimating] = useState(false);

  const skillCategories = [
    {
      title: "Frontend Engineering",
      icon: <FiCode className="text-2xl" />,
      color: "#3b82f6",
      accent: "#93c5fd",
      skills: [
        {
          name: "React & Next.js",
          level: 92,
          icon: <FaReact className="text-[#61DAFB]" />,
          description:
            "Building performant, interactive UIs with modern React ecosystem",
        },
        {
          name: "TypeScript",
          level: 88,
          icon: <SiTypescript className="text-[#3178C6]" />,
          description: "Strongly typed JavaScript for scalable applications",
        },
        {
          name: "Tailwind CSS",
          level: 90,
          icon: <SiTailwindcss className="text-[#06B6D4]" />,
          description: "Utility-first CSS for rapid UI development",
        },
        {
          name: "Framer Motion",
          level: 85,
          icon: <SiFramer className="text-[#0055FF]" />,
          description: "Production-ready animations for React",
        },
        {
          name: "Responsive Design",
          level: 94,
          icon: <FaFigma className="text-[#A259FF]" />,
          description: "Pixel-perfect layouts across all devices",
        },
      ],
    },
    {
      title: "Backend & DevOps",
      icon: <FiServer className="text-2xl" />,
      color: "#8b5cf6",
      accent: "#c4b5fd",
      skills: [
        {
          name: "Node.js & Express",
          level: 87,
          icon: <FaNodeJs className="text-[#68A063]" />,
          description: "Building scalable server-side applications",
        },
        {
          name: "GraphQL",
          level: 82,
          icon: <SiGraphql className="text-[#E535AB]" />,
          description: "Efficient API queries with type safety",
        },
        {
          name: "Database Systems",
          level: 84,
          icon: <FiDatabase className="text-[#47A248]" />,
          description: "MongoDB, PostgreSQL, and Redis expertise",
        },
        {
          name: "Docker & CI/CD",
          level: 78,
          icon: <SiDocker className="text-[#2496ED]" />,
          description: "Containerization and deployment pipelines",
        },
        {
          name: "Cloud Services",
          level: 76,
          icon: <FiCpu className="text-[#FF9900]" />,
          description: "AWS, Vercel, and other cloud platforms",
        },
      ],
    },
    {
      title: "Quality & Tools",
      icon: <FiTool className="text-2xl" />,
      color: "#10b981",
      accent: "#6ee7b7",
      skills: [
        {
          name: "Testing (Jest)",
          level: 83,
          icon: <SiJest className="text-[#C63D14]" />,
          description: "Unit, integration, and E2E testing",
        },
        {
          name: "Git & Version Control",
          level: 89,
          icon: <div className="text-[#F05032]">{"⎇"}</div>,
          description: "Collaborative development workflows",
        },
        {
          name: "Performance Optimization",
          level: 85,
          icon: <div className="text-[#FACC15]">{"⚡"}</div>,
          description: "Lighthouse scores >90 for production apps",
        },
        {
          name: "UI/UX Principles",
          level: 82,
          icon: <div className="text-[#EC4899]">{"✏️"}</div>,
          description: "User-centered design implementation",
        },
        {
          name: "Agile Methodologies",
          level: 80,
          icon: <div className="text-[#3B82F6]">{"🔄"}</div>,
          description: "Scrum and Kanban experience",
        },
      ],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const skillCardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: [0.43, 0.13, 0.23, 0.96],
        delay: 0.3,
      },
    }),
  };

  const floatingIconVariants = {
    float: {
      y: [0, 15, 0],
      rotate: [0, 5, 0],
      opacity: [0.6, 0.9, 0.6],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-950 text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIvPjwvZz48L2c+PC9zdmc+')]" />
        </div>

        {/* Floating Tech Icons */}
        {skillCategories
          .flatMap((category) => category.skills)
          .map((skill, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl z-0"
              style={{
                color:
                  skill.icon.props?.className?.match(/text-\[(.*?)\]/)?.[1] ||
                  "#ffffff",
                top: `${10 + ((i * 12) % 80)}%`,
                left: `${5 + ((i * 18) % 80)}%`,
                opacity: 0,
              }}
              variants={floatingIconVariants}
              initial="float"
              animate="float"
              transition={{
                duration: 8 + i * 0.5,
                delay: i * 0.3,
              }}
            >
              {skill.icon}
            </motion.div>
          ))}

        {/* Animated Gradient Blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            scale: isAnimating ? [1, 1.2, 1] : [1, 0.8, 1],
            x: isAnimating ? [0, 20, 0] : [0, -20, 0],
            y: isAnimating ? [0, 30, 0] : [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: isAnimating ? [1, 0.8, 1] : [1, 1.2, 1],
            x: isAnimating ? [0, -30, 0] : [0, 30, 0],
            y: isAnimating ? [0, -20, 0] : [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Expertise
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            A curated showcase of my professional toolkit and capabilities
          </motion.p>
        </motion.div>

        {/* Category Selector */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={index}
              variants={categoryVariants}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index
                  ? "bg-white text-gray-900 shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveCategory(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                {category.title}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={skillCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-400/30 transition-all"
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="p-3 rounded-lg mt-1"
                      style={{
                        background: `linear-gradient(135deg, ${skillCategories[activeCategory].color}30, ${skillCategories[activeCategory].color}10)`,
                        border: `1px solid ${skillCategories[activeCategory].color}20`,
                      }}
                      animate={{
                        rotate: hoveredSkill === index ? 10 : 0,
                        scale: hoveredSkill === index ? 1.1 : 1,
                      }}
                    >
                      {skill.icon}
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {skill.name}
                        </h3>
                        <span className="text-blue-400 font-medium">
                          {skill.level}%
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mb-4">
                        {skill.description}
                      </p>

                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          custom={skill.level}
                          variants={progressBarVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${skillCategories[activeCategory].color}, ${skillCategories[activeCategory].accent})`,
                            boxShadow: `0 0 10px ${skillCategories[activeCategory].color}80`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Skill Level Legend */}
        <motion.div
          className="mt-12 flex justify-center gap-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-600" />
            <span>Basic Knowledge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Proficient</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Expert</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
