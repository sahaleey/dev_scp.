import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";
import { FaReact, FaNodeJs, FaHome } from "react-icons/fa";
import {
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiVercel,
  SiSkillshare,
  SiAboutdotme,
} from "react-icons/si";
import { AiFillProject } from "react-icons/ai";
import { MdContacts } from "react-icons/md";

import { useEffect, useState } from "react";

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const controls = useAnimation();
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: "https://github.com/crazydrace",
      name: "GitHub",
    },
    {
      icon: <FiLinkedin />,
      url: "https://www.linkedin.com/in/muhammed-sahel-cp-12930b367/",
      name: "LinkedIn",
    },
    { icon: <FiTwitter />, url: "https://x.com/Dm_Sahal", name: "Twitter" },
    { icon: <FiMail />, url: "mailto:ajua46244@gmail.com", name: "Email" },
  ];

  const quickLinks = [
    { icon: <FaHome />, name: "Home", href: "#hero" },
    { icon: <SiAboutdotme />, name: "About", href: "#about" },
    { icon: <AiFillProject />, name: "Projects", href: "#projects" },
    { icon: <SiSkillshare />, name: "Skills", href: "#skills" },
    { icon: <MdContacts />, name: "Contact", href: "#contact" },
  ];

  const techStack = [
    { icon: <FaReact className="text-blue-400" />, name: "React" },
    { icon: <SiTypescript className="text-blue-600" />, name: "TypeScript" },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
    { icon: <SiFramer className="text-purple-500" />, name: "Framer Motion" },
    { icon: <FaNodeJs className="text-green-500" />, name: "Node.js" },
    { icon: <SiVercel className="text-white" />, name: "Vercel" },
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

    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <footer className="relative bg-[#0c0c0f] border-t border-gray-800 overflow-hidden">
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
        {techStack.map((tech, i) => (
          <motion.div
            key={i}
            className="absolute text-xl z-0"
            style={{
              color: tech.icon.props.className?.includes("blue-400")
                ? "#3f92f4"
                : tech.icon.props.className?.includes("cyan-400")
                ? "#22d3ee"
                : tech.icon.props.className?.includes("purple-500")
                ? "#a855f7"
                : tech.icon.props.className?.includes("green-500")
                ? "#22c55e"
                : tech.icon.props.className?.includes("blue-600")
                ? "#2563eb"
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
            {tech.icon}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* About Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  Muhammed <span className="text-cyan-400">Sahel CP</span>
                </h3>
              </motion.div>
              <p className="text-gray-400">
                Crafting exceptional digital experiences with modern web
                technologies and creative design.
              </p>

              {/* Social Links */}
              <motion.div className="flex gap-4" variants={containerVariants}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all relative overflow-hidden group"
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredLink(index)}
                    onMouseLeave={() => setHoveredLink(null)}
                    title={social.name}
                  >
                    {social.icon}
                    <motion.span
                      className="absolute bottom-0 left-1/2 h-0.5 bg-cyan-400 -translate-x-1/2"
                      initial={{ width: 0 }}
                      animate={{
                        width: hoveredLink === index ? "80%" : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.p
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                    >
                      {link.icon}
                      {link.name}
                    </a>
                  </motion.p>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-white">Tech Stack</h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tech.icon}
                    </motion.div>
                    <span className="text-gray-300">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-800 my-12"
          />

          {/* Bottom Section */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <motion.p variants={itemVariants} className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Muhammed Sahel CP. All rights
              reserved.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <motion.button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to top
                <motion.span
                  className="group-hover:-translate-y-1 transition-transform"
                  animate={{
                    y: [0, -3, 0],
                    transition: { repeat: Infinity, duration: 2 },
                  }}
                >
                  <FiArrowUp />
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
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

export default Footer;
