import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import EnhancedContact from "./components/EnhancedContact";
import Testimonials from "./components/Testimonial";
import IntroScreen from "./components/IntroScreen";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Animation variants for section transitions
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
        bounce: 0.4,
        duration: 1,
      },
    },
  };

  return (
    <div className="min-h-screen relative">
      {!introComplete && (
        <IntroScreen onComplete={() => setIntroComplete(true)} />
      )}
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="overflow-hidden">
        <Hero />

        <motion.section
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
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
          <Projects />
        </motion.section>

        <motion.section
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Skills />
        </motion.section>
        {/* <motion.section
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Testimonials />
        </motion.section> */}

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
                stiffness: 100,
                damping: 20,
              },
            },
          }}
        >
          <EnhancedContact />
        </motion.section>

        <Footer />
      </main>
    </div>
  );
}

export default App;
