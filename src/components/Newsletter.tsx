import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FAITH10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="newsletter-section" className="w-full bg-[#0D0D0D] py-20 lg:py-24 border-b border-[#1A1A1A] relative overflow-hidden">
      {/* Subtle gold accent circle */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-[#BE9E5E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <BrandLogo size="sm" layout="stacked" theme="dark" showCrown={true} showTagline={true} />
        </div>

        <div className="inline-flex items-center px-3.5 py-1 bg-[#1A1A1A] border border-[#BE9E5E]/40 mb-4">
          <span className="text-[10px] font-heading font-extrabold uppercase tracking-[0.25em] text-[#BE9E5E]">
            EXCLUSIVE ACCESS
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight mb-4">
          JOIN THE GODLIKE COMMUNITY
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed mb-8">
          Sign up to unlock priority access to limited private drops, seasonal releases, weekly Sunday devotionals, and 10% off your inaugural order.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#141414] p-1.5 border border-[#262626] focus-within:border-[#BE9E5E] transition-all">
              <div className="flex items-center pl-3 text-neutral-500">
                <Mail className="w-4 h-4 text-[#BE9E5E]" />
              </div>
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full bg-transparent px-3 py-3 text-xs uppercase tracking-wider text-white placeholder-neutral-500 focus:outline-none"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="px-6 py-3 bg-[#BE9E5E] hover:bg-[#D4B97B] text-[#0A0A0A] font-heading font-extrabold text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors"
              >
                JOIN NOW
              </button>
            </div>
            <p className="text-[10px] text-neutral-500 mt-3 tracking-wider">
              By subscribing you agree to receive email marketing and our privacy policy. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-6 bg-[#141414] border border-[#BE9E5E] space-y-3 animate-fadeIn">
            <div className="w-10 h-10 mx-auto rounded-full bg-[#BE9E5E] text-[#0A0A0A] flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-heading font-bold uppercase tracking-widest text-white">
              WELCOME TO THE BROTHERHOOD
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Your 10% discount voucher for your first collection order is active:
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="font-mono text-base font-extrabold text-[#BE9E5E] bg-[#0A0A0A] px-4 py-2 border border-neutral-700 tracking-widest">
                FAITH10
              </span>
              <button
                onClick={handleCopyCode}
                className="p-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-neutral-300 border border-neutral-700 transition-colors"
                title="Copy promo code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-[10px] text-emerald-400 tracking-wider">CODE COPIED TO CLIPBOARD</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
