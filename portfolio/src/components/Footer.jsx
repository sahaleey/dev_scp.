import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiFramer } from "react-icons/si";

const Footer = () => {
  const socialLinks = [
    { icon: <FiGithub />, url: "https://github.com/yourusername" },
    { icon: <FiLinkedin />, url: "https://linkedin.com/in/yourusername" },
    { icon: <FiTwitter />, url: "https://twitter.com/yourusername" },
  ];

  const techStack = [
    { icon: <FaReact className="text-blue-400" />, name: "React" },
    { icon: <SiTailwindcss className="text-cyan-400" />, name: "Tailwind CSS" },
    { icon: <SiFramer className="text-purple-400" />, name: "Framer Motion" },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 border-t border-gray-700">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
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

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* About section */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-4">
                Muhammed Sahel CP
              </h3>
              <p className="text-gray-400 mb-6">
                A passionate web designer and developer creating beautiful,
                functional digital experiences.
              </p>
              <motion.div
                className="flex space-x-4"
                variants={containerVariants}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-all"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Quick links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#hero" },
                  { name: "About", href: "#about" },
                  { name: "Projects", href: "#projects" },
                  { name: "Skills", href: "#skills" },
                  { name: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-4">Built With</h3>
              <ul className="space-y-3">
                {techStack.map((tech, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-3 text-gray-400"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {tech.icon}
                    <span>{tech.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-700 my-8"
          />

          {/* Bottom section */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-sm mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} Muhammed Sahel CP. All rights
              reserved.
            </motion.p>

            <motion.button
              variants={itemVariants}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="group-hover:translate-y-[-3px] transition-transform"
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
