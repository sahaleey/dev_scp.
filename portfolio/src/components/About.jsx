import { motion } from "framer-motion";
import { FiAward, FiCode, FiLayers, FiUsers, FiBook } from "react-icons/fi";

const About = () => {
  const quickFacts = [
    { icon: <FiCode className="text-xl" />, text: "Full Stack Developer" },
    { icon: <FiLayers className="text-xl" />, text: "UI/UX Design Passionate" },
    { icon: <FiBook className="text-xl" />, text: "Continuous Learner" },
    { icon: <FiUsers className="text-xl" />, text: "Team Player" },
    { icon: <FiAward className="text-xl" />, text: "Web Design Enthusiast" },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
    },
  };

  return (
    <section
      id="about"
      className="py-28 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
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
            className="absolute rounded-full bg-blue-500/10"
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="section-title text-center text-4xl font-bold mb-6 text-white"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Me
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={itemVariants}
              className="text-gray-300 space-y-6 text-lg leading-relaxed"
            >
              <p>
                Hello! I'm{" "}
                <span className="text-blue-400 font-medium">
                  Muhammed Sahel CP
                </span>
                , a passionate web designer and developer with a keen eye for
                creating beautiful and functional digital experiences. I enjoy
                turning complex problems into simple, beautiful, and intuitive
                designs.
              </p>
              <p>
                My journey in web development started with a curiosity about how
                websites work, which led me to dive deep into modern web
                technologies. I specialize in building responsive websites and
                web applications that provide seamless user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                contributing to open-source projects, or learning about the
                latest trends in web design and development.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative h-full">
              <motion.div
                variants={cardVariants}
                whileHover="hover"
                className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 h-full"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-semibold mb-6 text-white flex items-center gap-3"
                >
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-lg">
                    <FiAward className="text-white" />
                  </span>
                  Quick Facts
                </motion.h3>

                <ul className="space-y-4">
                  {quickFacts.map((fact, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="flex items-center gap-4 text-gray-300 group"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="bg-gray-700 group-hover:bg-cyan-500 group-hover:text-white p-2 rounded-lg transition-all duration-300">
                        {fact.icon}
                      </span>
                      <span className="group-hover:text-white transition-colors duration-300">
                        {fact.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-500 filter blur-3xl -z-10"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
