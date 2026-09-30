import React from 'react';
import { CategoryType } from '../types';
import { Globe, Shield, ArrowUp, Instagram, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .586.046.86.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47c.38-.38.7-.82.95-1.3V9.45a8.28 8.28 0 0 0 4.82 1.55V7.55a4.84 4.84 0 0 1-.87-.86z" />
  </svg>
);

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenPolicyModal?: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategory = (cat: CategoryType) => {
    onSelectCategory(cat);
    document.getElementById('trending-now-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#070707] border-t border-[#1A1A1A] text-neutral-400">
      {/* Top Banner with Brand Tagline */}
      <div className="border-b border-[#141414] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 cursor-pointer" onClick={scrollToTop}>
            <BrandLogo size="sm" layout="horizontal" theme="dark" showCrown={true} showTagline={true} />
          </div>

          <p className="text-xs text-neutral-400 font-light text-center md:text-right max-w-md">
            Luxury Christian streetwear designed in South Africa. Expressing identity, conviction, and bold living through architectural textiles.
          </p>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-white">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleCategory('new-drop')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  New Drop (SS26)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('hoodies')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  Hoodies and Jerseys
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('t-shirts')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  T-Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('jorts')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  Denim Jorts
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('boxy-tees')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  Boxy Heavy Tees
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('tracksuits')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  Cargo Tracksuits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('accessories')}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  Sacred Hardware
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: About & Studio */}
          <div className="space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-white">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => document.getElementById('brand-story-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#BE9E5E] transition-colors"
                >
                  Brand Manifesto
                </button>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Craftsmanship & 480GSM Fabrics
                </span>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Sustainability & Ethical Sourcing
                </span>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Johannesburg Studio
                </span>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Press & Releases
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-white">
              CLIENT CARE
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="mailto:godlikewear100@gmail.com"
                  className="text-[#BE9E5E] hover:text-[#D4B97B] font-mono text-[11px] block transition-colors break-all"
                >
                  godlikewear100@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27625818456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-[#25D366] font-mono text-[11px] block transition-colors"
                >
                  WhatsApp: 062 581 8456
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/godlike.wear/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#BE9E5E] transition-colors block"
                >
                  IG: @godlike.wear
                </a>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Shipping (South Africa & Int.)
                </span>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  30-Day Returns & Exchanges
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Community */}
          <div className="space-y-4">
            <h4 className="text-xs font-heading font-bold uppercase tracking-[0.25em] text-white">
              FIND US
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#BE9E5E] transition-colors cursor-pointer">
                  Authenticity Guaranteed
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-2.5 text-[#BE9E5E]">
              <a
                href="https://wa.me/27625818456"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-[#141414] border border-[#BE9E5E]/30 flex items-center justify-center text-[#BE9E5E] hover:text-[#0A0A0A] hover:bg-[#BE9E5E] hover:border-[#BE9E5E] transition-all"
                aria-label="WhatsApp (062 581 8456)"
                title="WhatsApp: 062 581 8456"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/godlike.wear/"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-[#141414] border border-[#BE9E5E]/30 flex items-center justify-center text-[#BE9E5E] hover:text-[#0A0A0A] hover:bg-[#BE9E5E] hover:border-[#BE9E5E] transition-all"
                aria-label="Instagram (godlike.wear)"
                title="Instagram: godlike.wear"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@godlike.wear?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-[#141414] border border-[#BE9E5E]/30 flex items-center justify-center text-[#BE9E5E] hover:text-[#0A0A0A] hover:bg-[#BE9E5E] hover:border-[#BE9E5E] transition-all"
                aria-label="TikTok (@godlike.wear)"
                title="TikTok: @godlike.wear"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:godlikewear100@gmail.com"
                className="w-8 h-8 rounded-none bg-[#141414] border border-[#BE9E5E]/30 flex items-center justify-center text-[#BE9E5E] hover:text-[#0A0A0A] hover:bg-[#BE9E5E] hover:border-[#BE9E5E] transition-all"
                aria-label="Email (godlikewear100@gmail.com)"
                title="Gmail: godlikewear100@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#141414] py-8 px-4 sm:px-6 lg:px-8 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-neutral-500 text-[11px]">
            <span>© {new Date().getFullYear()} GODLIKE APPAREL (PTY) LTD.</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-[#BE9E5E] transition-colors text-[11px] font-mono tracking-wider"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
