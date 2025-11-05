import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";

// Constants for easier maintenance
const AUTO_ROTATE_INTERVAL = 8000;
const RESUME_AUTO_ROTATE_DELAY = 20000;
const ANIMATION_DURATION = 0.7;
const EASING = [0.33, 1, 0.68, 1];

const StarRating = ({ rating }) => (
  <div className="flex gap-1 mb-6">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        custom={i}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
              delay: i * 0.1,
              duration: 0.3,
              type: "spring",
              stiffness: 300,
            },
          }),
        }}
        initial="hidden"
        animate="visible"
      >
        <svg
          className={`w-6 h-6 ${
            i < rating ? "text-yellow-400" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </motion.div>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, direction }) => {
  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: ANIMATION_DURATION,
        ease: EASING,
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.92,
      transition: {
        duration: ANIMATION_DURATION * 0.85,
        ease: EASING,
      },
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={testimonialVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-10 border border-gray-700 relative overflow-hidden"
    >
      <FaQuoteLeft className="absolute top-8 left-8 text-blue-500/10 text-6xl" />
      <FaQuoteRight className="absolute bottom-8 right-8 text-blue-500/10 text-6xl" />

      <StarRating rating={testimonial.rating} />

      <motion.p
        className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {testimonial.content}
      </motion.p>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </motion.div>

          <div>
            <motion.h4
              className="text-xl font-semibold text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {testimonial.name}
            </motion.h4>
            <motion.p
              className="text-blue-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {testimonial.role}
            </motion.p>
          </div>
        </div>

        <motion.div
          className="bg-gray-700/50 rounded-lg px-4 py-2 border border-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-sm text-gray-400">Project:</p>
          <p className="font-medium text-white">{testimonial.project}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const NavigationButton = ({ direction, onClick }) => (
  <motion.button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-800 border border-gray-700 hover:bg-blue-500/20 hover:border-blue-400/30 transition-all ${
      direction === "prev"
        ? "left-0 -translate-x-4 md:-translate-x-8"
        : "right-0 translate-x-4 md:translate-x-8"
    }`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label={
      direction === "prev" ? "Previous testimonial" : "Next testimonial"
    }
  >
    <svg
      className="w-6 h-6 text-gray-400 hover:text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  </motion.button>
);

const PaginationDots = ({ count, activeIndex, onClick }) => (
  <div className="flex justify-center gap-2 mt-10">
    {[...Array(count)].map((_, index) => (
      <button
        key={index}
        onClick={() => onClick(index)}
        className={`w-3 h-3 rounded-full transition-all ${
          index === activeIndex
            ? "bg-blue-500 w-6"
            : "bg-gray-600 hover:bg-gray-500"
        }`}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ))}
  </div>
);

const Testimonials = ({ testimonials }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleNavigation = useCallback(
    (newIndex) => {
      setDirection(newIndex > activeTestimonial ? 1 : -1);
      setActiveTestimonial(newIndex);
      setAutoRotate(false);
      setTimeout(() => setAutoRotate(true), RESUME_AUTO_ROTATE_DELAY);
    },
    [activeTestimonial]
  );

  const handlePrev = useCallback(() => {
    handleNavigation(
      activeTestimonial === 0 ? testimonials.length - 1 : activeTestimonial - 1
    );
  }, [activeTestimonial, testimonials.length, handleNavigation]);

  const handleNext = useCallback(() => {
    handleNavigation(
      activeTestimonial === testimonials.length - 1 ? 0 : activeTestimonial + 1
    );
  }, [activeTestimonial, testimonials.length, handleNavigation]);

  useEffect(() => {
    if (!autoRotate || !inView) return;

    const interval = setInterval(() => {
      setDirection(1);
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [autoRotate, testimonials.length, inView]);

  return (
    <section
      id="testimonials"
      className="relative py-32 px-4 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden"
      ref={ref}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASING }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Endorsements
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Professional feedback from colleagues and clients
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence custom={direction} initial={false}>
              <TestimonialCard
                key={activeTestimonial}
                testimonial={testimonials[activeTestimonial]}
                direction={direction}
              />
            </AnimatePresence>

            <NavigationButton direction="prev" onClick={handlePrev} />
            <NavigationButton direction="next" onClick={handleNext} />
          </div>

          <PaginationDots
            count={testimonials.length}
            activeIndex={activeTestimonial}
            onClick={handleNavigation}
          />
        </div>
      </div>
    </section>
  );
};

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      project: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Testimonials;
