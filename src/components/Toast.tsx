import React from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onClose: () => void;
  onAction?: () => void;
  actionText?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  subMessage,
  isVisible,
  onClose,
  onAction,
  actionText = 'VIEW BAG',
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#141414] border border-[#BE9E5E] shadow-2xl p-4 flex items-center justify-between gap-4 animate-slideUp">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#BE9E5E] text-[#0A0A0A] flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <div>
          <h4 className="text-xs font-heading font-extrabold uppercase tracking-wider text-white">
            {message}
          </h4>
          {subMessage && (
            <p className="text-[11px] text-neutral-400 font-mono mt-0.5">{subMessage}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onAction && (
          <button
            onClick={onAction}
            className="px-3 py-1.5 bg-[#BE9E5E] text-[#0A0A0A] text-[10px] font-heading font-bold uppercase tracking-widest hover:bg-[#D4B97B] transition-colors whitespace-nowrap"
          >
            {actionText}
          </button>
        )}
        <button
          onClick={onClose}
          className="p-1 text-neutral-500 hover:text-white transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
