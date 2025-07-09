import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  distance?: number;
  duration?: number;
  baseDelay?: number;
}

interface AnimationVariants {
  hidden: {
    opacity: number;
    x?: number;
    y?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    x?: number;
    y?: number;
    scale?: number;
    transition: {
      duration: number;
      delay: number;
      ease: number[] | string;
    };
  };
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0,
    direction = 'up',
    distance = 50,
    duration = 0.8
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const getAnimationVariants = (): AnimationVariants => {
    const baseHidden = { opacity: 0 };
    const baseVisible = {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, triggerOnce]);

  return {
    ref: elementRef,
    isVisible,
    hasTriggered,
    variants: getAnimationVariants()
  };
};

// Stagger animation hook for multiple elements
export const useStaggerAnimation = (
  _count: number,
  options: UseScrollAnimationOptions = {}
) => {
  const {
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    baseDelay = 0.1,
    direction = 'up',
    distance = 30,
    duration = 0.6
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getStaggerVariants = (index: number) => {
    const baseHidden = { opacity: 0 };
    const baseVisible = {
      opacity: 1,
      transition: {
        duration,
        delay: baseDelay * index,
        ease: [0.4, 0, 0.2, 1]
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
      default:
        return {
          hidden: baseHidden,
          visible: baseVisible
        };
    }
  };

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [rootMargin, triggerOnce]);

  const getItemVariants = (index: number) => getStaggerVariants(index);

  return {
    ref: containerRef,
    isVisible,
    hasTriggered,
    getItemVariants
  };
};

// Responsive animation hook
export const useResponsiveAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const responsiveOptions = {
    ...options,
    distance: isMobile ? (options.distance || 50) * 0.6 : options.distance || 50,
    duration: isMobile ? (options.duration || 0.8) * 0.8 : options.duration || 0.8,
    delay: isMobile ? (options.delay || 0) * 0.5 : options.delay || 0
  };

  return useScrollAnimation(responsiveOptions);
}; 