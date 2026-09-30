import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 flex items-center justify-center py-10 sm:py-16">
        <div className="relative w-full max-w-4xl bg-[#0F0F0F] border border-[#262626] shadow-2xl overflow-hidden animate-fadeIn">
          {/* Close button */}
          <button
            id="close-quickview-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-[#1A1A1A]/80 border border-neutral-700 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left Col: Imagery Showcase */}
            <div className="md:col-span-6 bg-[#141414] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1F1F1F]">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#181818]">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover filter brightness-95 contrast-105 transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[9px] font-heading font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#0A0A0A]/90 text-[#BE9E5E] border border-[#BE9E5E]/40">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-20 overflow-hidden border transition-all ${
                    selectedImage === product.image ? 'border-[#BE9E5E]' : 'border-neutral-800 opacity-60'
                  }`}
                >
                  <img src={product.image} alt="Front angle" className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={() => setSelectedImage(product.hoverImage)}
                  className={`w-16 h-20 overflow-hidden border transition-all ${
                    selectedImage === product.hoverImage ? 'border-[#BE9E5E]' : 'border-neutral-800 opacity-60'
                  }`}
                >
                  <img src={product.hoverImage} alt="Lifestyle angle" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Right Col: Product Information & Order Configuration */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="pb-3 mb-3 border-b border-[#222222]">
                  <BrandLogo size="xs" layout="horizontal" theme="dark" showCrown={true} showTagline={true} />
                </div>

                {/* Collection & Category */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#BE9E5E] uppercase font-semibold">
                    {product.collection} • {product.categoryLabel}
                  </span>
                  <span className="text-neutral-400 font-mono text-[11px]">
                    ★ {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-heading font-extrabold text-white tracking-wider mb-2">
                  {product.name}
                </h2>

                {/* Price in ZAR */}
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xl sm:text-2xl font-heading font-black text-white">
                    R {product.priceZAR.toLocaleString('en-ZA')}
                  </span>
                  {product.originalPriceZAR && (
                    <span className="text-sm text-neutral-500 line-through font-mono">
                      R {product.originalPriceZAR.toLocaleString('en-ZA')}
                    </span>
                  )}
                  <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono bg-emerald-950/40 px-2 py-0.5 border border-emerald-800/40">
                    IN STOCK
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Scripture Accent Box */}
                {product.scripture && (
                  <div className="p-3 bg-[#161616] border-l-2 border-[#BE9E5E] mb-5">
                    <p className="text-[11px] font-serif-luxury italic text-neutral-300 leading-snug">
                      {product.scripture}
                    </p>
                  </div>
                )}

                {/* Fabric & Specs */}
                <div className="space-y-1.5 text-[11px] text-neutral-400 pb-4 border-b border-[#1F1F1F]">
                  <p><strong className="text-neutral-200">Fabric:</strong> {product.fabric}</p>
                  <p><strong className="text-neutral-200">Cut & Drape:</strong> {product.fit}</p>
                </div>

                {/* Size Selector */}
                <div className="pt-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-white">
                      SELECT SIZE:
                    </span>
                    <span className="text-[10px] text-neutral-400 underline cursor-pointer">
                      Size Guide (Boxy Fit)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[42px] h-10 px-3 text-xs font-mono font-bold uppercase transition-all border ${
                          selectedSize === size
                            ? 'bg-[#BE9E5E] text-[#0A0A0A] border-[#BE9E5E]'
                            : 'bg-[#181818] text-neutral-300 border-[#262626] hover:border-neutral-500 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions: Add to Cart & Wishlist */}
              <div className="space-y-3 pt-4 border-t border-[#1F1F1F]">
                <div className="flex items-center gap-3">
                  <button
                    id="quickview-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-[#BE9E5E] hover:bg-[#D4B97B] text-[#0A0A0A] font-heading font-extrabold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>ADDED TO YOUR BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG ({selectedSize})</span>
                      </>
                    )}
                  </button>

                  <button
                    id="quickview-wishlist-toggle"
                    onClick={() => onToggleWishlist(product)}
                    className={`w-14 h-13 flex items-center justify-center border transition-all ${
                      wishlisted
                        ? 'bg-[#BE9E5E] text-[#0A0A0A] border-[#BE9E5E]'
                        : 'bg-[#181818] text-neutral-300 border-neutral-700 hover:border-[#BE9E5E] hover:text-[#BE9E5E]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#0A0A0A]' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#BE9E5E]" />
                    FREE SA EXPRESS SHIPPING OVER R1,500
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#BE9E5E]" />
                    30-DAY EASY EXCHANGES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
