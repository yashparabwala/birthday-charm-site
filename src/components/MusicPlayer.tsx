import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Accepts either:
 *  - a full Google Drive sharing URL like:
 *      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *  - OR just the FILE_ID string
 * Returns a direct Drive download/preview URL that usually works as <audio src="...">.
 *
 * NOTE: Google Drive sometimes blocks direct hotlinking depending on account/host — if audio fails,
 * double-check sharing settings ("Anyone with the link can view") or host the file on another service.
 */
function driveToAudioUrl(input: string) {
  const match = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : input;
  // using export=download typically works for audio; if you prefer export=view try that.
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 100
  const [duration, setDuration] = useState(0); // seconds
  const [volume, setVolume] = useState(0.8); // 0 - 1
  const [muted, setMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // CHANGE THIS: paste either the full drive url or just the file id
  const audioSrc = driveToAudioUrl("https://drive.google.com/file/d/1Jc5JWVyuSb2l8Y0sGQmyZwiOcd7zd70d/view?usp=sharing");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // ensure initial volume/muted
    audio.volume = volume;
    audio.muted = muted;

    const onLoaded = () => {
      setDuration(isFinite(audio.duration) ? audio.duration : 0);
    };

    const updateProgress = () => {
      if (!audio || !audio.duration || isNaN(audio.duration)) {
        setProgress(0);
        return;
      }
      const pct = (audio.currentTime / audio.duration) * 100;
      setProgress(Number.isFinite(pct) ? pct : 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    const onError = () => {
      setErrorMsg("Unable to play audio — check Drive sharing settings or host the file elsewhere.");
      console.error("Audio error", audio.error);
      setIsPlaying(false);
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
  }, [volume, muted, audioSrc]);

  // sync volume & mute with audio element when changed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // browsers can block play until user gesture — this button is a gesture
        await audio.play();
        setIsPlaying(true);
        setErrorMsg(null);
      }
    } catch (err) {
      console.error("Playback error:", err);
      setErrorMsg("Playback failed. Try clicking play again or check browser autoplay settings.");
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    const audio = audioRef.current;
    if (!bar || !audio || !audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, pct)) * audio.duration;
    // update progress immediately for snappy UI
    setProgress(pct * 100);
  };

  const toggleMute = () => {
    setMuted((m) => !m);
  };

  const formattedTime = (s: number) => {
    if (!s || !isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-6 right-6 z-40"
      aria-live="polite"
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
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex items-center gap-2"
            >
              {muted || volume === 0 ? <VolumeX className="w-5 h-5 text-primary" /> : <Volume2 className="w-5 h-5 text-primary" />}
            </button>

            <div
              ref={progressRef}
              onClick={handleProgressClick}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              className="w-44 h-2 bg-secondary rounded-full overflow-hidden cursor-pointer"
              title="Click to seek"
            >
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="text-sm font-nunito text-primary w-20 text-right">
              {formattedTime((progress / 100) * duration)} / {formattedTime(duration)}
            </div>
          </div>

          {/* Volume slider for desktop */}
          <div className="hidden md:flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => {
                const v = Number(e.currentTarget.value);
                setVolume(v);
                if (v > 0 && muted) setMuted(false);
              }}
              aria-label="Volume"
              className="w-24"
            />
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

        {errorMsg && (
          <p className="mt-3 text-xs text-rose-600 font-nunito">{errorMsg}</p>
        )}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </motion.div>
  );
};

export default MusicPlayer;
