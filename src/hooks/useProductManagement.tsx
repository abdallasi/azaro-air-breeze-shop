
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface HeroImage {
  src: string;
  alt: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductManagementContextType {
  products: Product[];
  heroImages: HeroImage[];
  updateProduct: (id: string, data: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  addProduct: (data: Omit<Product, 'id'>) => void;
  updateHeroImage: (index: number, data: HeroImage) => void;
  deleteHeroImage: (index: number) => void;
  addHeroImage: (data: HeroImage) => void;
}

const ProductManagementContext = createContext<ProductManagementContextType | undefined>(undefined);

// Default data - only used if localStorage is empty
const defaultProducts: Product[] = [
  {
    id: "azaro-air-001",
    name: "Azaro Air 001",
    price: 3500,
    image: "/lovable-uploads/de5437e6-e7e7-49a0-b111-fb38c85517c0.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "azaro-air-002",
    name: "Azaro Air 002",
    price: 3500,
    image: "/lovable-uploads/750e7d97-f592-4785-8f0f-740ecf93f04e.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "azaro-air-003",
    name: "Azaro Air 003",
    price: 3500,
    image: "/lovable-uploads/2b18bf3b-98f4-4136-bcaa-c3fd11903f89.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "azaro-air-004",
    name: "Azaro Air 004",
    price: 3500,
    image: "/lovable-uploads/5d68c649-9f9d-43bc-b368-f1ed2d4f6c81.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const defaultHeroImages: HeroImage[] = [
  {
    src: "/lovable-uploads/de5437e6-e7e7-49a0-b111-fb38c85517c0.png",
    alt: "Azaro Air fabric in motion",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    src: "/lovable-uploads/750e7d97-f592-4785-8f0f-740ecf93f04e.png",
    alt: "Azaro Air floating in nature",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    src: "/lovable-uploads/2b18bf3b-98f4-4136-bcaa-c3fd11903f89.png",
    alt: "Azaro Air against coastal backdrop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    src: "/lovable-uploads/5d68c649-9f9d-43bc-b368-f1ed2d4f6c81.png",
    alt: "Azaro Air against blue sky",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Storage keys
const PRODUCTS_STORAGE_KEY = 'azaro_products';
const HERO_IMAGES_STORAGE_KEY = 'azaro_hero_images';

// Helper functions for localStorage
const loadFromStorage = <T,>(key: string, defaultData: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
  }
  return defaultData;
};

const saveToStorage = <T,>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Saved ${key} to localStorage:`, data);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const ProductManagementProvider = ({ children }: { children: ReactNode }) => {
  // Load initial data from localStorage or use defaults
  const [products, setProducts] = useState<Product[]>(() => 
    loadFromStorage(PRODUCTS_STORAGE_KEY, defaultProducts)
  );
  
  const [heroImages, setHeroImages] = useState<HeroImage[]>(() => 
    loadFromStorage(HERO_IMAGES_STORAGE_KEY, defaultHeroImages)
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(PRODUCTS_STORAGE_KEY, products);
  }, [products]);

  useEffect(() => {
    saveToStorage(HERO_IMAGES_STORAGE_KEY, heroImages);
  }, [heroImages]);

  // Product management functions
  const updateProduct = (id: string, data: Omit<Product, 'id'>) => {
    console.log('Updating product:', id, data);
    setProducts(prev => prev.map(p => 
      p.id === id 
        ? { ...p, ...data, updatedAt: new Date().toISOString() } 
        : p
    ));
  };

  const deleteProduct = (id: string) => {
    console.log('Deleting product:', id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addProduct = (data: Omit<Product, 'id'>) => {
    const timestamp = new Date().toISOString();
    const newProduct = {
      ...data,
      id: `azaro-air-${Date.now()}`,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    console.log('Adding new product:', newProduct);
    setProducts(prev => [...prev, newProduct]);
  };

  // Hero image management functions
  const updateHeroImage = (index: number, data: HeroImage) => {
    console.log('Updating hero image at index:', index, data);
    setHeroImages(prev => prev.map((hero, i) => 
      i === index 
        ? { ...data, updatedAt: new Date().toISOString() } 
        : hero
    ));
  };

  const deleteHeroImage = (index: number) => {
    console.log('Deleting hero image at index:', index);
    setHeroImages(prev => prev.filter((_, i) => i !== index));
  };

  const addHeroImage = (data: HeroImage) => {
    const timestamp = new Date().toISOString();
    const newHeroImage = {
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    console.log('Adding new hero image:', newHeroImage);
    setHeroImages(prev => [...prev, newHeroImage]);
  };

  const value = {
    products,
    heroImages,
    updateProduct,
    deleteProduct,
    addProduct,
    updateHeroImage,
    deleteHeroImage,
    addHeroImage
  };

  return (
    <ProductManagementContext.Provider value={value}>
      {children}
    </ProductManagementContext.Provider>
  );
};

export const useProductManagement = () => {
  const context = useContext(ProductManagementContext);
  if (!context) {
    throw new Error("useProductManagement must be used within ProductManagementProvider");
  }
  return context;
};
