
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageUploadService } from "@/services/imageUploadService";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductEditFormProps {
  product?: Product;
  onSave: (data: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

const ProductEditForm = ({ product, onSave, onCancel }: ProductEditFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 3500,
    image: product?.image || ""
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving product with data:', formData);
    onSave(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        console.log('Starting image upload for product...');
        const imageUrl = await imageUploadService.uploadImage(file, 'product-images');
        console.log('Product image uploaded successfully:', imageUrl);
        setFormData({ ...formData, image: imageUrl });
      } catch (error) {
        console.error('Failed to upload product image:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="price">Price (₦)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          required
        />
      </div>

      <div>
        <Label htmlFor="product-image">Product Image</Label>
        <Input
          id="product-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={isUploading}
        />
        {isUploading && (
          <p className="text-sm text-gray-600 mt-1">Uploading image...</p>
        )}
        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-1">Product Preview:</p>
            <img
              src={formData.image}
              alt="Product Preview"
              className="w-20 h-20 object-cover rounded-lg border-2 border-blue-200"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-black hover:bg-gray-800" disabled={isUploading}>
          Save Product
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductEditForm;
