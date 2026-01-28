import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const getInitialPosition = (direction: string) => {
  switch (direction) {
    case "left": return { opacity: 0, x: -30 };
    case "right": return { opacity: 0, x: 30 };
    case "down": return { opacity: 0, y: -30 };
    default: return { opacity: 0, y: 30 };
  }
};

const getFinalPosition = (direction: string) => {
  switch (direction) {
    case "left":
    case "right": return { opacity: 1, x: 0 };
    default: return { opacity: 1, y: 0 };
  }
};

export function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={getInitialPosition(direction)}
      whileInView={getFinalPosition(direction)}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
