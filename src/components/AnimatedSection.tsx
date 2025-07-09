import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  distance?: number;
  delay?: number;
  duration?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  direction = 'up',
  distance = 50,
  delay = 0,
  duration = 0.8,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true
}) => {
  const getVariants = () => {
    const baseHidden = { opacity: 0 };
    const baseVisible = {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: "easeOut"
      }
    };

    switch (direction) {
      case 'up':
        return {
          hidden: { ...baseHidden, y: distance },
          visible: { ...baseVisible, y: 0 }
        };
      case 'down':
        return {
          hidden: { ...baseHidden, y: -distance },
          visible: { ...baseVisible, y: 0 }
        };
      case 'left':
        return {
          hidden: { ...baseHidden, x: -distance },
          visible: { ...baseVisible, x: 0 }
        };
      case 'right':
        return {
          hidden: { ...baseHidden, x: distance },
          visible: { ...baseVisible, x: 0 }
        };
      case 'scale':
        return {
          hidden: { ...baseHidden, scale: 0.8 },
          visible: { ...baseVisible, scale: 1 }
        };
      case 'fade':
      default:
        return {
          hidden: baseHidden,
          visible: baseVisible
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: triggerOnce, 
        margin: rootMargin
      }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
};

// Stagger container component
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  distance?: number;
  duration?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: direction === 'up' ? distance : direction === 'down' ? -distance : 0, x: direction === 'left' ? -distance : direction === 'right' ? distance : 0, scale: direction === 'scale' ? 0.8 : 1 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: triggerOnce, 
        margin: rootMargin
      }}
      variants={containerVariants}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Responsive animated section
interface ResponsiveAnimatedSectionProps extends AnimatedSectionProps {
  mobileDistance?: number;
  mobileDuration?: number;
  mobileDelay?: number;
}

const ResponsiveAnimatedSection: React.FC<ResponsiveAnimatedSectionProps> = ({
  mobileDistance,
  mobileDuration,
  mobileDelay,
  distance = 50,
  duration = 0.8,
  delay = 0,
  ...props
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const responsiveProps = {
    ...props,
    distance: isMobile ? (mobileDistance || distance * 0.6) : distance,
    duration: isMobile ? (mobileDuration || duration * 0.8) : duration,
    delay: isMobile ? (mobileDelay || delay * 0.5) : delay
  };

  return <AnimatedSection {...responsiveProps} />;
};

export { AnimatedSection, StaggerContainer, ResponsiveAnimatedSection }; 