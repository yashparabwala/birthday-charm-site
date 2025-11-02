import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Use your local public file
  const audioSrc = "/HAPPY BIRTHDAY INSTRUMENTAL.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = muted;

    const onLoaded = () => setDuration(isFinite(audio.duration) ? audio.duration : 0);
    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const onError = () => {
      setErrorMsg("Unable to play audio — check the file name or format.");
      console.error("Audio error:", audio.error);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [volume, muted]);

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
        setErrorMsg(null);
      }
    } catch (err) {
      setErrorMsg("Playback failed. Try clicking play again or check autoplay settings.");
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    audio.currentTime = pct * audio.duration;
    setProgress(pct * 100);
  };

  const toggleMute = () => setMuted((m) => !m);

  const formattedTime = (s: number) => {
    if (!s) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <div className="bg-card border-4 border-accent rounded-full p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggleMute}>
              {muted ? <VolumeX className="w-5 h-5 text-primary" /> : <Volume2 className="w-5 h-5 text-primary" />}
            </button>

            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="w-44 h-2 bg-secondary rounded-full overflow-hidden cursor-pointer"
            >
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="text-sm text-primary w-20 text-right">
              {formattedTime((progress / 100) * duration)} / {formattedTime(duration)}
            </div>
          </div>
        </div>

        {errorMsg && <p className="mt-3 text-xs text-rose-600 font-nunito">{errorMsg}</p>}
      </div>

      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </motion.div>
  );
};

export default MusicPlayer;
