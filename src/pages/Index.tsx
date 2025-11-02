import { useState } from "react";
import Hero from "@/components/Hero";
import CakeSection from "@/components/CakeSection";
import GiftBoxes from "@/components/GiftBoxes";
import TypewriterMessages from "@/components/TypewriterMessages";
import PhotoGallery from "@/components/PhotoGallery";
import MusicPlayer from "@/components/MusicPlayer";
import Footer from "@/components/Footer";
import ReduceMotionToggle from "@/components/ReduceMotionToggle";

const Index = () => {
  const [hasBlownCandles, setHasBlownCandles] = useState(false);

  /* 
   * ========================================
   * CUSTOMIZATION SECTION - EDIT THESE VALUES
   * ========================================
   */
  const sisterName = "Nidhi"; // CHANGE YOUR SISTER'S NAME HERE
  const senderName = "Yash Bro"; // CHANGE YOUR NAME HERE

  return (
    <div className="font-nunito bg-background min-h-screen">
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02] bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Settings Toggle */}
      <ReduceMotionToggle />

      {/* Music Player */}
      <MusicPlayer />

      {/* Main Content */}
      <Hero
        onBlowCandles={() => setHasBlownCandles(true)}
        hasBlownCandles={hasBlownCandles}
        sisterName={sisterName}
      />

      {hasBlownCandles && (
        <>
          <CakeSection
            hasBlownCandles={hasBlownCandles}
            onBlowCandles={() => setHasBlownCandles(true)}
          />
          <GiftBoxes />
          <TypewriterMessages />
          <PhotoGallery />
          <Footer senderName={senderName} />
        </>
      )}
    </div>
  );
};

export default Index;
