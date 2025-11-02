import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CakeSectionProps {
  hasBlownCandles: boolean;
  onBlowCandles: () => void;
}

const CakeSection = ({ hasBlownCandles, onBlowCandles }: CakeSectionProps) => {
  const [showPuff, setShowPuff] = useState(false);

  const handleBlowCandles = () => {
    setShowPuff(true);
    onBlowCandles();

    // Confetti burst from cake position
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#FFDDE6", "#F7D1D8", "#D4AF37"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#FFDDE6", "#F7D1D8", "#D4AF37"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => setShowPuff(false), 600);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative inline-block cursor-pointer"
          onClick={!hasBlownCandles ? handleBlowCandles : undefined}
        >
          {/* Cake */}
          <div className="relative">
            {/* Bottom Layer */}
            <div className="w-64 h-24 bg-gradient-to-b from-secondary to-secondary/80 rounded-lg mx-auto shadow-lg border-4 border-accent/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-2 bg-accent/30 rounded-full" />
              </div>
            </div>

            {/* Middle Layer */}
            <div className="w-48 h-20 bg-gradient-to-b from-card to-card/80 rounded-lg mx-auto -mt-2 shadow-lg border-4 border-accent/20 relative z-10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-2 bg-accent/30 rounded-full" />
              </div>
            </div>

            {/* Top Layer */}
            <div className="w-32 h-16 bg-gradient-to-b from-secondary to-secondary/80 rounded-lg mx-auto -mt-2 shadow-lg border-4 border-accent/20 relative z-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-2 bg-accent/30 rounded-full" />
              </div>
            </div>

            {/* Candles */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  {/* Flame */}
                  <AnimatePresence>
                    {!hasBlownCandles && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="relative"
                      >
                        <div className="w-3 h-5 bg-gradient-to-t from-accent to-yellow-200 rounded-full animate-flicker mb-1" />
                        <div className="absolute inset-0 blur-sm bg-accent/50 rounded-full" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Candle */}
                  <div className="w-2 h-10 bg-gradient-to-b from-accent to-accent/80 rounded-sm" />
                </div>
              ))}
            </div>

            {/* Puff Animation */}
            {showPuff && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-40">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.8, scale: 0.3 }}
                    animate={{ opacity: 0, scale: 2 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="absolute w-8 h-8 bg-muted/40 rounded-full blur-sm"
                    style={{
                      left: `${i * 20}px`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {!hasBlownCandles && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-lg font-nunito text-muted-foreground"
            >
              Tap the cake — make a wish! 🕯️
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CakeSection;
