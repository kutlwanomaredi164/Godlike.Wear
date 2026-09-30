import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Users } from 'lucide-react';

export const FeaturesRow: React.FC = () => {
  const features = [
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      subtitle: 'Complimentary express delivery across South Africa on all orders over R1,500.',
      tag: 'FAST DISPATCH',
    },
    {
      icon: ShieldCheck,
      title: 'PREMIUM QUALITY',
      subtitle: 'Bespoke 480GSM French terry and custom-milled 280GSM compact cottons.',
      tag: 'HEAVYWEIGHT',
    },
    {
      icon: RefreshCw,
      title: 'EASY RETURNS',
      subtitle: '30-day effortless size exchange and returns policy for complete peace of mind.',
      tag: '30 DAYS',
    },
    {
      icon: Users,
      title: 'COMMUNITY DRIVEN',
      subtitle: 'A global movement of believers wearing identity, conviction, and bold living.',
      tag: 'KINGDOM FIRST',
    },
  ];

  return (
    <section className="w-full bg-[#0E0E0E] border-y border-[#1A1A1A] py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col p-6 rounded-none bg-[#141414] border border-[#222222] hover:border-[#BE9E5E]/50 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Subtle corner gold indicator */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                  <div className="w-4 h-4 bg-[#BE9E5E]/10 group-hover:bg-[#BE9E5E]/30 transform rotate-45 translate-x-2 -translate-y-2 transition-colors" />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#1A1A1A] flex items-center justify-center text-[#BE9E5E] group-hover:bg-[#BE9E5E] group-hover:text-[#0A0A0A] transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#BE9E5E] font-semibold">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-sm font-heading font-bold text-white tracking-wider mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {feature.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
