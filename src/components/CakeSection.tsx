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
    setLocalBlown(hasBlownCandles);
  }, [hasBlownCandles]);

  const runConfetti = (duration = 2500) => {
    if (confettiRunning) return;
    setConfettiRunning(true);

    const end = Date.now() + duration;
    const colors = ["#FFDDE6", "#F7D1D8", "#D4AF37", "#FF69B4"];

    (function frame() {
      confetti({
        particleCount: 6,
        spread: 55,
        angle: 60,
        origin: { x: 0.5, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 6,
        spread: 55,
        angle: 120,
        origin: { x: 0.5, y: 0.6 },
        colors,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
      else setConfettiRunning(false);
    })();
  };

  const handleBlowCandles = () => {
    if (localBlown) return;
    setShowPuff(true);
    setLocalBlown(true);
    onBlowCandles?.();

    setTimeout(() => runConfetti(3000), 120);
    setTimeout(() => setShowPuff(false), 700);
  };

  const flameAnim = {
    initial: { scale: 1, opacity: 1, y: 0 },
    animate: (i: number) => ({
      y: [0, -2, 0],
      scale: [1, 1.05, 1],
      opacity: [1, 0.85, 1],
      transition: {
        duration: 0.9 + (i % 3) * 0.1,
        repeat: Infinity,
        repeatType: "mirror",
      },
    }),
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#FFF8F6] to-[#FFDDE6]">
      <div className="max-w-3xl mx-auto text-center">
        <div
          role="button"
          tabIndex={0}
          onClick={handleBlowCandles}
          className="relative inline-block select-none focus:outline-none"
        >
          {/* Cake layers */}
          <div className="relative flex flex-col items-center">
            {/* Bottom round layer */}
            <div
              className="rounded-full shadow-2xl relative"
              style={{
                width: 260,
                height: 90,
                background: "radial-gradient(circle at 50% 40%, #F7B6C2, #E891A6)",
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-6 bg-pink-200 rounded-b-full"></div>
            </div>

            {/* Middle frosting */}
            <div
              className="rounded-full relative -mt-10 z-10 shadow-md"
              style={{
                width: 200,
                height: 70,
                background: "radial-gradient(circle at 50% 40%, #FFF3F4, #FFD7E0)",
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-5 bg-[#F7B6C2] rounded-b-full"></div>
            </div>

            {/* Top layer */}
            <div
              className="rounded-full relative -mt-8 z-20 shadow-lg"
              style={{
                width: 140,
                height: 50,
                background: "radial-gradient(circle at 50% 40%, #FFDDE6, #FFC2CF)",
              }}
            >
              <div className="absolute inset-x-0 bottom-0 h-4 bg-[#F7A1B0] rounded-b-full"></div>
            </div>

            {/* Candles */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatePresence>
                    {!localBlown && (
                      <motion.div
                        custom={i}
                        variants={flameAnim}
                        initial="initial"
                        animate="animate"
                        className="w-2 h-4 mb-1 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, #FFD165 20%, #FF8A65 60%, #FF6B6B 100%)",
                          boxShadow: "0 0 10px rgba(255, 140, 80, 0.7)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <div
                    className="rounded"
                    style={{
                      width: 6,
                      height: 30,
                      background: "linear-gradient(180deg,#fff,#FFDDE6)",
                      border: "1px solid #FFC2CF",
                    }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Puff animation */}
            <AnimatePresence>
              {showPuff && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={"puff-" + i}
                      initial={{ opacity: 0.9, scale: 0.2, x: (i - 1) * 18 }}
                      animate={{ opacity: 0, scale: 2, y: -26 + i * -6 }}
                      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 999,
                        background: "rgba(200,200,200,0.15)",
                        filter: "blur(6px)",
                        position: "absolute",
                      }}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Text below */}
          <div className="mt-10">
            {!localBlown ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-[#095B5B]"
              >
                Tap the cake to blow the candles 🕯️
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
