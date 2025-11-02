import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ReduceMotionToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handleChange = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      document.documentElement.style.setProperty("--animation-duration", "0.01s");
    } else {
      document.documentElement.style.setProperty("--animation-duration", "");
    }
  }, [reduceMotion]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed top-6 left-6 z-40"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-card border-2 border-accent shadow-lg hover:bg-card/90"
          aria-label="Open settings"
        >
          <Settings className="w-5 h-5 text-primary" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background rounded-2xl p-6 max-w-md w-full shadow-2xl border-4 border-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-poppins text-2xl font-bold text-primary">
                  Settings
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                <div className="space-y-1">
                  <Label
                    htmlFor="reduce-motion"
                    className="font-nunito text-base text-primary cursor-pointer"
                  >
                    Reduce motion
                  </Label>
                  <p className="text-sm text-muted-foreground font-nunito">
                    Minimize animations for comfort
                  </p>
                </div>
                <Switch
                  id="reduce-motion"
                  checked={reduceMotion}
                  onCheckedChange={setReduceMotion}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReduceMotionToggle;
