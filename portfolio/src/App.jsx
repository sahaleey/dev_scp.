import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Footer from "./components/Footer";
// import Testimonials from "./components/Testimonial";
import EnhancedContact from "./pages/EnhancedContact";
import { HeroMarquee } from "./components/ui/TextVelocity";

function App() {
  const containerRef = useRef(null);

  // Enhanced scroll tracking
  const { scrollYProgress, scrollY } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });
  // Smooth scroll progress indicator
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate scroll velocity for dynamic effects
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Dynamic background based on scroll velocity
  const backgroundColor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    ["#f0f4ff", "#ffffff", "#fff0f5"]
  );

  // Modern section animation variants
  const sectionVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <>
      <motion.div
        className="min-h-screen relative"
        style={{ backgroundColor }}
        ref={containerRef}
      >
        <Navbar scrollProgress={scrollYProgress} />

        <main className="overflow-hidden">
          <Hero scrollYProgress={scrollYProgress} />

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.25 }}
            variants={sectionVariants}
          >
            <About />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <Projects scrollVelocity={smoothVelocity} />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
          >
            <HeroMarquee
              texts={["Digital Innovator", "UI/UX Designer", "Problem Solver"]}
              gradient={true}
            />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              ...sectionVariants,
              onscreen: {
                ...sectionVariants.onscreen,
                transition: {
                  ...sectionVariants.onscreen.transition,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <Skills />
          </motion.section>

          <motion.section
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              offscreen: { opacity: 0, scale: 0.95 },
              onscreen: {
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                  mass: 0.5,
                },
              },
            }}
          >
            <EnhancedContact />
          </motion.section>

          <Footer scrollProgress={scrollYProgress} />
        </main>
      </motion.div>
    </>
  );
}

export default App;
