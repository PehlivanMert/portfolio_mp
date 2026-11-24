import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  x: number; // 0 to 100%
  size: number; // 2px to 6.5px
  duration: number; // 6s to 12s
  delay: number; // negative delay in seconds for instant full-screen coverage
  sway: number; // horizontal sway distance in px
  opacity: number; // 0.4 to 0.95
  blur: number; // depth blur in px
}

export const ParticleBackground: React.FC = () => {
  const snowflakes: Snowflake[] = useMemo(() => {
    return Array.from({ length: 55 }, (_, i) => {
      const duration = 6 + Math.random() * 6; // 6s - 12s
      return {
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4.5 + 2, // 2px to 6.5px
        duration,
        // Negative delay ensures snowflakes are already falling across the entire screen on initial load
        delay: -(Math.random() * duration),
        sway: (Math.random() - 0.5) * 40, // -20px to +20px
        opacity: Math.random() * 0.55 + 0.4, // 0.4 to 0.95
        blur: Math.random() > 0.6 ? 0.8 : 0, // 3D depth of field effect
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-30"
      aria-hidden="true"
    >
      <style>{`
        @keyframes snowfall-fall {
          0% {
            transform: translate3d(0, -20px, 0);
          }
          50% {
            transform: translate3d(var(--snow-sway), 50vh, 0);
          }
          100% {
            transform: translate3d(calc(var(--snow-sway) * -0.5), 105vh, 0);
          }
        }
        .snowflake-item {
          will-change: transform;
          animation-name: snowfall-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake-item absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95)]"
          style={
            {
              left: `${flake.x}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              filter: flake.blur > 0 ? `blur(${flake.blur}px)` : 'none',
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              '--snow-sway': `${flake.sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
