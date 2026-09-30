import React from 'react';
import { Product } from '../types';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md bg-[#0D0D0D] border-l border-[#222222] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex items-center justify-between bg-[#111111]">
            <div className="flex items-center gap-3">
              <BrandLogo size="xs" layout="horizontal" theme="dark" showCrown={true} showTagline={false} />
              <span className="text-xs font-mono text-[#BE9E5E] bg-[#1F1F1F] px-2 py-0.5 rounded-sm">
                SAVED ({wishlist.length})
              </span>
            </div>

            <button
              id="close-wishlist-btn"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#141414] border border-[#222222] flex items-center justify-center text-neutral-500">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-heading font-bold uppercase tracking-widest text-neutral-300">
                  NO SAVED PIECES YET
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click the heart icon on any piece to save clothing to your personal archive.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#BE9E5E] text-white hover:text-[#0A0A0A] border border-neutral-700 text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                >
                  EXPLORE ARCHIVE
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-[#141414] border border-[#1F1F1F] group"
                >
                  <div
                    onClick={() => {
                      onQuickView(product);
                      onClose();
                    }}
                    className="w-20 h-24 bg-[#181818] overflow-hidden flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            onQuickView(product);
                            onClose();
                          }}
                          className="text-xs font-heading font-bold text-white tracking-wider line-clamp-1 hover:text-[#BE9E5E] cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-[#BE9E5E] uppercase">
                        {product.collection}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-heading font-bold text-white">
                        R {product.priceZAR.toLocaleString('en-ZA')}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(product, product.sizes[0]);
                          onRemoveFromWishlist(product);
                        }}
                        className="px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#BE9E5E] text-white hover:text-[#0A0A0A] border border-neutral-700 hover:border-[#BE9E5E] text-[10px] font-heading font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>MOVE TO BAG</span>
                      </button>
                    </div>
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
