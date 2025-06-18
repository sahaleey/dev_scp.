import { motion } from "framer-motion";
import { FiCode, FiServer, FiTool } from "react-icons/fi";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FiCode className="text-2xl" />,
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "Tailwind CSS", level: 88 },
      ],
    },
    {
      title: "Backend Development",
      icon: <FiServer className="text-2xl" />,
      skills: [
        { name: "Node.js", level: 82 },
        { name: "Express", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "REST APIs", level: 85 },
      ],
    },
    {
      title: "Tools & Others",
      icon: <FiTool className="text-2xl" />,
      skills: [
        { name: "Git", level: 88 },
        { name: "UI/UX Design", level: 85 },
        { name: "Responsive Design", level: 92 },
        { name: "Performance Optimization", level: 80 },
      ],
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const progressBar = {
    hidden: { width: 0 },
    show: (level) => ({
      width: `${level}%`,
      transition: { duration: 1, ease: "backOut" },
    }),
  };

  return (
    <section
      id="skills"
      className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="section-title text-center text-4xl font-bold mb-4 text-white">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Skills
            </span>
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to create exceptional digital
            experiences
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-700 group-hover:from-cyan-500 group-hover:to-blue-600 transition-all duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={item}
                    className="group"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        custom={skill.level}
                        variants={progressBar}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          skill.level > 85
                            ? "bg-gradient-to-r from-green-400 to-cyan-500"
                            : skill.level > 70
                            ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                            : "bg-gradient-to-r from-blue-400 to-indigo-500"
                        } shadow-md shadow-cyan-500/20`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating tech icons decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: [0, 0.1, 0],
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
              className="absolute text-gray-700 text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {["</>", "{ }", "=>", "()", "[]"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
