export const sectionContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72 }
  }
};

export const fadeInSubtle = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 }
  }
};

export const heroBadge = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65 }
  }
};

export const heroHeading = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 }
  }
};

export const heroContent = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 }
  }
};

export const heroCTA = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.3 }
  }
};

export const hoverLift = {
  whileHover: { y: -3, transition: { duration: 0.18 } },
  whileTap: { scale: 0.985 }
};

export const pulseLink = {
  whileHover: { y: -2, scale: 1.01, transition: { duration: 0.2 } }
};
