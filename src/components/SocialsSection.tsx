import React, { useState } from 'react';
import { Instagram, Mail, ExternalLink, Check, Copy } from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .586.046.86.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47c.38-.38.7-.82.95-1.3V9.45a8.28 8.28 0 0 0 4.82 1.55V7.55a4.84 4.84 0 0 1-.87-.86z" />
  </svg>
);

export const SocialsSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const socials = [
    {
      key: 'instagram',
      name: 'INSTAGRAM',
      tag: 'OFFICIAL FEED',
      handle: '@godlike.wear',
      description: 'Daily clothing releases, campaign visuals, sacred scripture drops, and community fit checks.',
      icon: Instagram,
      actionText: 'FOLLOW @GODLIKE.WEAR',
      href: 'https://www.instagram.com/godlike.wear/',
      copyValue: '@godlike.wear',
    },
    {
      key: 'whatsapp',
      name: 'WHATSAPP CONCIERGE',
      tag: 'DIRECT LINE',
      handle: '+27 62 581 8456',
      description: 'Instant sizing guidance, direct order assistance, VIP reservations, and South African dispatch updates.',
      customIcon: WhatsAppIcon,
      actionText: 'CHAT ON WHATSAPP',
      href: 'https://wa.me/27625818456',
      copyValue: '0625818456',
    },
    {
      key: 'tiktok',
      name: 'TIKTOK',
      tag: 'VIDEO ARCHIVE',
      handle: '@godlike.wear',
      description: 'Motion campaign films, heavyweight French terry fabric reviews, and drop previews.',
      customIcon: TikTokIcon,
      actionText: 'WATCH ON TIKTOK',
      href: 'https://www.tiktok.com/@godlike.wear?is_from_webapp=1&sender_device=pc',
      copyValue: '@godlike.wear',
    },
    {
      key: 'email',
      name: 'DIRECT INQUIRIES',
      tag: 'OFFICIAL MAIL',
      handle: 'godlikewear100@gmail.com',
      description: 'Wholesale inquiries, collaborative opportunities, press features, and customer care.',
      icon: Mail,
      actionText: 'SEND AN EMAIL',
      href: 'mailto:godlikewear100@gmail.com',
      copyValue: 'godlikewear100@gmail.com',
    },
  ];

  return (
    <section id="socials-section" className="w-full bg-[#090909] py-16 lg:py-24 border-b border-[#1A1A1A] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#BE9E5E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1F1F1F] pb-6">
          <div>
            <div className="mb-2">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#BE9E5E]">
                COMMUNITY & CHANNELS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              FIND US ON OUR SOCIALS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Follow the official GODLIKE journey across all platforms. Connect with our team for priority drop releases, bespoke sizing advice, and VIP service.
          </p>
        </div>

        {/* 4 Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {socials.map((item) => {
            const Icon = item.icon;
            const CustomIcon = item.customIcon;
            const isCopied = copiedKey === item.key;

            return (
              <div
                key={item.key}
                className="flex flex-col justify-between p-6 bg-[#121212] border border-[#1E1E1E] hover:border-[#BE9E5E]/60 transition-all duration-300 group relative"
              >
                {/* Top Corner Gold Indicator */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                  <div className="w-4 h-4 bg-[#BE9E5E]/10 group-hover:bg-[#BE9E5E]/30 transform rotate-45 translate-x-2 -translate-y-2 transition-colors" />
                </div>

                <div>
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-[#1A1A1A] border border-[#2A2A2A] group-hover:border-[#BE9E5E] group-hover:bg-[#BE9E5E] text-[#BE9E5E] group-hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-300">
                      {Icon && <Icon className="w-5 h-5" />}
                      {CustomIcon && <CustomIcon className="w-5 h-5" />}
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.25em] text-[#BE9E5E] font-semibold">
                      {item.tag}
                    </span>
                  </div>

                  {/* Name & Handle */}
                  <h3 className="text-sm font-heading font-bold text-white tracking-wider mb-1">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-[#BE9E5E] tracking-tight">
                      {item.handle}
                    </span>
                    <button
                      onClick={() => handleCopy(item.key, item.copyValue)}
                      aria-label={`Copy ${item.handle}`}
                      className="p-1 text-neutral-500 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <Check className="w-3.5 h-3.5 text-[#BE9E5E]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    {isCopied && (
                      <span className="text-[9px] text-[#BE9E5E] font-mono tracking-wider">
                        COPIED
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Direct Action Link */}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#181818] group-hover:bg-[#BE9E5E] text-neutral-200 group-hover:text-[#0A0A0A] border border-neutral-800 group-hover:border-[#BE9E5E] text-[10px] font-heading font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>{item.actionText}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
