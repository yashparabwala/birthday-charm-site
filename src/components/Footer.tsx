import { motion } from "framer-motion";
import { Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  senderName: String; // CHANGE NAME HERE
}

const Footer = ({ senderName }: FooterProps) => {
  const handleDownload = () => {
    window.print();
  };

  return (
    <footer className="py-16 px-4 bg-gradient-to-t from-card to-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="font-nunito text-2xl text-primary">
              Love, {senderName} {/* CHANGE NAME HERE */}
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-6 h-6 text-accent fill-accent" />
            </motion.div>
          </div>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-2 border-accent hover:bg-accent hover:text-accent-foreground font-nunito"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as PDF
          </Button>

          <div className="pt-8 text-sm text-muted-foreground font-nunito">
            <p>Made with 💖 and lots of love</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
