import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import { useState } from "react";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: "Union Website",
      description:
        "A modern portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/image/abha.jpg",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      liveDemo: "https://abha-web.vercel.app",
      github: "https://github.com/crazydrace/Abha-web",
    },
    {
      title: "Blog Website",
      description:
        "A modern, multilingual blog platform built for the Arabic wing of our student community, designed to spotlight voices, reflections, and creativity. Users can sign up securely via Firebase Auth, post blogs with real-time likes and view counts, and admins can manage content through a sleek dashboard. Built using React (Vite) on the frontend and a Node.js + Express + MongoDB backend, it blends clean UI with smart logic — including Google login, JWT-based auth, block management, and a dynamic article reader in Arabic.",
      image: "/image/Capture.JPG",
      tech: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Node.js",
        "Express",
        "FireBase",
        "MongoDB",
      ],
      liveDemo: "https://aljazeera-web.vercel.app",
      github: "https://github.com/crazydrace/aljazeera-web",
    },
    {
      title: "Portfolio Website",
      description:
        "A modern portfolio website about Khabib built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/image/athlet.JPG",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      liveDemo: "https://athlet-portfolio-u1hf.vercel.app",
      github: "https://github.com/crazydrace/athlet-portfolio",
    },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const techTagVariants = {
    hover: {
      y: -2,
      backgroundColor: "rgba(34, 211, 238, 0.2)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <section
      id="projects"
      className="py-28 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.1, 0],
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
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(60px)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects with modern technologies and
            clean design
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project image */}
              <motion.div
                className="relative h-60 overflow-hidden"
                variants={imageVariants}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      y: hoveredIndex === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-white"
                  >
                    <p className="text-sm">{project.description}</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Project content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      variants={techTagVariants}
                      whileHover="hover"
                      className="text-xs bg-gray-700 text-cyan-400 px-3 py-1 rounded-full cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Project links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo <FiExternalLink />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-all"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Code <FiGithub />
                  </motion.a>
                </div>
              </div>

              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/10 filter blur-xl -z-10"
                animate={{
                  opacity: hoveredIndex === index ? 0.3 : 0,
                  scale: hoveredIndex === index ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-white font-medium group"
            whileHover={{ x: 5 }}
          >
            View all projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="group-hover:translate-x-1 transition-transform"
            >
              <FiArrowRight />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
