import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useAnimation,
} from "framer-motion";
import {
  FiArrowRight,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiLayers,
  FiFigma,
  FiDatabase,
} from "react-icons/fi";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-scroll";
import RotatingText from "./RotatingText";
import TextPressure from "./ui/text-pressure";
import HeroImage from "./ui/HeroImage";
import { SiTypescript, SiReact } from "react-icons/si";

// Configurations
const CONFIG = {
  socialLinks: [
    { icon: <FiGithub />, url: "https://github.com/sahaleey", name: "GitHub" },
    { icon: <FiLinkedin />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <FiTwitter />, url: "https://twitter.com", name: "Twitter" },
  ],
  techStack: [
    { icon: <SiReact />, name: "React", color: "#61DAFB" },
    { icon: <FiLayers />, name: "Node.js", color: "#68A063" },
    { icon: <FiFigma />, name: "Figma", color: "#A259FF" },
    { icon: <FiDatabase />, name: "MongoDB", color: "#4DB33D" },
    { icon: <SiTypescript />, name: "TypeScript", color: "#3178C6" },
  ],
  rotatingTitles: [
    "Full-Stack Dev",
    "Creative Coder",
    "Interface Alchemist",
    "Frontend Wizard",
    "UI/UX Designer",
    "Digital Creator",
    "Problem Solver",
    "Tech Enthusiast",
  ],
  heroDescription:
    "I craft immersive digital experiences that blend beautiful design with cutting-edge technology. Let's build something extraordinary together.",
};

// Main Component
const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Animation values
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const opacity = useMotionValue(0);

  // Handle mouse movement for parallax effects
  const handleMouseMove = useCallback(
    (e) => {
      const { clientX: x, clientY: y } = e;
      setCursorPos({ x, y });
      floatX.set((x - window.innerWidth / 2) / 50);
      floatY.set((y - window.innerHeight / 2) / 50);
    },
    [floatX, floatY]
  );

  // Initialize animations
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    animate(opacity, 1, { duration: 1.5 });

    // Background animation sequence
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove, opacity, controls]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full pt-24 md:pt-36 pb-16 bg-[#0c0c0f] text-white overflow-hidden scroll-mt-20"
      id="hero"
    >
      {/* Animated Background Elements */}
      <BackgroundElements
        floatX={floatX}
        floatY={floatY}
        techStack={CONFIG.techStack}
      />

      {/* Cursor Trail Effect */}
      <CursorTrail cursorPos={cursorPos} isHovered={isHovered} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Text Content */}
          <HeroContent
            isHovered={isHovered}
            setIsHovered={setIsHovered}
            config={CONFIG}
          />

          {/* Avatar/Illustration */}
          {/* <HeroAvatar controls={controls} /> */}
        </div>
      </div>

      {/* Floating Tech Labels */}
      <TechLabels techStack={CONFIG.techStack} />

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </motion.section>
  );
};

// Sub-components

