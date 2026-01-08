// ============================================
// TYPES - Il Pane dei Fratelli
// ============================================

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  price: number | null;
  priceNote?: string;
  unit: string;
  minOrder?: number;
  image: string;
  images?: string[];
  available: boolean;
  featured: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'pani-classici'
  | 'pani-speciali'
  | 'formati-ristorazione'
  | 'su-richiesta';

export interface ProductCategoryInfo {
  id: ProductCategory;
  name: string;
  description: string;
  icon: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  businessType?: BusinessType;
  message: string;
  privacy: boolean;
}

export type BusinessType = 
  | 'ristorante'
  | 'bar'
  | 'hotel'
  | 'mensa'
  | 'catering'
  | 'altro';

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  children?: NavItem[];
}

// SEO Types
export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
}

// Admin Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface DashboardStats {
  totalProducts: number;
  featuredProducts: number;
  categoriesCount: number;
  lastUpdated: string;
}

// Form State Types
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Toast Types
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Table Types
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

// Utility Types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
