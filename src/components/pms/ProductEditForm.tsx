
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, image: url });
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
        <Label htmlFor="image">Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="mt-2 w-20 h-20 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-black hover:bg-gray-800">
          Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductEditForm;
