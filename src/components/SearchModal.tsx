import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const popularTags = [
    'Hoodies and Jerseys',
    'T-Shirts',
    'Denim Jorts',
    'Boxy Tee',
    'Kingdom Cargo',
    '18K Gold Cross',
    'Valentines God is Love'
  ];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.categoryLabel.toLowerCase().includes(lower) ||
        p.collection.toLowerCase().includes(lower) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(lower)) ||
        (p.scripture && p.scripture.toLowerCase().includes(lower))
    );
  }, [products, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 flex items-start justify-center pt-16 pb-12">
        <div className="relative w-full max-w-2xl bg-[#111111] border border-[#262626] shadow-2xl p-6 sm:p-8 space-y-6">
          {/* Brand Emblem */}
          <div className="flex justify-center pb-2 border-b border-[#222222]">
            <BrandLogo size="xs" layout="horizontal" theme="dark" showCrown={true} showTagline={true} />
          </div>

          {/* Top Search Input */}
          <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
            <div className="flex items-center gap-3 flex-1 mr-4">
              <Search className="w-5 h-5 text-[#BE9E5E]" />
              <input
                id="search-modal-input"
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH CLOTHING, FABRIC OR SCRIPTURE..."
                className="w-full bg-transparent text-sm sm:text-base font-heading font-medium tracking-wider text-white uppercase placeholder-neutral-600 focus:outline-none"
              />
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Popular Tag suggestions */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#BE9E5E] block mb-2">
              POPULAR DISCOVERIES
            </span>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] border border-neutral-800 hover:border-[#BE9E5E]/40 text-neutral-300 hover:text-white text-xs font-mono tracking-wider transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results List */}
          <div className="max-h-96 overflow-y-auto space-y-3 pt-2">
            {query.trim() !== '' && searchResults.length === 0 ? (
              <div className="py-10 text-center text-neutral-500 text-xs">
                No matching pieces found for "{query}". Try "Hoodie", "Tee", or "Valentines".
              </div>
            ) : (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-[#161616] border border-[#222222] hover:border-[#BE9E5E] cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-14 object-cover bg-[#1A1A1A]"
                    />
                    <div>
                      <h4 className="text-xs font-heading font-bold text-white group-hover:text-[#BE9E5E] transition-colors tracking-wider">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        {product.collection} • {product.categoryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <span className="text-xs font-heading font-bold text-white">
                      R {product.priceZAR.toLocaleString('en-ZA')}
                    </span>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-[#BE9E5E] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
