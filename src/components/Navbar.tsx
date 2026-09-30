import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, ChevronDown, Globe, Check } from 'lucide-react';
import { CategoryType } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: CategoryType) => void;
  selectedCategory: CategoryType;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  selectedCategory,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories: { id: CategoryType; name: string }[] = [
    { id: 'all', name: 'Clothing' },
    { id: 'new-drop', name: 'Valentines Drop (SS26)' },
    { id: 'hoodies', name: 'Hoodies & Jerseys' },
    { id: 't-shirts', name: 'T-Shirts' },
    { id: 'jorts', name: 'Denim Jorts' },
    { id: 'boxy-tees', name: 'Boxy Heavy Tees' },
    { id: 'tracksuits', name: 'Cargo Tracksuits' },
    { id: 'accessories', name: 'Sacred Hardware' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Keep navbar visible if mobile drawer or modal is open
      if (mobileMenuOpen || showRegionModal) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Always show at top of page
      if (currentScrollY <= 15) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling down: slide navbar up
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up: slide navbar down
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, showRegionModal]);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (catId: CategoryType) => {
    onSelectCategory(catId);
    setCategoryDropdownOpen(false);
    setMobileMenuOpen(false);
    const element = document.getElementById('trending-now-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Main Navbar */}
      <nav
        className={`w-full transition-colors duration-300 border-b border-[#1A1A1A] ${
          isScrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-md' : 'bg-[#0A0A0A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Trigger & Search */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-300 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                id="mobile-search-btn"
                onClick={onOpenSearch}
                className="p-2 text-neutral-300 hover:text-white transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Navigation Links (Left Side) */}
            <div className="hidden lg:flex items-center gap-8 flex-1">
              {/* Accessible Clothing Category Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  id="nav-link-clothing"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  onMouseEnter={() => setCategoryDropdownOpen(true)}
                  className="flex items-center gap-1.5 text-xs uppercase font-medium tracking-[0.2em] text-neutral-300 hover:text-[#BE9E5E] transition-all py-1 group"
                  aria-expanded={categoryDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>CLOTHING</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-[#BE9E5E] transition-transform duration-200 ${
                      categoryDropdownOpen ? 'rotate-180 text-[#BE9E5E]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {categoryDropdownOpen && (
                  <div
                    onMouseLeave={() => setCategoryDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#0F0F0F] border border-[#262626] shadow-2xl py-2 z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-2 border-b border-[#1C1C1C]">
                      <p className="text-[10px] font-mono tracking-widest text-[#BE9E5E] uppercase">
                        SELECT CLOTHING
                      </p>
                    </div>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center justify-between ${
                          selectedCategory === cat.id
                            ? 'bg-[#1A1A1A] text-[#BE9E5E] font-semibold'
                            : 'text-neutral-300 hover:bg-[#141414] hover:text-white'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.id === 'new-drop' && (
                          <span className="text-[9px] bg-[#BE9E5E] text-[#0A0A0A] font-extrabold px-1.5 py-0.5 rounded-none font-mono">
                            SS26
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                id="nav-link-story"
                onClick={() => scrollToSection('brand-story-section')}
                className="text-xs uppercase font-medium tracking-[0.2em] text-neutral-300 hover:text-[#BE9E5E] transition-all relative py-1"
              >
                OUR STORY
              </button>

              <button
                id="nav-link-socials"
                onClick={() => scrollToSection('socials-section')}
                className="text-xs uppercase font-medium tracking-[0.2em] text-neutral-300 hover:text-[#BE9E5E] transition-all relative py-1"
              >
                SOCIALS
              </button>
            </div>

            {/* Center Official Brand Logo */}
            <div
              id="main-brand-logo-navbar"
              className="flex items-center justify-center cursor-pointer group py-1 shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <BrandLogo
                size="sm"
                layout="stacked"
                theme="dark"
                showCrown={true}
                showTagline={true}
              />
            </div>

            {/* Actions: Region, Search, Wishlist, Cart (Right Side) */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1">
              {/* Accessible Region & Currency Button */}
              <button
                id="nav-region-btn"
                onClick={() => setShowRegionModal(true)}
                className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 hover:text-[#BE9E5E] px-2.5 py-1.5 rounded-[15px] border border-neutral-800 hover:border-[#BE9E5E]/50 transition-all bg-[#0F0F0F]"
                title="Region: South Africa (ZAR R)"
                aria-label="Region and currency settings"
              >
                <Globe className="w-3.5 h-3.5 text-[#BE9E5E]" />
                <span>ZA (R)</span>
              </button>

              {/* Desktop Search */}
              <button
                id="desktop-search-btn"
                onClick={onOpenSearch}
                className="hidden lg:flex items-center gap-2 text-xs tracking-widest text-neutral-400 hover:text-white px-3 py-1.5 rounded-full border border-neutral-800 hover:border-neutral-600 transition-all"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-[#BE9E5E]" />
                <span>SEARCH</span>
              </button>

              {/* Wishlist button */}
              <button
                id="nav-wishlist-btn"
                onClick={onOpenWishlist}
                className="relative p-2 text-neutral-300 hover:text-[#BE9E5E] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#BE9E5E] text-[#0A0A0A] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart button */}
              <button
                id="nav-cart-btn"
                onClick={onOpenCart}
                className="relative flex items-center gap-2 p-2 bg-[#1A1A1A] hover:bg-[#252525] border border-neutral-800 hover:border-[#BE9E5E]/40 px-3 py-2 transition-all group"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#BE9E5E] group-hover:scale-110 transition-transform" />
                <span className="text-xs tracking-widest uppercase font-semibold hidden sm:inline">CART</span>
                <span className="bg-[#BE9E5E] text-[#0A0A0A] font-bold text-[11px] px-1.5 py-0.5 rounded-sm min-w-[20px] text-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-6 animate-fadeIn">
            <div className="space-y-5">
              <div className="flex justify-center pb-4 border-b border-[#1F1F1F]">
                <BrandLogo size="sm" layout="stacked" theme="dark" showCrown={true} showTagline={true} />
              </div>

              {/* Mobile Navigation Links */}
              <div className="border-b border-[#1F1F1F] pb-4 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#BE9E5E] mb-3">NAVIGATION</p>

                {/* Expandable Clothing in Mobile Menu */}
                <div>
                  <button
                    onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                    className="flex items-center justify-between w-full py-2 text-sm uppercase tracking-[0.2em] text-neutral-200 hover:text-[#BE9E5E] transition-colors text-left"
                  >
                    <span>CLOTHING</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-500 transition-transform ${
                        mobileCategoryOpen ? 'rotate-180 text-[#BE9E5E]' : ''
                      }`}
                    />
                  </button>

                  {mobileCategoryOpen && (
                    <div className="pl-4 py-2 space-y-1.5 border-l border-[#262626] my-2 bg-[#0E0E0E]">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between ${
                            selectedCategory === cat.id
                              ? 'text-[#BE9E5E] font-bold'
                              : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span>{cat.name}</span>
                          {cat.id === 'new-drop' && (
                            <span className="text-[9px] bg-[#BE9E5E] text-[#0A0A0A] font-mono px-1">
                              SS26
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => scrollToSection('brand-story-section')}
                  className="flex items-center justify-between w-full py-2 text-sm uppercase tracking-[0.2em] text-neutral-200 hover:text-[#BE9E5E] transition-colors text-left"
                >
                  <span>BRAND STORY & MANIFESTO</span>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </button>

                <button
                  onClick={() => scrollToSection('socials-section')}
                  className="flex items-center justify-between w-full py-2 text-sm uppercase tracking-[0.2em] text-neutral-200 hover:text-[#BE9E5E] transition-colors text-left"
                >
                  <span>FIND US ON OUR SOCIALS</span>
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </button>
              </div>

              {/* Region and Shipping info */}
              <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
                <button
                  onClick={() => setShowRegionModal(true)}
                  className="flex items-center gap-2 text-neutral-300 hover:text-[#BE9E5E] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[#BE9E5E]" />
                  <span>South Africa (ZAR R)</span>
                </button>
                <span className="text-[#BE9E5E] text-[10px] tracking-widest uppercase font-mono">
                  FREE SHIPPING R1500+
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Accessible Region & Currency Modal */}
      {showRegionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-[#0F0F0F] border border-[#2A2A2A] shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setShowRegionModal(false)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white bg-[#1A1A1A] border border-neutral-800 transition-colors"
              aria-label="Close region modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#1A1A1A] border border-[#BE9E5E]/40 flex items-center justify-center text-[#BE9E5E]">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#BE9E5E] uppercase block">
                  DELIVERY DESTINATION
                </span>
                <h3 className="text-lg font-heading font-bold text-white">
                  REGION & CURRENCY
                </h3>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="p-3.5 bg-[#141414] border border-[#BE9E5E] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">South Africa</span>
                    <span className="text-[9px] bg-[#BE9E5E] text-[#0A0A0A] font-extrabold px-1.5 py-0.2 font-mono">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Currency: South African Rand (ZAR R)
                  </p>
                </div>
                <Check className="w-5 h-5 text-[#BE9E5E]" />
              </div>

              <div className="p-3 bg-[#111111] border border-neutral-800 text-xs text-neutral-400 space-y-1">
                <p className="text-neutral-300 font-medium">Studio Dispatch:</p>
                <p>Orders are packaged and dispatched directly from our studio in Johannesburg, Gauteng.</p>
                <p className="text-[#BE9E5E] pt-1">All prices include South African VAT.</p>
              </div>
            </div>

            <button
              onClick={() => setShowRegionModal(false)}
              className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#252525] border border-neutral-700 text-white text-xs font-mono tracking-wider transition-colors"
            >
              CONFIRM REGION
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
