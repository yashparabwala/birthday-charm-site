import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  src: string;
  caption: string;
}

/**
 * Accepts either:
 *  - a full Google Drive sharing URL like:
 *      https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *  - OR just the FILE_ID string
 * Returns a direct preview/downloadable URL that works as an <img src="...">.
 */
function driveToPreviewUrl(input: string) {
  // try to extract ID from full link, otherwise assume input is id
  const match = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : input;
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

const PhotoGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // CHANGE PHOTOS HERE — you may paste either the full drive link or only the file ID
  const photos: Photo[] = [
    {
      src: driveToPreviewUrl("https://drive.google.com/file/d/12x5Z_fZglbWsawvkvED7MQnenr-rfZgI/view?usp=sharing"),
      caption: "Golden hour laughter in the trip 🌅",
    },
    {
      src: driveToPreviewUrl("https://drive.google.com/file/d/1Vyx514JFJjavN-QjlGSPenRsXZkklFWS/view?usp=sharing"),
      caption: "Beach memories at sunset 🏖️",
    },
    {
      src: driveToPreviewUrl("https://drive.google.com/file/d/1nyHEMWF1mB1NkiUgs8l45fWSM1y7UGKD/view?usp=sharing"),
      caption: "Baking adventures together 🍰",
    },
    {
      src: driveToPreviewUrl("https://drive.google.com/file/d/1OPba12VS6KzrNmD99g52L25009sk7AfR/view?usp=sharing"),
      caption: "Nice memories 🥰",
    },
  ];

  const handlePrevious = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        selectedPhotoIndex === 0 ? photos.length - 1 : selectedPhotoIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        selectedPhotoIndex === photos.length - 1 ? 0 : selectedPhotoIndex + 1
      );
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-poppins font-bold text-center text-primary mb-12"
        >
          Treasured memories 📸
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg border-4 border-secondary"
              onClick={() => setSelectedPhotoIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedPhotoIndex(index);
              }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // fallback: show a simple placeholder if image fails
                  (e.currentTarget as HTMLImageElement).src =
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-family='Arial' font-size='24'>Image not available</text></svg>`
                    );
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhotoIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhotoIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-12 right-0 text-background hover:text-background/80"
                  onClick={() => setSelectedPhotoIndex(null)}
                  aria-label="Close"
                >
                  <X className="w-8 h-8" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:text-background/80"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:text-background/80"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                {/* Image */}
                <div className="bg-background rounded-2xl overflow-hidden shadow-2xl">
                  {/* TS: selectedPhotoIndex is guaranteed non-null here */}
                  {typeof selectedPhotoIndex === "number" && (
                    <>
                      <img
                        src={photos[selectedPhotoIndex].src}
                        alt={photos[selectedPhotoIndex].caption}
                        className="w-full h-auto max-h-[70vh] object-contain"
                      />
                      <div className="p-6">
                        <p className="font-nunito text-xl text-center text-primary">
                          {photos[selectedPhotoIndex].caption}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PhotoGallery;
