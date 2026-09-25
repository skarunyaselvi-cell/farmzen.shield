import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [stage, setStage] = useState<number>(0);
  const mascotImg = '/src/assets/images/farmzen_official_mascot_logo_1790308866984.jpg';

  useEffect(() => {
    // Stage 1: Seed appears (0ms - 500ms)
    // Stage 2: Green leaves emerge & grow (500ms - 1000ms)
    // Stage 3: Agricultural particles appear (1000ms - 1500ms)
    // Stage 4: Friendly Farmer emblem forms (1500ms - 2200ms)
    // Stage 5: FARMZEN text & tagline glow (2200ms - 3200ms)
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 1000);
    const t3 = setTimeout(() => setStage(3), 1600);
    const t4 = setTimeout(() => setStage(4), 2200);
    const finish = setTimeout(() => onFinish(), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(finish);
    };
  }, [onFinish]);

  return (
    <div
      onClick={onFinish}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-emerald-950 via-slate-950 to-emerald-950 text-white cursor-pointer overflow-hidden select-none"
    >
      {/* Background organic agricultural particles */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:28px_28px]" />

      {/* Soft ambient light glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
        {/* Animated Sprout to Farmer Emblem Transformation */}
        <div className="relative w-44 h-44 flex items-center justify-center mb-5">
          <AnimatePresence mode="wait">
            {stage < 3 ? (
              <motion.div
                key="growing-seed"
                initial={{ scale: 0.3, opacity: 0, y: 20 }}
                animate={{
                  scale: stage === 1 ? 0.7 : 1,
                  opacity: 1,
                  y: 0
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                {/* Sprout & Leaves SVG */}
                <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-lg">
                  <line x1="20" y1="80" x2="80" y2="80" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                  <motion.path
                    d="M 50 80 Q 48 55 50 35"
                    stroke="#10B981"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {stage >= 1 && (
                    <motion.path
                      d="M 50 48 C 68 30 78 45 50 35"
                      fill="#34D399"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  {stage >= 2 && (
                    <motion.path
                      d="M 50 55 C 30 40 22 55 50 45"
                      fill="#10B981"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  <circle cx="50" cy="78" r="8" fill="#D97706" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                key="farmer-emblem"
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="relative flex items-center justify-center"
              >
                {/* Circular Golden Glow Ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-emerald-500 via-amber-400 to-emerald-300 opacity-60 blur-md animate-pulse" />

                {/* Farmer Mascot Image from Uploaded Reference */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-3 border-emerald-400 shadow-2xl relative z-10 bg-slate-900">
                  <img
                    src={mascotImg}
                    alt="FARMZEN Cartoon Farmer Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Name & Tagline */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2 flex flex-col items-center"
          >
            <div className="flex items-center tracking-wider">
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-white">
                FARM
              </span>
              <span className="font-display font-extrabold text-4xl sm:text-5xl text-emerald-400 ml-1">
                ZEN
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-emerald-200 tracking-wide">
              "Decide Better. Farm Smarter. Sell Better."
            </p>

            <span className="mt-4 text-[11px] text-emerald-400/70 font-mono uppercase tracking-widest animate-pulse">
              Tap anywhere to enter
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};
