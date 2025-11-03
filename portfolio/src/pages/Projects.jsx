import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";

const Projects = () => {
  const projects = [
    {
      title: "Union Website",
      description:
        "A modern portfolio website built with React and Tailwind CSS, featuring smooth animations and responsive design.",
      image: "/image/abha.jpg",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      liveDemo: "https://abha-web.vercel.app",
      github: "https://github.com/sahaleey/Abha-web",
      category: "Web Development",
    },
    {
      title: "Blog Platform",
      description:
        "A multilingual blog platform with Firebase Auth, real-time interactions, and admin dashboard for student community.",
      image: "/image/Capture.JPG",
      tech: ["React", "Node.js", "Firebase", "MongoDB"],
      liveDemo: "https://aljazeera-web.vercel.app",
      github: "https://github.com/sahaleey/aljazeera-web",
      category: "Full-Stack",
    },
    {
      title: "Digital Menu App",
      description:
        "A modern digital menu web application with real-time updates and seamless user experience.",
      image: "/image/citrus.jpg",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      liveDemo: "https://citrus-juicerie.vercel.app",
      github: "https://github.com/sahaleey/Citrus",
      category: "Web Application",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-24 bg-white text-black dark:bg-black dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-sm font-medium text-cyan-500">My Work</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-secondary">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-lato">
            A collection of projects that showcase my skills in modern web
            development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={index}
              variants={cardVariants}
              className="group relative bg-white border border-black/10 dark:bg-white/5 dark:border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover "
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent dark:from-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-black/40 text-cyan-400 rounded-full backdrop-blur-sm font-secondary">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-500 transition-colors font-secondary">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 font-lato text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-white/10 font-lato"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 px-4 py-3 rounded-lg transition-all duration-300 font-lato"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink className="text-sm" />
                    Live Demo
                  </motion.a>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="text-lg" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/sahaleey?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-cyan-500 hover:text-gray-600 font-semibold rounded-xl border border-cyan-500/40 hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-lato">View All Projects</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowRight />
            </motion.span>
          </motion.a>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 font-lato">
            Explore more of my work on GitHub
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
