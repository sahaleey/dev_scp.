import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiMongodb } from "react-icons/si";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);

  const projects = [
    {
      title: "Union Website",
      description:
        "A modern portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/image/abha.jpg",
      tech: [
        { name: "React", icon: <FaReact className="text-blue-400" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
        { name: "Framer", icon: <span className="text-white">FM</span> },
      ],
      liveDemo: "https://abha-web.vercel.app",
      github: "https://github.com/sahaleey/Abha-web",
    },
    {
      title: "Blog Website",
      description:
        "A modern, multilingual blog platform built for the Arabic wing of our student community with Firebase Auth, real-time interactions, and admin dashboard.",
      image: "/image/Capture.JPG",
      tech: [
        { name: "React", icon: <FaReact className="text-blue-400" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
        { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
      ],
      liveDemo: "https://aljazeera-web.vercel.app",
      github: "https://github.com/sahaleey/aljazeera-web",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio website about Khabib built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/image/athlet.JPG",
      tech: [
        { name: "React", icon: <FaReact className="text-blue-400" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
        { name: "Framer", icon: <span className="text-white">FM</span> },
      ],
      liveDemo: "https://athlet-portfolio-u1hf.vercel.app",
      github: "https://github.com/sahaleey/athlet-portfolio",
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
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
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
        staggerChildren: 0.15,
        delayChildren: 0.3,
        when: "beforeChildren",
      },
    },
  };

  const cardVariants = {
    offscreen: {
      y: 80,
      opacity: 0,
      rotateX: 15,
    },
    onscreen: {
      y: 0,
      opacity: 1,
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

  return (
    <section
      id="projects"
      className="relative min-h-screen py-28 px-4 bg-[#0c0c0f] text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Background elements matching About page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0f]/80 to-[#0c0c0f] z-0" />

        {/* Floating blobs */}
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

        {/* Floating tech icons */}
        {projects
          .flatMap((project) => project.tech)
          .map((tech, i) => (
            <motion.div
              key={i}
              className="absolute text-xl z-0"
              style={{
                color: tech.icon.props.className.includes("text-blue-400")
                  ? "#3f92f4"
                  : tech.icon.props.className.includes("text-cyan-400")
                  ? "#22d3ee"
                  : tech.icon.props.className.includes("text-green-500")
                  ? "#22c55e"
                  : tech.icon.props.className.includes("text-yellow-500")
                  ? "#eab308"
                  : tech.icon.props.className.includes("text-green-600")
                  ? "#16a34a"
                  : "#ffffff",
                top: `${10 + ((i * 15) % 80)}%`,
                left: `${5 + ((i * 10) % 80)}%`,
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
              {tech.icon}
            </motion.div>
          ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
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
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Here are some of my recent projects with modern technologies and
            clean design
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hover"
              className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 backdrop-blur-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-gray-300"
                  >
                    <p className="text-sm">{project.description}</p>
                  </motion.div>
                </div>
              </div>

              {/* Project content */}
              <div className="p-6">
                <motion.h3
                  className="text-2xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors"
                  whileHover={{ x: 3 }}
                >
                  {project.title}
                </motion.h3>

                {/* Tech stack */}
                <motion.div className="flex flex-wrap gap-3 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <motion.div
                      key={techIndex}
                      className="flex items-center gap-2 text-xs bg-gray-800/70 text-gray-300 px-3 py-2 rounded-full cursor-default backdrop-blur-sm"
                      whileHover={{
                        y: -3,
                        backgroundColor: "rgba(34, 211, 238, 0.2)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Project links */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-4 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    whileHover={{ x: 3, scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo <FiExternalLink />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 hover:border-cyan-400/50 px-4 py-3 rounded-lg hover:bg-gray-700/30 transition-all"
                    whileHover={{ x: 3, scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Code <FiGithub />
                  </motion.a>
                </div>
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 0.3 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.3)_0,_transparent_70%)]"></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View more button */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/crazydrace?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-white font-medium group relative overflow-hidden px-6 py-3 rounded-full border border-cyan-400/30 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View all projects</span>
            <motion.span
              className="relative z-10"
              animate={{
                x: [0, 5, 0],
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
            >
              <FiArrowRight />
            </motion.span>
            <motion.span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.3)_0,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
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

export default Projects;
