import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  onBlowCandles: () => void;
  hasBlownCandles: boolean;
  sisterName: string; // CHANGE NAME HERE
}

const Hero = ({ onBlowCandles, hasBlownCandles, sisterName }: HeroProps) => {
  const balloons = [
    { color: "bg-secondary", delay: 0, left: "10%", size: "w-16 h-20" },
    { color: "bg-accent", delay: 0.5, left: "25%", size: "w-14 h-18" },
    { color: "bg-card", delay: 1, left: "75%", size: "w-16 h-20" },
    { color: "bg-secondary", delay: 1.5, left: "85%", size: "w-12 h-16" },
    { color: "bg-accent", delay: 0.8, left: "50%", size: "w-14 h-18" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-card to-background">
      {/* Floating Balloons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {balloons.map((balloon, index) => (
          <motion.div
            key={index}
            className={`absolute ${balloon.size} ${balloon.color} rounded-full`}
            style={{
              left: balloon.left,
              bottom: "-100px",
            }}
            animate={{
              y: [0, -window.innerHeight - 200],
              x: [0, Math.sin(index) * 50, 0],
            }}
            transition={{
              duration: 12 + index * 2,
              delay: balloon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full rounded-full shadow-lg" />
            <div className="absolute bottom-0 left-1/2 w-0.5 h-16 bg-muted-foreground/20 -translate-x-1/2" />
          </motion.div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-poppins text-5xl md:text-7xl font-bold text-primary mb-4"
        >
          {hasBlownCandles ? (
            "Make a wish — it's your day!"
          ) : (
            <>
              Happy Birthday, {sisterName}! {/* CHANGE NAME HERE */}
            </>
          )}
        </motion.h1>

        {!hasBlownCandles && (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-nunito text-xl md:text-2xl text-muted-foreground mb-12"
            >
              Wishing you a day filled with love, laughter, and endless joy! ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                onClick={onBlowCandles}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-poppins text-xl px-12 py-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                🎂 Blow the Candles
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
