import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface Message {
  text: string;
  from: string;
}

const TypewriterMessages = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  // CHANGE MESSAGES HERE
  const messages: Message[] = [
    { text: "The best sister and friend I could ever ask for!", from: "Neha" },
    { text: "So grateful to have you in my life!", from: "Your Brother" },
    { text: " Mari Jadi you make my every day brighter with your smile!", from: "Mom" },
  ];

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    let charIndex = 0;

    const typewriterInterval = setInterval(() => {
      if (charIndex < currentMessage.text.length) {
        setDisplayedText(currentMessage.text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsComplete(true);
        clearInterval(typewriterInterval);

        // Move to next message after delay
        setTimeout(() => {
          if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex(currentMessageIndex + 1);
            setDisplayedText("");
            setIsComplete(false);
          }
        }, 2000);
      }
    }, 50);

    return () => clearInterval(typewriterInterval);
  }, [currentMessageIndex]);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-poppins font-bold text-center text-primary mb-16"
        >
          Messages from Your loved ones 💌
        </motion.h2>

        <div className="space-y-8">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentMessageIndex ? 1 : 0.3,
                x: 0,
              }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-card border-2 border-secondary rounded-2xl p-6 shadow-lg">
                <p className="font-nunito text-xl text-primary min-h-[60px]">
                  {index === currentMessageIndex ? (
                    <>
                      {displayedText}
                      {!isComplete && (
                        <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse" />
                      )}
                    </>
                  ) : index < currentMessageIndex ? (
                    message.text
                  ) : (
                    ""
                  )}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <p className="font-poppins text-sm text-muted-foreground">
                    — {message.from}
                  </p>

                  <AnimatePresence>
                    {index < currentMessageIndex || (index === currentMessageIndex && isComplete) && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Heart className="w-5 h-5 text-accent fill-accent" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypewriterMessages;
