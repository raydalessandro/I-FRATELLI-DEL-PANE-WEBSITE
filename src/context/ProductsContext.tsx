import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { Product, ProductCategory } from '../types';
import { generateProductId, createProductSlug } from '../data/products';
import { useProductsContent } from '../hooks/useContent';

// ============================================
// TYPES
// ============================================

interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

type ProductsAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_TO_INITIAL' };

interface ProductsContextType extends ProductsState {
  // Actions
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetToInitial: () => void;
  
  // Getters
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: ProductCategory) => Product[];
  getFeaturedProducts: () => Product[];
  getAvailableProducts: () => Product[];
}

// ============================================
// CONSTANTS
// ============================================

const STORAGE_KEY = 'i3fratelli_products';
const STORAGE_VERSION = '1.0';

// ============================================
// INITIAL STATE
// ============================================

const initialState: ProductsState = {
  products: [],
  isLoading: true,
  error: null,
  lastUpdated: null,
};

// ============================================
// REDUCER
// ============================================

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        lastUpdated: new Date().toISOString(),
      };
      
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload],
        lastUpdated: new Date().toISOString(),
      };
      
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
        lastUpdated: new Date().toISOString(),
      };
      
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
      
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
      
    case 'RESET_TO_INITIAL':
      // This is now handled in the resetToInitial callback
      return state;
      
    default:
      return state;
  }
}

// ============================================
// CONTEXT
// ============================================

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

interface ProductsProviderProps {
  children: React.ReactNode;
}

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const { data: productsData, loading: productsLoading, error: productsError } = useProductsContent();

  // Load products from localStorage or JSON on mount
  useEffect(() => {
    if (productsLoading) return;

    if (productsError) {
      console.error('Error loading products from JSON:', productsError);
      dispatch({ type: 'SET_ERROR', payload: 'Errore nel caricamento dei prodotti' });
      return;
    }

    if (!productsData) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        // Check version compatibility
        if (parsed.version === STORAGE_VERSION && Array.isArray(parsed.products)) {
          dispatch({ type: 'SET_PRODUCTS', payload: parsed.products });
        } else {
          // Version mismatch, use products from JSON
          dispatch({ type: 'SET_PRODUCTS', payload: productsData.products });
        }
      } else {
        // No stored data, use products from JSON
        dispatch({ type: 'SET_PRODUCTS', payload: productsData.products });
      }
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Errore nel caricamento dei prodotti' });
      dispatch({ type: 'SET_PRODUCTS', payload: productsData.products });
    }
  }, [productsData, productsLoading, productsError]);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!state.isLoading && state.products.length > 0) {
      try {
        const data = {
          version: STORAGE_VERSION,
          products: state.products,
          lastUpdated: state.lastUpdated,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving products to localStorage:', error);
      }
    }
  }, [state.products, state.isLoading, state.lastUpdated]);

  // Actions
  const addProduct = useCallback((productData: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...productData,
      id: generateProductId(),
      slug: createProductSlug(productData.name),
      createdAt: now,
      updatedAt: now,
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  }, []);

  const updateProduct = useCallback((product: Product) => {
    const updatedProduct = {
      ...product,
      slug: createProductSlug(product.name),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  }, []);

  const resetToInitial = useCallback(() => {
    if (productsData?.products) {
      dispatch({ type: 'SET_PRODUCTS', payload: productsData.products });
    }
  }, [productsData]);

  // Getters
  const getProductById = useCallback((id: string) => {
    return state.products.find(p => p.id === id);
  }, [state.products]);

  const getProductBySlug = useCallback((slug: string) => {
    return state.products.find(p => p.slug === slug);
  }, [state.products]);

  const getProductsByCategory = useCallback((category: ProductCategory) => {
    return state.products.filter(p => p.category === category && p.available);
  }, [state.products]);

  const getFeaturedProducts = useCallback(() => {
    return state.products.filter(p => p.featured && p.available);
  }, [state.products]);

  const getAvailableProducts = useCallback(() => {
    return state.products.filter(p => p.available);
  }, [state.products]);

  const value: ProductsContextType = {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToInitial,
    getProductById,
    getProductBySlug,
    getProductsByCategory,
    getFeaturedProducts,
    getAvailableProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================

export function useProducts() {
  const context = useContext(ProductsContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  
  return context;
}

export default ProductsContext;
