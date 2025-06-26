
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

interface HeroImage {
  id?: number;
  src: string;
  alt: string;
  createdAt?: string;
  updatedAt?: string;
}

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

  // Load initial data from Supabase
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Loading data from Supabase...');

      // Load products and hero images in parallel for better performance
      const [productsResponse, heroImagesResponse] = await Promise.all([
        supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true }),
        supabase
          .from('hero_images')
          .select('*')
          .order('created_at', { ascending: true })
      ]);

      if (productsResponse.error) {
        console.error('Products error:', productsResponse.error);
        throw productsResponse.error;
      }
      if (heroImagesResponse.error) {
        console.error('Hero images error:', heroImagesResponse.error);
        throw heroImagesResponse.error;
      }

      console.log('Raw products data:', productsResponse.data);
      console.log('Raw hero images data:', heroImagesResponse.data);

      // Transform data to match our interface
      const transformedProducts = productsResponse.data?.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        createdAt: p.created_at,
        updatedAt: p.updated_at
      })) || [];

      const transformedHeroImages = heroImagesResponse.data?.map(h => ({
        id: h.id,
        src: h.src,
        alt: h.alt,
        createdAt: h.created_at,
        updatedAt: h.updated_at
      })) || [];

      console.log('Transformed products:', transformedProducts);
      console.log('Transformed hero images:', transformedHeroImages);

      // Check if images are accessible
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

  // Add refetch function for manual data refresh
  const refetch = async () => {
    console.log('Refetching data...');
    await loadData();
  };

  // Product management functions
  const updateProduct = async (id: string, data: Omit<Product, 'id'>) => {
    try {
      console.log('Updating product:', id, data);
      
      const { error } = await supabase
        .from('products')
        .update({
          name: data.name,
          price: data.price,
          image: data.image,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      // Update local state
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
      console.log('Deleting product:', id);
      
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const addProduct = async (data: Omit<Product, 'id'>) => {
    try {
      const newId = `azaro-air-${Date.now()}`;
      console.log('Adding new product:', newId, data);
      
      const { error } = await supabase
        .from('products')
        .insert({
          id: newId,
          name: data.name,
          price: data.price,
          image: data.image
        });

      if (error) throw error;

      // Update local state
      const newProduct = {
        ...data,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  // Hero image management functions
  const updateHeroImage = async (index: number, data: HeroImage) => {
    try {
      const heroImage = heroImages[index];
      if (!heroImage?.id) return;

      console.log('Updating hero image at index:', index, data);
      
      const { error } = await supabase
        .from('hero_images')
        .update({
          src: data.src,
          alt: data.alt,
          updated_at: new Date().toISOString()
        })
        .eq('id', heroImage.id);

      if (error) throw error;

      // Update local state
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

      console.log('Deleting hero image at index:', index);
      
      const { error } = await supabase
        .from('hero_images')
        .delete()
        .eq('id', heroImage.id);

      if (error) throw error;

      // Update local state
      setHeroImages(prev => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('Error deleting hero image:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete hero image');
    }
  };

  const addHeroImage = async (data: HeroImage) => {
    try {
      console.log('Adding new hero image:', data);
      
      const { data: insertedData, error } = await supabase
        .from('hero_images')
        .insert({
          src: data.src,
          alt: data.alt
        })
        .select()
        .single();

      if (error) throw error;

      // Update local state
      const newHeroImage = {
        id: insertedData.id,
        src: insertedData.src,
        alt: insertedData.alt,
        createdAt: insertedData.created_at,
        updatedAt: insertedData.updated_at
      };
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
