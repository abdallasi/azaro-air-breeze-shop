
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, HeroImage } from "@/types/product";
import { productService } from "@/services/productService";
import { heroImageService } from "@/services/heroImageService";

interface ProductManagementContextType {
  products: Product[];
  heroImages: HeroImage[];
  updateProduct: (id: string, data: Omit<Product, 'id'>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addProduct: (data: Omit<Product, 'id'>) => Promise<void>;
  updateHeroImage: (index: number, data: HeroImage) => Promise<void>;
  deleteHeroImage: (index: number) => Promise<void>;
  addHeroImage: (data: HeroImage) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ProductManagementContext = createContext<ProductManagementContextType | undefined>(undefined);

export const ProductManagementProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Loading data from Supabase...');

      const [transformedProducts, transformedHeroImages] = await Promise.all([
        productService.getAll(),
        heroImageService.getAll()
      ]);

      console.log('Transformed products:', transformedProducts);
      console.log('Transformed hero images:', transformedHeroImages);

      // Debug image accessibility
      transformedProducts.forEach((product, index) => {
        console.log(`Product ${index + 1} (${product.name}):`, product.image);
      });

      transformedHeroImages.forEach((hero, index) => {
        console.log(`Hero image ${index + 1} (${hero.alt}):`, hero.src);
      });

      setProducts(transformedProducts);
      setHeroImages(transformedHeroImages);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    console.log('Refetching data...');
    await loadData();
  };

  const updateProduct = async (id: string, data: Omit<Product, 'id'>) => {
    try {
      await productService.update(id, data);
      setProducts(prev => prev.map(p => 
        p.id === id 
          ? { ...p, ...data, updatedAt: new Date().toISOString() } 
          : p
      ));
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productService.delete(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const addProduct = async (data: Omit<Product, 'id'>) => {
    try {
      const newProduct = await productService.create(data);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const updateHeroImage = async (index: number, data: HeroImage) => {
    try {
      const heroImage = heroImages[index];
      if (!heroImage?.id) return;

      await heroImageService.update(heroImage.id, data);
      setHeroImages(prev => prev.map((hero, i) => 
        i === index 
          ? { ...data, id: hero.id, updatedAt: new Date().toISOString() } 
          : hero
      ));
    } catch (err) {
      console.error('Error updating hero image:', err);
      setError(err instanceof Error ? err.message : 'Failed to update hero image');
    }
  };

  const deleteHeroImage = async (index: number) => {
    try {
      const heroImage = heroImages[index];
      if (!heroImage?.id) return;

      await heroImageService.delete(heroImage.id);
      setHeroImages(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Error deleting hero image:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete hero image');
    }
  };

  const addHeroImage = async (data: HeroImage) => {
    try {
      const newHeroImage = await heroImageService.create(data);
      setHeroImages(prev => [...prev, newHeroImage]);
    } catch (err) {
      console.error('Error adding hero image:', err);
      setError(err instanceof Error ? err.message : 'Failed to add hero image');
    }
  };

  const value = {
    products,
    heroImages,
    updateProduct,
    deleteProduct,
    addProduct,
    updateHeroImage,
    deleteHeroImage,
    addHeroImage,
    isLoading,
    error,
    refetch
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
