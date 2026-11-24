import React, { useMemo } from 'react';

interface Snowflake {
  id: number;
  x: number; // 0 to 100%
  size: number; // 2px to 5px
  duration: number; // 8s to 16s (calm, gentle float)
  delay: number; // negative delay in seconds for instant full-screen coverage
  sway: number; // horizontal sway distance in px
  opacity: number; // 0.35 to 0.75
  blur: number; // depth blur in px
}

export const ParticleBackground: React.FC = () => {
  const snowflakes: Snowflake[] = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const duration = 8 + Math.random() * 8; // 8s - 16s
      return {
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 2, // 2px to 5px
        duration,
        // Negative delay ensures snowflakes are already falling throughout the screen on load
        delay: -(Math.random() * duration),
        sway: (Math.random() - 0.5) * 30, // -15px to +15px
        opacity: Math.random() * 0.4 + 0.35, // 0.35 to 0.75 (soft, non-distracting)
        blur: Math.random() > 0.5 ? 0.6 : 0, // 3D depth of field
      };
    });
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
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
          className="snowflake-item absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)]"
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
