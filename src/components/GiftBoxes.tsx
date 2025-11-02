import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Sparkles } from "lucide-react";

interface GiftBox {
  id: number;
  message: string;
  icon: React.ReactNode;
}

const GiftBoxes = () => {
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);

  const gifts: GiftBox[] = [
    {
      id: 1,
      message: "behna jio hajaro saal 💫",
      icon: <Sparkles className="w-12 h-12 text-accent" />,
    },
    {
      id: 2,
      message: "Here's to another year of doing masti and heran 😜",
      icon: <Heart className="w-12 h-12 text-secondary" />,
    },
    {
      id: 3,
      message: "Thank you for being the best sister 💕",
      icon: <Gift className="w-12 h-12 text-primary" />,
    },
  ];

  const handleOpenBox = (id: number) => {
    if (!openedBoxes.includes(id)) {
      setOpenedBoxes([...openedBoxes, id]);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-poppins font-bold text-center text-primary mb-12"
        >
          Surprise boxes — open for memories! 🎁
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {gifts.map((gift) => {
            const isOpen = openedBoxes.includes(gift.id);

            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gift.id * 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={!isOpen ? { y: -10 } : {}}
                  className="relative cursor-pointer"
                  onClick={() => handleOpenBox(gift.id)}
                >
                  {/* Gift Box */}
                  <AnimatePresence>
                    {!isOpen && (
                      <motion.div
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        {/* Lid */}
                        <motion.div
                          animate={isOpen ? { rotateX: -90, y: -50 } : {}}
                          className="w-full h-16 bg-gradient-to-b from-accent to-accent/80 rounded-t-lg border-4 border-accent shadow-lg"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-4 bg-primary/20" />
                          </div>
                        </motion.div>

                        {/* Box Body */}
                        <div className="w-full h-32 bg-gradient-to-b from-secondary to-secondary/80 border-4 border-accent shadow-lg rounded-b-lg flex items-center justify-center">
                          <Gift className="w-12 h-12 text-primary" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Revealed Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-card border-4 border-accent rounded-lg p-6 shadow-xl min-h-[200px] flex flex-col items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          {gift.icon}
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-4 text-center font-nunito text-lg text-primary"
                        >
                          {gift.message}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GiftBoxes;
