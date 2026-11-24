import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const ParticleBackground = () => {
  const shouldReduceMotion = useReducedMotion();

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage of viewport width
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 10 + 12, // 12s to 22s smooth drift
      delay: Math.random() * 8, // staggered starts
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 shadow-sm"
          style={{
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          initial={{ y: '-5vh', opacity: p.opacity }}
          animate={{
            y: ['-5vh', '105vh'],
            x: [0, p.id % 2 === 0 ? 15 : -15, 0],
            opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.4],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: p.delay,
            },
            x: {
              duration: p.duration * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: p.duration * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
