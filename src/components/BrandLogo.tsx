import React from 'react';

interface BrandLogoProps {
  /** Size preset: xs (modals/drawers), sm (navbar/footer), md (hero/banners), lg (manifesto), xl */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Orientation layout: stacked (official logo badge with crown on top) or horizontal (for compact bars) */
  layout?: 'stacked' | 'horizontal';
  /** Color theme: dark (default) or light */
  theme?: 'dark' | 'light';
  /** Whether to show the "I CHOSE CHRIST" subtext */
  showTagline?: boolean;
  /** Whether to show the crown of thorns */
  showCrown?: boolean;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional custom style for the inner image */
  imgStyle?: React.CSSProperties;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Official BrandLogo component rendering the white logo asset
 * ensuring matching size proportions across the site.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  layout = 'stacked',
  theme = 'dark',
  className = '',
  imgStyle,
  onClick,
}) => {
  const sizeClass = {
    xs: 'h-7 sm:h-8',
    sm: 'h-10 sm:h-12',
    md: 'h-10 sm:h-12',
    lg: 'h-28 sm:h-32',
    xl: 'h-36 sm:h-44',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      <img
        src="/white%20l0g0.png"
        alt="GODLIKE wear. - I CHOSE CHRIST"
        style={imgStyle}
        className={`${sizeClass} w-auto object-contain transition-transform duration-300 drop-shadow-md ${
          onClick ? 'group-hover:scale-105' : ''
        }`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
