
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Products error:', error);
      throw error;
    }

    return data?.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    })) || [];
  },

  async update(id: string, data: Omit<Product, 'id'>): Promise<void> {
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
  },

  async delete(id: string): Promise<void> {
    console.log('Deleting product:', id);
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async create(data: Omit<Product, 'id'>): Promise<Product> {
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

    return {
      ...data,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};
