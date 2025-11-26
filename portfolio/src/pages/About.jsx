import { motion } from "framer-motion";
import {
  FiCode,
  FiLayers,
  FiUsers,
  FiBook,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiHeart,
} from "react-icons/fi";

const About = () => {
  const highlights = [
    {
      icon: <FiCode className="text-xl" />,
      title: "Full-Stack Development",
      description:
        "Modern web applications with React, Node.js, and cloud technologies",
    },
    {
      icon: <FiLayers className="text-xl" />,
      title: "UI/UX Design",
      description:
        "User-centered designs that balance aesthetics and functionality",
    },
    {
      icon: <FiTrendingUp className="text-xl" />,
      title: "Performance Focus",
      description:
        "Optimized solutions for speed, scalability, and user experience",
    },
    {
      icon: <FiBook className="text-xl" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices",
    },
  ];

  const stats = [
    { value: "2+", label: "Years Experience", icon: <FiClock /> },
    { value: "15+", label: "Projects Completed", icon: <FiCode /> },
    { value: "100%", label: "Client Satisfaction", icon: <FiHeart /> },
    { value: "10+", label: "Technologies", icon: <FiAward /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative py-24 bg-gray-50 text-gray-800 dark:bg-black dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-300/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/10 dark:bg-cyan-500/3 rounded-full blur-3xl" />
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
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
              About Me
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-secondary">
            Crafting Digital{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-lato">
            Passionate developer dedicated to creating innovative digital
            solutions that make a meaningful impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 font-secondary">
                My Journey
              </h3>

              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-lato">
                <p>
                  Hello, I'm{" "}
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                    Muhammed Sahel CP
                  </span>
                  , a dedicated full-stack developer passionate about creating
                  exceptional digital experiences.
                </p>
                <p>
                  My journey began with curiosity about how technology shapes
                  our world, leading me to master modern web development.
                </p>
                <p>
                  I believe in clean code, user-centered design, and constant
                  innovation. Every project is a step forward.
                </p>
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(34, 211, 238, 0.4)",
                    transition: { duration: 0.2 },
                  }}
                  className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-sm"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg font-secondary">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-lato">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  className="text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 font-secondary">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm font-medium font-lato">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-500/10 dark:to-blue-600/10 border border-cyan-100 dark:border-cyan-500/20 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 mt-1">
                  <FiUsers className="text-xl" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 font-secondary">
                    Collaborative Approach
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-lato">
                    I believe the best results come from collaboration, clear
                    communication, and shared vision.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 font-secondary"
              >
                <span>Start a Conversation</span>
                <FiUsers className="text-lg" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
