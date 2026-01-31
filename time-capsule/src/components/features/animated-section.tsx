'use client';

import { motion, useInView, HTMLMotionProps } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
}

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
};

export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const animationConfig = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial={animationConfig.initial}
      animate={isInView ? animationConfig.animate : animationConfig.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
