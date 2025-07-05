-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('hero-images', 'hero-images', true);

-- Create policies for public access to storage objects
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING (true);