import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CakeSectionProps {
  hasBlownCandles: boolean;
  onBlowCandles: () => void;
}

const CakeSection: React.FC<CakeSectionProps> = ({ hasBlownCandles, onBlowCandles }) => {
  const [localBlown, setLocalBlown] = useState<boolean>(hasBlownCandles || false);
  const [showPuff, setShowPuff] = useState(false);
  const [confettiRunning, setConfettiRunning] = useState(false);

  useEffect(() => {
    // keep local state in sync if parent changes prop later
    setLocalBlown(hasBlownCandles);
  }, [hasBlownCandles]);

  const runConfetti = (duration = 2500) => {
    if (confettiRunning) return;
    setConfettiRunning(true);

    const end = Date.now() + duration;
    const colors = ["#FFDDE6", "#F7D1D8", "#D4AF37", "#095B5B"];

    (function frame() {
      // two directional bursts to feel like a cake explosion
      confetti({
        particleCount: 6,
        spread: 55,
        angle: 60,
        origin: { x: 0.5, y: 0.6 },
        colors,
        ticks: 120,
      });
      confetti({
        particleCount: 6,
        spread: 55,
        angle: 120,
        origin: { x: 0.5, y: 0.6 },
        colors,
        ticks: 120,
      });

      // sprinkle a few falling confetti after main bursts
      confetti({
        particleCount: 10,
        spread: 100,
        origin: { x: Math.random(), y: 0 },
        gravity: 0.5,
        colors,
        ticks: 200,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setConfettiRunning(false);
      }
    })();
  };

  const handleBlowCandles = () => {
    if (localBlown) return; // already done, ignore
    setShowPuff(true);
    setLocalBlown(true);
    onBlowCandles?.();

    // small delay so puff anim shows nicely before confetti
    setTimeout(() => {
      runConfetti(3000);
    }, 120);

    // hide puff after animation
    setTimeout(() => setShowPuff(false), 700);
  };

  // keyboard accessible handler
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBlowCandles();
    }
  };

  // candle flame motion settings (looping flicker)
  const flameAnim = {
    initial: { scale: 1, opacity: 1, y: 0 },
    animate: (i: number) => ({
      y: [0, -2, 0],
      scale: [1, 1.06, 1],
      opacity: [1, 0.85, 1],
      transition: {
        duration: 0.9 + (i % 3) * 0.12,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: i * 0.08,
      },
    }),
    exit: { opacity: 0, scale: 0.6, transition: { duration: 0.25 } },
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#FFF8F6] to-[#FFDDE6]">
      <div className="max-w-3xl mx-auto text-center">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={localBlown}
          aria-label={localBlown ? "Candles blown" : "Tap to blow candles"}
          onClick={handleBlowCandles}
          onKeyDown={handleKey}
          className={`relative inline-block select-none focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 rounded-lg`}
        >
          {/* Cake base wrapper */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Bottom layer */}
            <div
              className="rounded-2xl shadow-2xl border-4 border-[#F7D1D8]"
              style={{
                width: 320,
                height: 110,
                background: "linear-gradient(180deg,#F7D1D8,#E8BFC9)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: "85%", height: 6, background: "rgba(13,90,90,0.06)", borderRadius: 999 }} />
              </div>
            </div>

            {/* Middle layer */}
            <div
              className="rounded-2xl shadow-xl border-4 border-[#FFDDE6] relative -mt-6 z-10"
              style={{
                width: 240,
                height: 86,
                background: "linear-gradient(180deg,#FFF8F6,#FFEFF3)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: "78%", height: 5, background: "rgba(13,90,90,0.05)", borderRadius: 999 }} />
              </div>
            </div>

            {/* Top layer */}
            <div
              className="rounded-2xl shadow-lg border-4 border-[#D4AF37] relative -mt-6 z-20"
              style={{
                width: 160,
                height: 60,
                background: "linear-gradient(180deg,#FFDDE6,#FFDFE8)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div style={{ width: "70%", height: 4, background: "rgba(13,90,90,0.04)", borderRadius: 999 }} />
              </div>
            </div>

            {/* Candles row */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatePresence>
                    {!localBlown && (
                      <motion.svg
                        key={"flame-" + i}
                        width="14"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-1"
                        custom={i}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={flameAnim}
                        aria-hidden
                      >
                        <defs>
                          <radialGradient id={`g${i}`} cx="50%" cy="40%">
                            <stop offset="0%" stopColor="#FFD165" />
                            <stop offset="60%" stopColor="#FF8A65" />
                            <stop offset="100%" stopColor="#FF6B6B" />
                          </radialGradient>
                        </defs>
                        <path d="M12 2C12 2 7 7 7 11.5C7 15.5 9.5 18 12 20C14.5 18 17 15.5 17 11.5C17 7 12 2 12 2Z" fill={`url(#g${i})`} />
                        <ellipse cx="12" cy="21" rx="4" ry="1.5" fill="rgba(0,0,0,0.05)" />
                      </motion.svg>
                    )}
                  </AnimatePresence>

                  {/* candle body */}
                  <div
                    style={{
                      width: 6,
                      height: 36,
                      borderRadius: 4,
                      background: "linear-gradient(180deg,#FFFFFF,#FFECEC)",
                      boxShadow: "inset 0 -4px 6px rgba(0,0,0,0.06)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Puff animation — three circles expanding */}
            <AnimatePresence>
              {showPuff && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={"puff-" + i}
                      initial={{ opacity: 0.9, scale: 0.2, x: (i - 1) * 18 }}
                      animate={{ opacity: 0, scale: 2.2, y: -26 + i * -6 }}
                      transition={{ duration: 0.65, delay: i * 0.08, ease: "easeOut" }}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        background: "rgba(13,90,90,0.06)",
                        filter: "blur(6px)",
                        position: "absolute",
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* helper text */}
          <div className="mt-8">
            {!localBlown ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-[#095B5B]"
              >
                Tap the cake — make a wish! 🕯️
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-semibold text-[#095B5B] flex items-center justify-center gap-2"
              >
                🎉 Wishes sent! Happy Birthday! 🎉
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CakeSection;
