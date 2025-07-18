import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  FiAward,
  FiCode,
  FiLayers,
  FiUsers,
  FiBook,
  FiGlobe,
  FiCpu,
  FiZap,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import TextPressure from "./ui/text-pressure";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFact, setActiveFact] = useState(0);
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const quickFacts = [
    {
      icon: <FiCode className="text-xl" />,
      text: "Full Stack Developer",
      color: "#3f92f4",
    },
    {
      icon: <FiLayers className="text-xl" />,
      text: "UI/UX Design Passionate",
      color: "#715adf",
    },
    {
      icon: <FiBook className="text-xl" />,
      text: "Continuous Learner",
      color: "#51cf66",
    },
    {
      icon: <FiUsers className="text-xl" />,
      text: "Team Player",
      color: "#ff6b6b",
    },
    {
      icon: <FiAward className="text-xl" />,
      text: "Web Design Enthusiast",
      color: "#fcc419",
    },
  ];

  const stats = [
    { value: "10+", label: "Projects", icon: <FiGlobe /> },
    { value: "10k+", label: "Lines of Code", icon: <FiCode /> },
    { value: "99%", label: "Satisfaction", icon: <FiZap /> },
    { value: "24/7", label: "Learning", icon: <FiCpu /> },
  ];

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    floatX.set((x - window.innerWidth / 2) / 50);
    floatY.set((y - window.innerHeight / 2) / 50);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    animate(opacity, 1, { duration: 1.5 });

    // Auto-rotate quick facts
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % quickFacts.length);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen py-28 px-4 bg-[#0c0c0f] text-white overflow-hidden scroll-mt-20 md:scroll-mt-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingBlob
          x={floatX}
          y={floatY}
          opacity={useTransform(floatY, [-10, 0, 10], [0.3, 0.5, 0.3])}
          className="top-1/4 left-1/4 w-32 h-32 bg-[#3f92f4]/10"
        />
        <FloatingBlob
          x={useTransform(floatX, (x) => -x * 1.5)}
          y={useTransform(floatY, (y) => -y * 1.5)}
          className="bottom-1/3 right-1/4 w-40 h-40 bg-[#715adf]/10"
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-[#3f92f4]/10 to-[#715adf]/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(60px)",
            }}
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
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-6">
            <TextPressure
              text="About Me"
              flex
              textColor="#fff"
              minFontSize={48}
              className="leading-tight"
            />
          </h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover my journey, skills, and what drives my passion for creating
            digital experiences
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-[#3f92f4]/10 blur-xl z-0"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.h3
                className="text-3xl font-bold mb-6 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  My Story
                </span>
              </motion.h3>
            </div>

            <motion.div
              className="space-y-6 text-lg leading-relaxed text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p>
                Hello! I'm{" "}
                <span className="text-blue-400 font-medium">
                  Muhammed Sahel CP
                </span>
                , a passionate web designer and developer with a keen eye for
                creating beautiful and functional digital experiences.
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

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(63, 146, 244, 0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#3f92f4] to-[#715adf] text-white">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="relative bg-gray-900/50 border border-gray-800 rounded-2xl p-8 lg:p-10 backdrop-blur-sm overflow-hidden"
              whileHover="hover"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(63,146,244,0.1)_50%,_transparent_75%)] bg-[length:250%_250%] z-0"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="relative z-10">
                <motion.div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className="p-3 rounded-xl bg-gradient-to-br from-[#3f92f4] to-[#715adf] text-white"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FiAward className="text-xl" />
                  </motion.div>
                  <motion.h3 className="text-3xl font-bold">
                    Quick <span className="text-[#3f92f4]">Facts</span>
                  </motion.h3>
                </motion.div>

                <ul className="space-y-4">
                  {quickFacts.map((fact, index) => (
                    <motion.li
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                        index === activeFact ? "bg-gray-800/50" : ""
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      onMouseEnter={() => setActiveFact(index)}
                      onMouseLeave={() => setActiveFact(0)}
                    >
                      <motion.span
                        className={`p-3 rounded-lg ${
                          index === activeFact ? "text-white" : "text-gray-400"
                        }`}
                        style={{
                          background:
                            index === activeFact
                              ? fact.color + "20"
                              : "transparent",
                          border:
                            index === activeFact
                              ? `1px solid ${fact.color}30`
                              : "none",
                        }}
                        animate={{
                          scale: index === activeFact ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          duration: 0.5,
                          type: "spring",
                        }}
                      >
                        {fact.icon}
                      </motion.span>
                      <motion.span
                        className={`text-lg ${
                          index === activeFact ? "text-white" : "text-gray-400"
                        }`}
                        animate={{
                          x: index === activeFact ? [0, 5, 0] : 0,
                        }}
                        transition={{
                          duration: 0.5,
                          type: "spring",
                        }}
                      >
                        {fact.text}
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Floating tech icons */}
            {quickFacts.map((tech, i) => (
              <motion.div
                key={i}
                className="absolute text-xl z-0"
                style={{
                  color: tech.color,
                  top: `${10 + i * 15}%`,
                  right: `${5 + i * 5}%`,
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FloatingBlob = ({ x, y, opacity, className }) => (
  <motion.div
    className={`absolute rounded-full blur-xl z-0 ${className}`}
    style={{ x, y, opacity }}
    animate={{
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export default About;
