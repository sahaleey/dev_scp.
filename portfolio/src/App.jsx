import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
// import Testimonials from "./components/Testimonial";
import EnhancedContact from "./components/EnhancedContact";
import ScrollVelocity from "./components/ui/TextVelocity";

function App() {
  const containerRef = useRef(null);

  // Enhanced scroll tracking
  const { scrollYProgress, scrollY } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Working with Muhammed was transformative for our product team. His technical expertise and attention to detail helped us deliver our flagship project 3 weeks ahead of schedule while exceeding all quality metrics. His ability to translate complex requirements into elegant solutions is unparalleled.",
      avatar: "/avatar1.jpg",
      rating: 5,
      project: "Enterprise SaaS Platform",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO at StartupX",
      content:
        "Muhammed's frontend architecture skills helped us scale our user base from 10K to 500K MAU without performance degradation. He implemented cutting-edge optimizations that reduced our bundle size by 42% and improved Lighthouse scores from 65 to 92. His React patterns are now our team standard.",
      avatar: "/avatar2.jpg",
      rating: 5,
      project: "Consumer Web Application",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Lead at DesignHub",
      content:
        "Rarely do you find an engineer who combines technical mastery with such strong design sensibilities. Muhammed's implementation of our design system reduced UI inconsistencies by 78% and his accessibility improvements boosted our WCAG compliance to AA standard across the entire product suite.",
      avatar: "/avatar3.jpg",
      rating: 5,
      project: "Design System Implementation",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Director of Engineering at ScaleUp",
      content:
        "Muhammed led our migration from legacy Angular to Next.js, completing the transition 30% faster than projected. His architectural decisions reduced server costs by $18K/month while improving SEO rankings across all key terms. He mentored 5 junior developers during the process who are now core contributors.",
      avatar: "/avatar4.jpg",
      rating: 5,
      project: "Platform Modernization",
    },
  ];

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
    <motion.div
      className="min-h-screen relative"
      style={{ backgroundColor }}
      ref={containerRef}
    >
      {/* Enhanced scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{
          scaleX,
          opacity: useTransform(
            scrollYProgress,
            [0, 0.1, 0.9, 1],
            [0, 1, 1, 0]
          ),
        }}
      />

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
        {/* <motion.section
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <Testimonials testimonials={testimonials} />
        </motion.section> */}

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
          <ScrollVelocity
            texts={["Creative Developer", "React Wizard"]}
            className="custom-scroll-text bg-slate-900 p-5 "
            scrollVelocity={smoothVelocity}
            velocity={50}
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
  );
}

export default App;
