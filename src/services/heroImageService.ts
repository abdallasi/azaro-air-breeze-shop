
import { supabase } from "@/integrations/supabase/client";
import { HeroImage } from "@/types/product";

export const heroImageService = {
  async getAll(): Promise<HeroImage[]> {
    const { data, error } = await supabase
      .from('hero_images')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Hero images error:', error);
      throw error;
    }

    return data?.map(h => ({
      id: h.id,
      src: h.src,
      alt: h.alt,
      createdAt: h.created_at,
      updatedAt: h.updated_at
    })) || [];
  },

  async update(id: number, data: HeroImage): Promise<void> {
    console.log('Updating hero image:', id, data);
    
    const { error } = await supabase
      .from('hero_images')
      .update({
        src: data.src,
        alt: data.alt,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  },

  async delete(id: number): Promise<void> {
    console.log('Deleting hero image:', id);
    
    const { error } = await supabase
      .from('hero_images')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async create(data: HeroImage): Promise<HeroImage> {
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

    return {
      id: insertedData.id,
      src: insertedData.src,
      alt: insertedData.alt,
      createdAt: insertedData.created_at,
      updatedAt: insertedData.updated_at
    };
  }
};
