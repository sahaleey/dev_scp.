import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
} from "react-icons/fi";
import { Link } from "react-scroll";

/* ================= CONFIG ================= */

const CONFIG = {
  name: "Muhammed Sahel CP",
  title: "Full-Stack Developer",
  description:
    "I craft immersive digital experiences that blend beautiful design with cutting-edge technology. Let's build something extraordinary together.",
  socialLinks: [
    {
      icon: <FiGithub />,
      url: "https://github.com/sahaleey",
      name: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-gray-300",
    },
    {
      icon: <FiLinkedin />,
      url: "https://www.linkedin.com/in/muhammed-sahel-cp-12930b367/",
      name: "LinkedIn",
      color: "hover:text-blue-700 dark:hover:text-blue-400",
    },
    {
      icon: <FiTwitter />,
      url: "https://x.com/Dm_Sahal",
      name: "Twitter",
      color: "hover:text-sky-700 dark:hover:text-sky-400",
    },
    {
      icon: <FiMail />,
      url: "mailto:ajua46244@gmail.com",
      name: "Email",
      color: "hover:text-red-700 dark:hover:text-red-400",
    },
  ],
  cta: {
    primary: { text: "View My Work", target: "projects" },
    secondary: { text: "Get In Touch", target: "contact" },
  },
};

/* ================= HERO ================= */

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    setMounted(true);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="
        relative min-h-screen flex items-center justify-center
        bg-gradient-to-b from-white to-gray-50
        dark:from-black dark:to-gray-900
        overflow-hidden transition-colors duration-500
      "
    >
      {/* Background Effects */}
      <StarField />
      <BackgroundGrid />
      <GradientWaves />
      <AnimatedGradient mouseX={mouseX} mouseY={mouseY} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-20">
          {/* Left */}
          <div className="w-full md:w-1/2 text-center md:text-left mt-10">
            <NameTitle />
            <Description />
            <CTASection />
            <SocialLinks />
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2 flex max-sm:mt-20 justify-center md:justify-end">
            <ProfilePhoto />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
};

/* ================= BACKGROUND ================= */

const BackgroundGrid = () => (
  <div className="absolute inset-0 opacity-5 dark:opacity-15">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
  </div>
);

const GradientWaves = () => (
  <motion.div
    className="absolute inset-0"
    animate={{
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{ backgroundSize: "300% 300%" }}
  />
);

const StarField = () => {
  const stars = Array.from({ length: 60 });

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white/50 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 5, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AnimatedGradient = ({ mouseX, mouseY }) => {
  const x = useTransform(mouseX, (v) => `${v}px`);
  const y = useTransform(mouseY, (v) => `${v}px`);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: useTransform(
          [x, y],
          ([lx, ly]) =>
            `radial-gradient(circle at ${lx} ${ly}, rgba(63,146,244,0.15), transparent 60%)`
        ),
      }}
    />
  );
};

/* ================= CONTENT ================= */

const Badge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
    className="
      inline-flex items-center gap-2 px-4 py-2 mb-6
      rounded-full bg-blue-500/10 border border-blue-500/20
      text-blue-600 dark:text-blue-400
    "
  >
    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
    <span className="text-sm font-medium">Available for new projects</span>
  </motion.div>
);

const ProfilePhoto = () => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
    // Changed sizes: Bigger on desktop (w-80 h-80), smaller on mobile (w-48 h-48)
    className="relative w-48 h-48 md:w-80 md:h-80 group cursor-pointer"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500" />
    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900">
      <img
        src="/image/me.png"
        alt="Muhammed Sahel CP"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  </motion.div>
);
const NameTitle = () => {
  const roles = [
    "Full-Stack Developer",
    "UI Designer",
    "Tech Enthusiast",
    "Creative Coder",
  ];
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    let typingSpeed = isDeleting ? 50 : 120;

    const handleTyping = () => {
      setText((prev) =>
        isDeleting
          ? current.substring(0, prev.length - 1)
          : current.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === current) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className="mb-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-bold 
        bg-gradient-to-r from-gray-900 to-gray-700 
        dark:from-white dark:to-gray-300 
        bg-clip-text text-transparent mb-4 font-main"
      >
        {CONFIG.name}
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl font-semibold text-gray-800 font-secondary dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="ml-1 text-blue-600 dark:text-blue-400"
        >
          |
        </motion.span>
      </motion.p>
    </div>
  );
};

const Description = () => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="text-lg text-gray-700 dark:text-gray-300 
    max-w-2xl leading-relaxed mb-12 font-secondary
    mx-auto md:mx-0"
  >
    {CONFIG.description}
  </motion.p>
);

const CTASection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-16"
  >
    <Link
      to={CONFIG.cta.primary.target}
      spy
      smooth
      duration={500}
      className="group relative inline-flex items-center gap-3 px-8 py-4 
      bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl 
      transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
    >
      {CONFIG.cta.primary.text}
      <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
    </Link>

    <Link
      to={CONFIG.cta.secondary.target}
      spy
      smooth
      duration={500}
      className="inline-flex items-center gap-3 px-8 py-4 
      border border-gray-300 dark:border-gray-600 
      hover:border-gray-500 dark:hover:border-gray-400 
      text-gray-800 dark:text-gray-300 
      hover:text-gray-900 dark:hover:text-white 
      font-semibold rounded-xl transition-all duration-300 
      bg-white/70 dark:bg-transparent backdrop-blur-sm cursor-pointer"
    >
      {CONFIG.cta.secondary.text}
    </Link>
  </motion.div>
);

const SocialLinks = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8 }}
    className="flex justify-center md:justify-start gap-6"
  >
    {CONFIG.socialLinks.map((link, index) => (
      <motion.a
        key={link.name}
        href={link.url.trim()}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 text-gray-600 dark:text-gray-400 ${link.color} 
        transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5`}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 + index * 0.1 }}
      >
        {link.icon}
      </motion.a>
    ))}
  </motion.div>
);

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 }}
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400"
    >
      <FiArrowRight className="rotate-90" />
    </motion.div>
  </motion.div>
);

export default Hero;
