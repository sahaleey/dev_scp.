import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
  FiHeart,
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
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: "https://github.com/sahaleey",
      name: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-gray-200",
    },
    {
      icon: <FiLinkedin />,
      url: "https://www.linkedin.com/in/muhammed-sahel-cp-12930b367/",
      name: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: <FiTwitter />,
      url: "https://x.com/Dm_Sahal",
      name: "Twitter",
      color: "hover:text-sky-500 dark:hover:text-sky-400",
    },
    {
      icon: <FiMail />,
      url: "mailto:ajua46244@gmail.com",
      name: "Email",
      color: "hover:text-red-500 dark:hover:text-red-400",
    },
  ];

  const quickLinks = [
    { icon: <FaHome />, name: "Home", href: "#hero" },
    { icon: <SiAboutdotme />, name: "About", href: "#about" },
    { icon: <AiFillProject />, name: "Projects", href: "#projects" },
    { icon: <SiSkillshare />, name: "Skills", href: "#skills" },
    { icon: <MdContacts />, name: "Contact", href: "#contact" },
  ];

  const techStack = [
    { icon: <FaReact />, name: "React", color: "text-blue-400" },
    { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-600" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", color: "text-cyan-400" },
    { icon: <SiFramer />, name: "Framer Motion", color: "text-purple-500" },
    { icon: <FaNodeJs />, name: "Node.js", color: "text-green-500" },
    {
      icon: <SiVercel />,
      name: "Vercel",
      color: "text-black dark:text-gray-300",
    },
  ];

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    floatX.set((x - window.innerWidth / 2) / 80);
    floatY.set((y - window.innerHeight / 2) / 80);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <footer
      className="relative 
      bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/40
      dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-900 dark:to-[#0f172a]
      border-t border-gray-200/50 dark:border-gray-800/60
      overflow-hidden transition-all duration-700"
    >
      {/* Background grid and floating glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{
            x: useTransform(floatX, (v) => v * 2),
            y: useTransform(floatY, (v) => v * 2),
          }}
          animate={{
            background: [
              "radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-30"
          style={{
            x: useTransform(floatX, (v) => -v * 1.5),
            y: useTransform(floatY, (v) => -v * 1.5),
          }}
          animate={{
            background: [
              "radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
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
            {/* About */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div whileHover={{ x: 3 }}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-main">
                  Muhammed{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Sahel CP
                  </span>
                </h3>
              </motion.div>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-lato">
                Crafting clean, meaningful digital experiences with modern web
                technologies and design clarity.
              </p>

              {/* Social */}
              <motion.div className="flex gap-4" variants={containerVariants}>
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-2xl 
                      bg-white/80 dark:bg-gray-800/70 
                      backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50
                      text-gray-600 dark:text-gray-400 ${social.color}
                      transition-all duration-300 hover:shadow-md hover:scale-110`}
                    whileHover={{ y: -5 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-secondary font-bold text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 
                      transition-colors flex items-center gap-3 group 
                      py-2 px-3 rounded-lg hover:bg-blue-50/70 dark:hover:bg-gray-800/50
                      backdrop-blur-sm"
                    >
                      <motion.span
                        className="group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 15 }}
                      >
                        {link.icon}
                      </motion.span>
                      <span className="font-medium font-lato">{link.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-secondary">
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3 p-3 rounded-xl
                    bg-white/80 dark:bg-gray-800/70 
                    backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50
                    hover:shadow-md transition-all duration-300 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.div
                      className={`${tech.color} group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 15 }}
                    >
                      {tech.icon}
                    </motion.div>
                    <span className="text-gray-800 dark:text-gray-300 font-medium font-lato">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-300/60 dark:border-gray-700/50 my-12"
          />

          {/* Bottom */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-400 font-lato text-sm"
            >
              <span>© {new Date().getFullYear()} Muhammed Sahel CP.</span>
              <span>All rights reserved.</span>
            </motion.div>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 
              text-gray-700 dark:text-gray-400 
              hover:text-blue-600 dark:hover:text-cyan-400 
              transition-colors group
              bg-white/80 dark:bg-gray-800/70 
              backdrop-blur-md px-4 py-2 rounded-xl
              border border-gray-200/50 dark:border-gray-700/50
              hover:shadow-md"
              whileHover={{ y: -3, scale: 1.05 }}
            >
              <span className="font-medium font-secondary">Back to top</span>
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
      </div>
    </footer>
  );
};

export default Footer;
