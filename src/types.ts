export type CategoryType = 'all' | 'new-drop' | 'hoodies' | 't-shirts' | 'jorts' | 'boxy-tees' | 'tracksuits' | 'accessories';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'new-drop' | 'hoodies' | 't-shirts' | 'jorts' | 'boxy-tees' | 'tracksuits' | 'accessories';
  categoryLabel: string;
  priceZAR: number;
  originalPriceZAR?: number;
  image: string;
  hoverImage: string;
  collection: string;
  badge?: string;
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  sizes: string[];
  inStock: boolean;
  scripture?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}
