import React, { useState, useMemo } from 'react';
import { Product, CategoryType } from '../types';
import { Heart, Eye, ShoppingBag, Filter, Check, ArrowUpDown } from 'lucide-react';

interface TrendingProductsProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  onQuickView: (product: Product) => void;
}

export const TrendingProducts: React.FC<TrendingProductsProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [activeSizeSelectors, setActiveSizeSelectors] = useState<{ [productId: string]: string }>({});

  const filterTabs: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'ALL CLOTHING' },
    { id: 'new-drop', label: 'NEW DROP' },
    { id: 'hoodies', label: 'HOODIES and JERSEYS' },
    { id: 't-shirts', label: 'T-SHIRTS' },
    { id: 'jorts', label: 'JORTS' },
    { id: 'boxy-tees', label: 'BOXY TEES' },
    { id: 'tracksuits', label: 'TRACKSUITS' },
    { id: 'accessories', label: 'ACCESSORIES' },
  ];

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new-drop') {
        list = list.filter(
          (p) =>
            p.category === 'new-drop' ||
            p.badge?.toLowerCase().includes('drop') ||
            p.collection?.toLowerCase().includes('drop')
        );
      } else {
        list = list.filter((p) => p.category === selectedCategory);
      }
    }

    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.priceZAR - b.priceZAR);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.priceZAR - a.priceZAR);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [products, selectedCategory, sortBy]);

  const handleSelectSize = (productId: string, size: string) => {
    setActiveSizeSelectors((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddWithSelectedSize = (product: Product) => {
    const selectedSize = activeSizeSelectors[product.id] || product.sizes[0];
    onAddToCart(product, selectedSize);
  };

  return (
    <section id="trending-now-section" className="w-full bg-[#0A0A0A] py-16 lg:py-24 border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1F1F1F]">
          <div>
            <div className="mb-2">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#BE9E5E]">
                CORE COLLECTION & SS26
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              TRENDING NOW
            </h2>
          </div>
        </div>

        {/* Filter Controls & Sort Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3.5 py-2 text-[11px] font-heading font-bold uppercase tracking-[0.18em] transition-all whitespace-nowrap border ${
                  selectedCategory === tab.id
                    ? 'bg-[#BE9E5E] text-[#0A0A0A] border-[#BE9E5E]'
                    : 'bg-[#141414] text-neutral-300 border-[#222222] hover:border-neutral-600 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Count */}
          <div className="flex items-center gap-4 self-end sm:self-auto text-xs">
            <span className="text-neutral-500 font-mono text-[11px]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'ITEM' : 'ITEMS'}
            </span>

            <div className="relative flex items-center gap-2 bg-[#141414] border border-[#222222] px-3 py-1.5 rounded-none text-neutral-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#BE9E5E]" />
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-neutral-200 text-xs tracking-wider uppercase focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured" className="bg-[#141414]">Featured</option>
                <option value="price-asc" className="bg-[#141414]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#141414]">Price: High to Low</option>
                <option value="rating" className="bg-[#141414]">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {filteredProducts.map((product) => {
            const currentSelectedSize = activeSizeSelectors[product.id] || product.sizes[0];
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group flex flex-col bg-[#121212] border border-[#1E1E1E] hover:border-[#BE9E5E]/60 transition-all duration-300 relative"
              >
                {/* Image Showcase Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#181818] cursor-pointer">
                  {/* Primary Front Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center filter brightness-90 contrast-105 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
                    onClick={() => onQuickView(product)}
                  />

                  {/* Secondary / Hover Image */}
                  <img
                    src={product.hoverImage}
                    alt={`${product.name} alternate view`}
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-105 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    onClick={() => onQuickView(product)}
                  />

                  {/* Badge (Top Left) */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[9px] font-heading font-extrabold uppercase tracking-[0.2em] px-2.5 py-1 bg-[#0A0A0A]/90 text-[#BE9E5E] border border-[#BE9E5E]/40 backdrop-blur-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button (Top Right) */}
                  <button
                    id={`wishlist-btn-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
                      wishlisted
                        ? 'bg-[#BE9E5E] text-[#0A0A0A] border-[#BE9E5E]'
                        : 'bg-[#0A0A0A]/70 text-white border-neutral-700 hover:border-[#BE9E5E] hover:text-[#BE9E5E]'
                    }`}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#0A0A0A]' : ''}`} />
                  </button>

                  {/* Quick View Floating Overlay Button */}
                  <button
                    id={`quick-view-btn-${product.id}`}
                    onClick={() => onQuickView(product)}
                    className="absolute bottom-3 left-3 right-3 z-10 py-2.5 bg-[#0A0A0A]/90 hover:bg-[#BE9E5E] hover:text-[#0A0A0A] text-white border border-neutral-700 hover:border-[#BE9E5E] text-[10px] font-heading font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-xl"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>QUICK VIEW</span>
                  </button>
                </div>

                {/* Product Metadata & Actions */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Collection and Subtitle */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#BE9E5E]">
                        {product.collection}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        ★ {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3
                      onClick={() => onQuickView(product)}
                      className="text-xs sm:text-sm font-heading font-bold text-white hover:text-[#BE9E5E] transition-colors line-clamp-1 cursor-pointer tracking-wider mb-1"
                    >
                      {product.name}
                    </h3>

                    {/* Fabric / Spec note */}
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mb-3">
                      {product.subtitle || product.fabric}
                    </p>

                    {/* Price in South African Rand (ZAR) */}
                    <div className="flex items-baseline gap-2.5 mb-4">
                      <span className="text-base sm:text-lg font-heading font-extrabold text-[#F5F5F5] tracking-tight">
                        R {product.priceZAR.toLocaleString('en-ZA')}
                      </span>
                      {product.originalPriceZAR && (
                        <span className="text-xs text-neutral-500 line-through font-mono">
                          R {product.originalPriceZAR.toLocaleString('en-ZA')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size Selector & Add To Cart Button */}
                  <div className="space-y-2.5 pt-2 border-t border-[#1C1C1C]">
                    {/* Size Selector Chips */}
                    {product.sizes.length > 1 && (
                      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 mr-1">
                          SIZE:
                        </span>
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSelectSize(product.id, size)}
                            className={`min-w-[26px] h-6 px-1.5 text-[10px] font-mono font-semibold transition-all border ${
                              currentSelectedSize === size
                                ? 'bg-[#BE9E5E] text-[#0A0A0A] border-[#BE9E5E]'
                                : 'bg-[#181818] text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Add to Cart Button */}
                    <button
                      id={`add-to-cart-btn-${product.id}`}
                      onClick={() => handleAddWithSelectedSize(product)}
                      className="w-full py-3 bg-[#1A1A1A] hover:bg-[#BE9E5E] text-white hover:text-[#0A0A0A] border border-neutral-700 hover:border-[#BE9E5E] font-heading font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#BE9E5E] group-hover/btn:text-[#0A0A0A] transition-colors" />
                      <span>ADD TO CART {product.sizes.length > 1 ? `(${currentSelectedSize})` : ''}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
