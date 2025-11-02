import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";

interface Photo {
  src: string;
  caption: string;
}

const PhotoGallery = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // CHANGE PHOTOS HERE - Add your own images to src/assets/
  const photos: Photo[] = [
    { src: photo1, caption: "Golden hour laughter in the park 🌅" },
    { src: photo2, caption: "Beach memories at sunset 🏖️" },
    { src: photo3, caption: "Baking adventures together 🍰" },
    { src: photo4, caption: "Road trip sing-alongs 🚗" },
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
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg border-4 border-secondary"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover"
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
                >
                  <X className="w-8 h-8" />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-background hover:text-background/80"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-background hover:text-background/80"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                {/* Image */}
                <div className="bg-background rounded-2xl overflow-hidden shadow-2xl">
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
