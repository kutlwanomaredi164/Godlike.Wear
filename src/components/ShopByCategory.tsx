import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../data/products';
import { CategoryType } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ShopByCategoryProps {
  onSelectCategory: (category: CategoryType) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  const [isNewDropHovered, setIsNewDropHovered] = useState(false);

  const handleClick = (catId: string) => {
    onSelectCategory(catId as CategoryType);
    const element = document.getElementById('trending-now-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="shop-by-category-section"
      className={`relative w-full py-16 lg:py-24 border-b transition-all duration-700 ease-out overflow-hidden ${
        isNewDropHovered
          ? 'bg-[#120E07] border-[#BE9E5E]/40'
          : 'bg-[#0A0A0A] border-[#1A1A1A]'
      }`}
    >
      {/* Dynamic Godlike Gold Atmospheric Blend Backdrop */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-0 ${
          isNewDropHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `
            radial-gradient(ellipse 95% 75% at 20% 35%, rgba(190, 158, 94, 0.32) 0%, rgba(150, 120, 50, 0.16) 45%, transparent 75%),
            radial-gradient(ellipse 80% 60% at 85% 75%, rgba(190, 158, 94, 0.18) 0%, transparent 65%),
            linear-gradient(180deg, rgba(28, 20, 8, 0.9) 0%, rgba(18, 14, 7, 0.95) 50%, rgba(10, 8, 4, 1) 100%)
          `,
        }}
      />

      {/* Golden Aura Light Burst focused behind the New Drop column */}
      <div
        className={`absolute -top-24 -left-20 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] pointer-events-none transition-all duration-1000 ease-out z-0 rounded-full blur-[110px] ${
          isNewDropHovered ? 'opacity-65 scale-110' : 'opacity-0 scale-75'
        }`}
        style={{
          background: 'radial-gradient(circle, #BE9E5E 0%, rgba(190, 158, 94, 0.35) 45%, transparent 70%)',
        }}
      />

      {/* Subtle Architectural Gold Grid Pattern Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 z-0 bg-[linear-gradient(to_right,rgba(190,158,94,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(190,158,94,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] ${
          isNewDropHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 border-b pb-6 transition-colors duration-700 ${
            isNewDropHovered ? 'border-[#BE9E5E]/40' : 'border-[#1F1F1F]'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase block transition-all duration-500 ${
                  isNewDropHovered
                    ? 'text-[#BE9E5E] drop-shadow-[0_0_12px_rgba(190,158,94,0.6)]'
                    : 'text-[#BE9E5E]'
                }`}
              >
                CURATED CLOTHING
              </span>
              {isNewDropHovered && (
                <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase bg-[#BE9E5E] text-[#0A0A0A] font-extrabold animate-pulse">
                  NEW DROP SPOTLIGHT
                </span>
              )}
            </div>
            <h2
              className={`text-2xl sm:text-4xl font-heading font-extrabold tracking-tight transition-all duration-500 ${
                isNewDropHovered
                  ? 'text-white drop-shadow-[0_0_24px_rgba(190,158,94,0.4)]'
                  : 'text-white'
              }`}
            >
              SHOP BY CATEGORY
            </h2>
          </div>
        </div>

        {/* Categories Grid - 7 Curated Silhouettes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isNewDrop = cat.id === 'new-drop';

            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => handleClick(cat.id)}
                onMouseEnter={() => {
                  if (isNewDrop) setIsNewDropHovered(true);
                }}
                onMouseLeave={() => {
                  if (isNewDrop) setIsNewDropHovered(false);
                }}
                className={`group relative h-[380px] sm:h-[420px] overflow-hidden cursor-pointer flex flex-col justify-end p-6 transition-all duration-700 ease-out ${
                  isNewDrop
                    ? isNewDropHovered
                      ? 'bg-[#181208] border-2 border-[#BE9E5E] shadow-[0_0_50px_rgba(190,158,94,0.45)] ring-2 ring-[#BE9E5E]/50 -translate-y-2.5 scale-[1.02] z-30'
                      : 'bg-[#141414] border border-[#BE9E5E]/40 hover:border-[#BE9E5E] z-10'
                    : isNewDropHovered
                    ? 'bg-[#0E0E0E]/90 border border-[#1C1812] opacity-45 filter brightness-[0.7] blur-[0.3px] scale-[0.985] z-0'
                    : 'bg-[#141414] border border-[#1F1F1F] hover:border-[#BE9E5E]/60 z-0'
                }`}
              >
                {/* Special New Drop Spotlight Accent Badge */}
                {isNewDrop && (
                  <div className="absolute top-4 left-4 z-20 flex items-center px-3 py-1 bg-[#BE9E5E] text-[#0A0A0A] text-[9px] font-heading font-black uppercase tracking-[0.2em] shadow-lg">
                    <span>VALENTINES DROP</span>
                  </div>
                )}

                {/* Category Image with dark gradient and zoom effect */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                      isNewDrop
                        ? isNewDropHovered
                          ? 'filter brightness-[0.95] contrast-115 scale-105'
                          : 'filter brightness-[0.7] contrast-110 group-hover:scale-105 group-hover:brightness-[0.8]'
                        : 'filter brightness-[0.6] contrast-110 group-hover:scale-105 group-hover:brightness-[0.75]'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-700 ${
                      isNewDrop && isNewDropHovered
                        ? 'bg-gradient-to-t from-[#140F05] via-[#140F05]/30 to-transparent'
                        : 'bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent'
                    }`}
                  />
                </div>

                {/* Top Action Arrow */}
                <div className="absolute top-4 right-4 z-10 flex items-center justify-end">
                  <div
                    className={`w-8 h-8 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-300 ${
                      isNewDrop && isNewDropHovered
                        ? 'bg-[#BE9E5E] text-[#0A0A0A] border-[#BE9E5E] shadow-[0_0_15px_rgba(190,158,94,0.6)]'
                        : 'bg-[#0A0A0A]/70 border-neutral-700 text-white group-hover:bg-[#BE9E5E] group-hover:text-[#0A0A0A] group-hover:border-[#BE9E5E]'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Category Info Bottom */}
                <div className="relative z-10">
                  <span
                    className={`text-[9px] uppercase tracking-[0.25em] block mb-1 font-semibold transition-colors duration-500 ${
                      isNewDrop && isNewDropHovered
                        ? 'text-[#F6E3B8] font-bold drop-shadow-[0_0_8px_rgba(190,158,94,0.5)]'
                        : 'text-[#BE9E5E]'
                    }`}
                  >
                    {cat.tagline}
                  </span>
                  <h3
                    className={`text-xl font-heading font-bold tracking-wider mb-2 transition-colors duration-300 ${
                      isNewDrop && isNewDropHovered
                        ? 'text-white drop-shadow-[0_0_12px_rgba(190,158,94,0.4)]'
                        : 'text-white group-hover:text-[#F5F5F5]'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className={`text-[11px] line-clamp-2 font-light transition-colors duration-500 ${
                      isNewDrop && isNewDropHovered ? 'text-amber-100/90' : 'text-neutral-300'
                    }`}
                  >
                    {cat.description}
                  </p>

                  {/* Bottom line hover progress */}
                  <div
                    className={`h-[2px] bg-[#BE9E5E] mt-4 transition-all duration-500 ${
                      isNewDrop && isNewDropHovered ? 'w-full shadow-[0_0_10px_#BE9E5E]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
