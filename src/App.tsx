/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CategoryType, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesRow } from './components/FeaturesRow';
import { ShopByCategory } from './components/ShopByCategory';
import { TrendingProducts } from './components/TrendingProducts';
import { BrandStoryBanner } from './components/BrandStoryBanner';
import { SocialsSection } from './components/SocialsSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';

export default function App() {
  // Navigation & Category state
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  // Cart state with persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('godlike_cart');
      return saved ? JSON.parse(saved) : [
        // Seed default item for instant ecommerce experience
        {
          product: PRODUCTS[0],
          size: 'L',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state with persistence
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('godlike_wishlist');
      return saved ? JSON.parse(saved) : [PRODUCTS[1], PRODUCTS[5]];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast state
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    subMessage?: string;
  }>({
    visible: false,
    message: '',
  });

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('godlike_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('godlike_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart handlers
  const handleAddToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, size, quantity }];
    });

    setToast({
      visible: true,
      message: 'ADDED TO BAG',
      subMessage: `${product.name} (SIZE: ${size})`,
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        setToast({
          visible: true,
          message: 'REMOVED FROM SAVED',
          subMessage: product.name,
        });
        return prev.filter((p) => p.id !== product.id);
      } else {
        setToast({
          visible: true,
          message: 'SAVED TO WISHLIST',
          subMessage: product.name,
        });
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Scroll helpers
  const scrollToTrending = () => {
    const el = document.getElementById('trending-now-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToStory = () => {
    const el = document.getElementById('brand-story-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-body flex flex-col selection:bg-[#BE9E5E] selection:text-[#0A0A0A]">
      {/* Navigation matching NEON structure */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1">
        {/* Large Hero Banner */}
        <Hero onShopClick={scrollToTrending} onStoryClick={scrollToStory} />

        {/* Service Features Row */}
        <FeaturesRow />

        {/* Shop By Category */}
        <ShopByCategory onSelectCategory={setSelectedCategory} />

        {/* Trending Products Section */}
        <TrendingProducts
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={isWishlisted}
          onQuickView={setQuickViewProduct}
        />

        {/* Brand Story Banner */}
        <BrandStoryBanner onShopClick={scrollToTrending} />

        {/* Find Us On Our Socials Section */}
        <SocialsSection />

        {/* Community Newsletter Section */}
        <Newsletter />
      </main>

      {/* Modern Footer */}
      <Footer onSelectCategory={setSelectedCategory} />

      {/* Shopping Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Slide-out Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={setQuickViewProduct}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={setQuickViewProduct}
      />

      {/* Quick View Product Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={isWishlisted}
      />

      {/* Interactive Toast Notification */}
      <Toast
        isVisible={toast.visible}
        message={toast.message}
        subMessage={toast.subMessage}
        onClose={() => setToast({ ...toast, visible: false })}
        onAction={() => {
          setToast({ ...toast, visible: false });
          setIsCartOpen(true);
        }}
        actionText="VIEW BAG"
      />
    </div>
  );
}
