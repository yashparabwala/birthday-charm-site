import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Note: Add your own birthday music file to public/audio/birthday-song.mp3
  // For now, this is a placeholder that won't load an actual file
  const audioSrc = "https://www.youtube.com/watch?v=nl62hhiBMOM&list=PLAxg13WskxWYq6Fe34UGbLVNlBlK9tyxA&index=13"; // CHANGE MUSIC HERE

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Audio playback failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <div className="bg-card border-4 border-accent rounded-full p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>

        {!isPlaying && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-12 right-0 text-sm font-nunito text-primary bg-card px-3 py-1 rounded-lg shadow-md whitespace-nowrap"
          >
            🎵 Tap to play birthday song
          </motion.p>
        )}
      </div>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </motion.div>
  );
};

export default MusicPlayer;
