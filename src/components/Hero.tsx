import React from 'react';
import { ArrowDown, ChevronRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onStoryClick }) => {
  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Background Editorial Imagery with Dark Moody Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/H0mepage.jpg"
          alt="GODLIKE Campaign - Faith, Purpose, Style"
          className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-110 scale-105 transform motion-safe:animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        {/* Layered Luxury Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/20" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0A0A0A]/30 to-[#0A0A0A]/85" />
        {/* Subtle grid pattern overlay for high-tech architectural streetwear feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-20 flex flex-col items-center">
        {/* Official Brand Logo Emblem */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          <img
            src="/white%20l0g0.png"
            alt="GODLIKE wear. - I CHOSE CHRIST"
            className="object-contain"
            style={{
              width: '370.125px',
              height: '150px',
              marginLeft: '-4px',
              marginRight: '5px',
              marginTop: '-25px',
              marginBottom: '-3px',
              paddingTop: '-1px',
              paddingBottom: '-1px',
              paddingRight: '-1px',
            }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Big Impact Headline */}
        <div className="space-y-1 sm:space-y-2 mb-6">
          <h1
            style={{ borderRadius: '0px', fontSize: '64px' }}
            className="font-heading font-black tracking-tight text-white leading-none"
          >
            FAITH.
          </h1>
          <h1
            style={{ fontSize: '63px', lineHeight: '64px' }}
            className="font-heading font-black tracking-tight text-[#BE9E5E]"
          >
            PURPOSE.
          </h1>
          <h1
            style={{ fontSize: '61px' }}
            className="font-heading font-black tracking-tight text-[#F5F5F5] leading-none"
          >
            STYLE.
          </h1>
        </div>

        {/* Subheading */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-neutral-300 font-light tracking-wide leading-relaxed mb-10 px-4">
          Premium streetwear designed to express identity, confidence and conviction.
          Crafted from bespoke heavyweight French terry and custom-milled combed cottons.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-shop-clothing-btn"
            onClick={onShopClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-[#F5F5F5] text-[#0A0A0A] font-heading font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#BE9E5E] hover:text-[#0A0A0A] transition-all duration-300 transform active:scale-95 shadow-xl flex items-center justify-center gap-2 group"
          >
            <span>SHOP CLOTHING</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            id="hero-explore-story-btn"
            onClick={onStoryClick}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-transparent border border-neutral-700 text-neutral-200 font-heading font-bold text-xs uppercase tracking-[0.25em] hover:border-[#BE9E5E] hover:text-[#BE9E5E] transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
          >
            <span>BRAND MANIFESTO</span>
          </button>
        </div>

        {/* Scripture Badge */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 max-w-lg w-full flex flex-col items-center">
          <p className="font-serif-luxury italic text-xs md:text-sm text-neutral-400 tracking-wider text-center">
            "For in Him we live and move and have our being."
          </p>
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#BE9E5E] mt-1 font-semibold">
            ACTS 17:28
          </span>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onShopClick}
          className="mt-10 p-2 text-neutral-500 hover:text-[#BE9E5E] transition-colors animate-bounce"
          aria-label="Scroll down to clothing"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Subtle Gradient Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BE9E5E]/40 to-transparent" />
    </section>
  );
};
