import { useRef, useEffect, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Custom hook for element width with better performance
const useElementWidth = (ref) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateWidth = () => {
      const newWidth = ref.current.scrollWidth || ref.current.offsetWidth;
      setWidth(newWidth);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return width;
};

// Single scrolling text component
const ScrollText = memo(
  ({
    text,
    speed = 60,
    direction = "left",
    copies = 6,
    className = "",
    textClassName = "",
    containerClassName = "",
  }) => {
    const baseX = useMotionValue(0);
    const containerRef = useRef(null);
    const copyRef = useRef(null);
    const containerWidth = useElementWidth(containerRef);
    const copyWidth = useElementWidth(copyRef);

    const animationRef = useRef();
    const directionFactor = direction === "left" ? -1 : 1;

    // Smooth scrolling animation
    const animate = useCallback(() => {
      if (copyWidth > 0 && containerWidth > 0) {
        const moveBy = directionFactor * speed * (16 / 1000); // 60fps
        const newX = baseX.get() + moveBy;

        // Wrap around logic
        if (directionFactor === -1 && newX <= -copyWidth) {
          baseX.set(newX + copyWidth);
        } else if (directionFactor === 1 && newX >= 0) {
          baseX.set(newX - copyWidth);
        } else {
          baseX.set(newX);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }, [speed, directionFactor, copyWidth, containerWidth, baseX]);

    useEffect(() => {
      animationRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationRef.current);
    }, [animate]);

    const x = useTransform(baseX, (value) => `${value}px`);

    return (
      <div
        ref={containerRef}
        className={`overflow-hidden ${containerClassName}`}
      >
        <motion.div
          className={`flex whitespace-nowrap ${className}`}
          style={{ x }}
          aria-hidden="true"
        >
          {Array.from({ length: copies }).map((_, index) => (
            <span
              key={index}
              ref={index === 0 ? copyRef : null}
              className={`flex-shrink-0 px-4 ${textClassName}`}
            >
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }
);

ScrollText.displayName = "ScrollText";

// Main component with multiple text lines
const ScrollVelocity = memo(
  ({
    texts = ["Creative Developer", "React Wizard"],
    speed = 60,
    copies = 6,
    className = "",
    textClassName = "text-3xl md:text-5xl font-bold tracking-tight",
    containerClassName = "",
    alternateDirections = true,
  }) => {
    return (
      <section
        className={`pointer-events-none select-none ${containerClassName}`}
        aria-hidden="true"
      >
        {texts.map((text, index) => (
          <ScrollText
            key={`${text}-${index}`}
            text={text}
            speed={speed}
            direction={
              alternateDirections && index % 2 === 0 ? "left" : "right"
            }
            copies={copies}
            className={className}
            textClassName={textClassName}
          />
        ))}
      </section>
    );
  }
);

ScrollVelocity.displayName = "ScrollVelocity";

// Pre-styled variants for common use cases
export const HeroMarquee = ({
  texts = ["Digital Creator", "Full-Stack Developer"],
  className = "bg-gradient-to-t from-white to-gray-50  dark:from-[#000000] dark:to-[#04080f]",
  gradient = true,
}) => (
  <ScrollVelocity
    texts={texts}
    speed={80}
    copies={8}
    textClassName={`text-4xl md:text-6xl font-black tracking-tighter ${
      gradient
        ? "bg-gradient-to-r from-[#00aeef] to-[#007dc5] bg-clip-text text-transparent"
        : "text-gray-900 dark:text-white"
    }`}
    containerClassName={className}
  />
);

export const SkillsScroller = ({
  skills = ["React", "TypeScript", "Node.js", "Tailwind CSS"],
  className = "",
}) => (
  <ScrollVelocity
    texts={[skills.join(" • ")]}
    speed={50}
    copies={4}
    textClassName="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-400"
    containerClassName={`py-4 ${className}`}
    alternateDirections={false}
  />
);

export const InfiniteBanner = ({
  children,
  speed = 40,
  direction = "left",
  className = "",
}) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef();

  const containerWidth = useElementWidth(containerRef);
  const contentWidth = useElementWidth(contentRef);

  useEffect(() => {
    if (!contentWidth || !containerWidth) return;

    const directionFactor = direction === "left" ? -1 : 1;

    const animate = () => {
      const moveBy = directionFactor * speed * (16 / 1000);
      const newX = baseX.get() + moveBy;

      if (directionFactor === -1 && newX <= -contentWidth) {
        baseX.set(newX + contentWidth);
      } else if (directionFactor === 1 && newX >= 0) {
        baseX.set(newX - contentWidth);
      } else {
        baseX.set(newX);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed, direction, contentWidth, containerWidth, baseX]);

  const x = useTransform(baseX, (value) => `${value}px`);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            ref={index === 0 ? contentRef : null}
            className="flex-shrink-0"
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Usage examples export
export const ScrollVelocityExamples = {
  Basic: () => (
    <ScrollVelocity
      texts={["Creative Developer", "React Specialist"]}
      speed={60}
    />
  ),

  Hero: () => (
    <HeroMarquee
      texts={["Digital Innovator", "UI/UX Designer", "Problem Solver"]}
      gradient={true}
    />
  ),

  Skills: () => (
    <SkillsScroller
      skills={["React", "TypeScript", "Node.js", "Tailwind", "Framer Motion"]}
    />
  ),

  Custom: () => (
    <InfiniteBanner speed={30} direction="left">
      <div className="flex items-center gap-8 px-4">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Available for work
        </div>
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Open for projects
        </div>
        <div className="bg-purple-500 text-white px-4 py-2 rounded-lg">
          Let's collaborate
        </div>
      </div>
    </InfiniteBanner>
  ),
};

export default ScrollVelocity;
