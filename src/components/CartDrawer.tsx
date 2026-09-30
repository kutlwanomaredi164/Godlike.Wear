import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Form states for simulated checkout
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    province: 'Gauteng',
    postalCode: '',
    phone: '',
    paymentMethod: 'payfast'
  });

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.priceZAR * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const eligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = eligibleForFreeShipping || subtotal === 0 ? 0 : 150;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FAITH10' || clean === 'GODLIKE10') {
      setDiscountPercent(10);
      setPromoSuccess('10% VIP DISCOUNT APPLIED');
    } else if (clean === 'KINGDOM20') {
      setDiscountPercent(20);
      setPromoSuccess('20% SPECIAL COMMUNITY ACCESS APPLIED');
    } else {
      setPromoError('INVALID OR EXPIRED VOUCHER');
    }
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 1500);
  };

  const resetCheckout = () => {
    setIsCheckingOut(false);
    setCheckoutComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
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
                BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3.5 bg-[#141414] border-b border-[#1F1F1F]">
            {eligibleForFreeShipping ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <Check className="w-4 h-4" />
                <span>YOU QUALIFY FOR FREE SOUTH AFRICA EXPRESS SHIPPING</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400">
                    Add <strong className="text-[#BE9E5E]">R {shippingRemaining.toLocaleString('en-ZA')}</strong> more for Free Shipping
                  </span>
                  <span className="text-neutral-500 font-mono">{shippingProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#BE9E5E] to-[#D4B97B] transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {checkoutComplete ? (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="flex justify-center mb-2">
                  <BrandLogo size="sm" layout="stacked" theme="dark" showCrown={true} showTagline={true} />
                </div>
                <div className="w-12 h-12 mx-auto rounded-full bg-[#BE9E5E] text-[#0A0A0A] flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-heading font-extrabold text-white uppercase tracking-wider">
                  ORDER CONFIRMED
                </h3>
                <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{shippingDetails.fullName || 'Beloved'}</span>. Your order reference <span className="text-[#BE9E5E] font-mono font-bold">#GL-{Math.floor(100000 + Math.random() * 900000)}</span> has been registered.
                </p>
                <div className="p-4 bg-[#141414] border border-[#222222] text-left text-xs space-y-1">
                  <p className="text-neutral-400">Dispatch Studio: <span className="text-white">Sandton, Johannesburg</span></p>
                  <p className="text-neutral-400">Delivery Method: <span className="text-[#BE9E5E]">The Courier Guy Express (1-3 days)</span></p>
                  <p className="text-neutral-400">Total Paid: <span className="text-white font-mono font-bold">R {total.toLocaleString('en-ZA')}</span></p>
                </div>
                <button
                  onClick={() => {
                    resetCheckout();
                    onClose();
                  }}
                  className="w-full py-3 bg-[#BE9E5E] text-[#0A0A0A] font-heading font-bold text-xs uppercase tracking-widest hover:bg-[#D4B97B] transition-colors"
                >
                  RETURN TO STORE
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Simulated South African Checkout Flow */
              <form onSubmit={handleSimulateCheckout} className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-[#222222] pb-3">
                  <h3 className="text-xs font-heading font-bold uppercase tracking-widest text-[#BE9E5E]">
                    SOUTH AFRICA SHIPPING DETAILS
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-[10px] uppercase text-neutral-400 hover:text-white"
                  >
                    Back to Bag
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sipho Ndlovu"
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#BE9E5E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sipho@example.co.za"
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#BE9E5E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Physical Street Address
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Street address, suburb, apartment"
                      value={shippingDetails.address}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                      className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#BE9E5E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Johannesburg / Cape Town"
                        value={shippingDetails.city}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#BE9E5E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                        Province
                      </label>
                      <select
                        value={shippingDetails.province}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, province: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white focus:outline-none focus:border-[#BE9E5E]"
                      >
                        <option value="Gauteng">Gauteng</option>
                        <option value="Western Cape">Western Cape</option>
                        <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                        <option value="Eastern Cape">Eastern Cape</option>
                        <option value="Free State">Free State</option>
                        <option value="Mpumalanga">Mpumalanga</option>
                        <option value="Limpopo">Limpopo</option>
                        <option value="North West">North West</option>
                        <option value="Northern Cape">Northern Cape</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="2196"
                        value={shippingDetails.postalCode}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#BE9E5E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="082 123 4567"
                        value={shippingDetails.phone}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                        className="w-full bg-[#141414] border border-[#262626] px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-[#BE9E5E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                      Payment Gateway
                    </label>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <label className="flex items-center gap-2 p-2.5 bg-[#181818] border border-neutral-700 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="payfast"
                          defaultChecked
                          className="accent-[#BE9E5E]"
                        />
                        <span className="text-[11px] font-semibold text-white">PayFast / Ozow</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 bg-[#181818] border border-neutral-700 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          className="accent-[#BE9E5E]"
                        />
                        <span className="text-[11px] font-semibold text-white">Credit / Debit Card</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#141414] border border-[#222222] text-[11px] text-neutral-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#BE9E5E]" />
                  <span>256-bit encrypted checkout. Hand-packaged in Johannesburg.</span>
                </div>

                <button
                  id="submit-checkout-btn"
                  type="submit"
                  className="w-full py-4 bg-[#BE9E5E] hover:bg-[#D4B97B] text-[#0A0A0A] font-heading font-extrabold text-xs uppercase tracking-[0.25em] transition-all shadow-xl"
                >
                  COMPLETE PURCHASE (R {total.toLocaleString('en-ZA')})
                </button>
              </form>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#141414] border border-[#222222] flex items-center justify-center text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-heading font-bold uppercase tracking-widest text-neutral-300">
                  YOUR BAG IS CURRENTLY EMPTY
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Browse our core clothing and seasonal limited releases.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#BE9E5E] text-white hover:text-[#0A0A0A] border border-neutral-700 text-xs font-heading font-bold uppercase tracking-wider transition-colors"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              /* Item List */
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-3 bg-[#141414] border border-[#1F1F1F] group"
                  >
                    <div className="w-20 h-24 bg-[#181818] overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover filter brightness-90"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-heading font-bold text-white tracking-wider line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                          SIZE: <span className="text-[#BE9E5E] font-bold">{item.size}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#2A2A2A] bg-[#0E0E0E]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-mono text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-heading font-bold text-[#F5F5F5]">
                          R {(item.product.priceZAR * item.quantity).toLocaleString('en-ZA')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2">
                  <div className="flex items-stretch gap-1 bg-[#141414] p-1 border border-[#222222]">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="DISCOUNT CODE (e.g. FAITH10)"
                      className="w-full bg-transparent px-3 py-2 text-[11px] uppercase tracking-wider text-white placeholder-neutral-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1F1F1F] hover:bg-[#BE9E5E] text-neutral-300 hover:text-[#0A0A0A] text-[10px] font-heading font-bold uppercase tracking-wider transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[10px] text-emerald-400 mt-1 font-mono tracking-wider">
                      ✓ {promoSuccess}
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[10px] text-red-400 mt-1 font-mono tracking-wider">
                      ✕ {promoError}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Checkout CTA */}
          {cartItems.length > 0 && !isCheckingOut && !checkoutComplete && (
            <div className="p-6 bg-[#111111] border-t border-[#1F1F1F] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-neutral-200">
                    R {subtotal.toLocaleString('en-ZA')}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono">- R {discountAmount.toLocaleString('en-ZA')}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-400">
                  <span>Estimated South Africa Shipping</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? (
                      <span className="text-[#BE9E5E] font-bold">COMPLIMENTARY</span>
                    ) : (
                      `R ${shippingCost}`
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm font-heading font-extrabold text-white pt-2 border-t border-[#222222]">
                  <span>ESTIMATED TOTAL</span>
                  <span className="text-[#BE9E5E] text-base font-mono">
                    R {total.toLocaleString('en-ZA')}
                  </span>
                </div>
              </div>

              <button
                id="checkout-btn"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 bg-[#BE9E5E] hover:bg-[#D4B97B] text-[#0A0A0A] font-heading font-extrabold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-neutral-500 text-center tracking-wider">
                Taxes included. Hand-inspected before dispatch from Johannesburg.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