const BackgroundElements = ({ floatX, floatY, techStack }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setIsAnimating((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0f]/80 to-[#0c0c0f] z-0" />

      {/* Animated Blobs */}
      <FloatingBlob
        x={floatX}
        y={floatY}
        opacity={useTransform(floatY, [-10, 0, 10], [0.3, 0.5, 0.3])}
        scaleAnim={isAnimating ? [1, 1.2, 1] : [1, 0.8, 1]}
        className="top-1/4 left-1/4 w-16 h-16 bg-[#3f92f4]/10"
      />
      <FloatingBlob
        x={useTransform(floatX, (x) => -x * 1.5)}
        y={useTransform(floatY, (y) => -y * 1.5)}
        scaleAnim={isAnimating ? [1, 1.3, 1] : [1, 0.7, 1]}
        className="bottom-1/3 right-1/4 w-24 h-24 bg-[#715adf]/10"
      />

      {/* Floating Tech Icons */}
      {techStack.map((tech, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl z-0"
          style={{
            top: `${15 + i * 15}%`,
            left: `${10 + i * 10}%`,
            color: tech.color,
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
    </>
  );
};

const CursorTrail = ({ cursorPos, isHovered }) => (
  <motion.div
    className="fixed w-8 h-8 rounded-full bg-[#3f92f4]/20 pointer-events-none z-50"
    style={{
      left: cursorPos.x - 16,
      top: cursorPos.y - 16,
      mixBlendMode: "screen",
    }}
    animate={{
      scale: isHovered ? [1, 2, 1.5] : 1,
      opacity: isHovered ? [0.3, 0.8, 0.5] : 0.3,
    }}
    transition={{
      scale: { duration: 0.5, type: "spring", damping: 10, stiffness: 100 },
      opacity: { duration: 0.3 },
    }}
  />
);

const HeroContent = ({ isHovered, setIsHovered, config }) => (
  <motion.div
    className="w-full lg:w-1/2 text-center lg:text-left"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.8 }}
  >
    {/* Greeting Text */}
    <GreetingText />

    {/* Name with Pressure Animation */}
    <TextPressure
      text="Muhammed Sahal CP"
      flex
      italic
      textColor="#fff"
      minFontSize={48}
      className="leading-tight text-4xl sm:text-5xl md:text-6xl"
    />

    {/* Rotating Title */}
    <RotatingTitle titles={config.rotatingTitles} />

    {/* Description */}
    <HeroDescription text={config.heroDescription} />

    {/* Call-to-Action Buttons */}
    <CTAButtons isHovered={isHovered} setIsHovered={setIsHovered} />

    {/* Social Links */}
    <SocialLinks socialLinks={config.socialLinks} />
  </motion.div>
);

const GreetingText = () => (
  <motion.p
    className="text-sm tracking-wider uppercase text-blue-400 mb-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 1 }}
  >
    <TypewriterEffect text="Hey there, I'm" delay={0.1} />
  </motion.p>
);

const RotatingTitle = ({ titles }) => (
  <motion.div
    className="mt-4 flex flex-col lg:flex-row items-center gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.8 }}
  >
    <p className="font-bold text-3xl sm:text-4xl md:text-5xl">I am</p>
    <RotatingText
      texts={titles}
      mainClassName="px-3 py-1 bg-gradient-to-r from-[#715adf] to-[#3f92f4] text-black rounded-lg text-3xl sm:text-4xl md:text-5xl font-bold"
      staggerFrom="last"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-0.5"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={3000}
    />
  </motion.div>
);

const HeroDescription = ({ text }) => (
  <motion.p
    className="mt-6 text-gray-300 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.8 }}
  >
    <TypewriterEffect
      text={text}
      delay={0.8}
      speed={0.03}
      className="leading-relaxed"
    />
  </motion.p>
);

const CTAButtons = ({ isHovered, setIsHovered }) => (
  <motion.div
    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 0.8 }}
  >
    <Link
      to="projects"
      spy
      smooth
      duration={500}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#3f92f4] to-[#7555dd] hover:to-[#5a40b4] text-white font-semibold shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_5px_rgba(63,146,244,0.3)]"
    >
      <span className="relative z-10">View My Projects</span>
      <motion.span
        animate={{ x: isHovered ? 8 : 0 }}
        transition={{ type: "spring", stiffness: 500 }}
        className="relative z-10 text-xl"
      >
        <FiArrowRight />
      </motion.span>
      <span className="absolute inset-0 bg-gradient-to-r from-[#3f92f4] to-[#7555dd] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate" />
    </Link>

    <a
      href="#contact"
      className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#3f92f4] text-[#3f92f4] hover:text-white font-semibold transition-all duration-300 overflow-hidden"
    >
      <span className="relative z-10">Let's Connect</span>
      <span className="absolute inset-0 bg-[#3f92f4] z-0 w-0 group-hover:w-full transition-all duration-300" />
    </a>
  </motion.div>
);

const SocialLinks = ({ socialLinks }) => (
  <motion.div
    className="mt-12 flex gap-4 justify-center lg:justify-start"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.8 }}
  >
    {socialLinks.map((link, i) => (
      <motion.a
        key={i}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-3 text-xl text-gray-400 hover:text-white transition-colors duration-300 group"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.9 }}
        title={link.name}
      >
        {link.icon}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#3f92f4] to-[#715adf] w-0 group-hover:w-full transition-all duration-300" />
      </motion.a>
    ))}
  </motion.div>
);

// const HeroAvatar = ({ controls }) => (
//   <motion.div
//     className="w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0"
//     initial={{ opacity: 0, x: 50 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay: 0.4, duration: 0.8 }}
//   >
//     <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#3f92f4] to-[#715adf] p-1 shadow-[0_0_40px_10px_rgba(63,146,244,0.2)]">
//       <div className="relative w-full h-full rounded-full bg-[#0c0c0f] overflow-hidden flex items-center justify-center">
//         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,_transparent_25%,_rgba(63,146,244,0.2)_50%,_transparent_75%)] bg-[length:250%_250%] animate-[shimmer_8s_linear_infinite]" />
//         <motion.div className="text-8xl sm:text-9xl" animate={controls}>
//           <HeroImage />;
//         </motion.div>
//       </div>
//     </div>
//   </motion.div>
// );

const TechLabels = ({ techStack }) => (
  <div className="hidden md:block">
    {techStack.map((tech, i) => (
      <motion.div
        key={i}
        className="fixed text-xs text-gray-400 font-mono z-0"
        style={{
          top: `${20 + i * 15}%`,
          right: `${5 + i * 3}%`,
          color: tech.color,
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ delay: 1.5 + i * 0.2, duration: 0.8 }}
      >
        <TypewriterEffect text={tech.name} delay={1.5 + i * 0.2} speed={0.1} />
      </motion.div>
    ))}
  </div>
);

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.8 }}
  >
    <div className="text-sm text-gray-400 mb-2">Scroll Down</div>
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <FiArrowRight className="rotate-90 text-gray-400" size={20} />
    </motion.div>
  </motion.div>
);

const FloatingBlob = ({ x, y, opacity, scaleAnim, className }) => (
  <motion.div
    className={`absolute rounded-full blur-xl z-0 ${className}`}
    style={{ x, y, opacity }}
    animate={{ scale: scaleAnim }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

const TypewriterEffect = ({
  text,
  delay = 0,
  speed = 0.05,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingTimer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText((prev) => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed * 1000);

      return () => clearInterval(typingInterval);
    }, delay * 1000);

    return () => clearTimeout(typingTimer);
  }, [text, delay, speed]);

  return <span className={className}>{displayedText}</span>;
};

// Global CSS (to be added to your global stylesheet)
/*
@keyframes shimmer {
  0% { background-position: -100% -100%; }
  100% { background-position: 200% 200%; }
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
*/

export default Hero;
