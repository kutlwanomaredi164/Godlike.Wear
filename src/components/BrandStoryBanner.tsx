import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface BrandStoryBannerProps {
  onShopClick: () => void;
}

export const BrandStoryBanner: React.FC<BrandStoryBannerProps> = ({ onShopClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="brand-story-section" className="w-full bg-[#0D0D0D] border-b border-[#1A1A1A] py-20 lg:py-28 overflow-hidden relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#BE9E5E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Official Mission Video */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[4/5] overflow-hidden border border-[#222222] bg-[#0A0A0A] shadow-2xl group">
              <video
                ref={videoRef}
                src="/GL%20Missi0n%20vide0.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover filter brightness-[0.92] contrast-105"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Subtle Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/30 pointer-events-none" />

              {/* Discreet Controls in Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="w-8 h-8 rounded-full bg-[#0A0A0A]/85 backdrop-blur-md border border-neutral-700 hover:border-[#BE9E5E] text-neutral-300 hover:text-[#BE9E5E] flex items-center justify-center transition-all shadow-md"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>

                {/* Sound Toggle Button */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  className={`h-8 px-2.5 rounded-full backdrop-blur-md border flex items-center gap-1.5 text-[10px] font-mono transition-all shadow-md ${
                    isMuted
                      ? 'bg-[#0A0A0A]/85 border-neutral-700 text-neutral-300 hover:border-[#BE9E5E] hover:text-[#BE9E5E]'
                      : 'bg-[#BE9E5E] border-[#BE9E5E] text-[#0A0A0A] font-bold shadow-[0_0_12px_rgba(190,158,94,0.6)]'
                  }`}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">SOUND OFF</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">SOUND ON</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Decorative Gold Accent Border */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#BE9E5E] pointer-events-none" />
          </div>

          {/* Right Column: Brand Manifesto Content */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-none">
              MORE THAN CLOTHING.
            </h2>

            <div className="h-[2px] w-20 bg-[#BE9E5E]" />

            <p className="text-base sm:text-lg text-[#F5F5F5] font-light leading-relaxed">
              GODLIKE exists to inspire faith, confidence and purpose through fashion. Every collection represents identity, conviction and bold living.
            </p>

            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We reject fleeting trends in favor of architectural streetwear clothing forged from bespoke 480GSM French terry, custom-cast 18K vermeil hardware, and subtle sacred scriptures. Clothing that serves as modern armor for those unapologetic in their faith.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#141414] border border-[#1F1F1F]">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#BE9E5E] mb-1">
                  FAITH THROUGH FASHION
                </h4>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Subtle, tasteful scripture integration designed to spark meaningful conversations.
                </p>
              </div>

              <div className="p-4 bg-[#141414] border border-[#1F1F1F]">
                <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-[#BE9E5E] mb-1">
                  BESPOKE LUXURY DRAPE
                </h4>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Pre-shrunk, high-density combed cotton with substantial weight and drop-shoulder tailoring.
                </p>
              </div>
            </div>

            {/* Scripture Anchor */}
            <blockquote className="border-l-2 border-[#BE9E5E] pl-4 py-1 italic font-serif-luxury text-sm text-neutral-300">
              "Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
              <span className="block not-italic font-heading text-[10px] uppercase tracking-widest text-[#BE9E5E] mt-1">
                — ROMANS 12:2
              </span>
            </blockquote>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                id="brand-story-shop-btn"
                onClick={onShopClick}
                className="px-8 py-3.5 bg-[#BE9E5E] hover:bg-[#D4B97B] text-[#0A0A0A] font-heading font-extrabold text-xs uppercase tracking-[0.25em] transition-all duration-300 transform active:scale-95 shadow-xl"
              >
                EXPLORE THE PIECES
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
