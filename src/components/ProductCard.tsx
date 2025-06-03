
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  quantity: number;
  onSelectionChange: (productId: string, selected: boolean) => void;
  onQuantityChange: (productId: string, quantity: number) => void;
}

const ProductCard = ({ 
  product, 
  isSelected, 
  quantity, 
  onSelectionChange, 
  onQuantityChange 
}: ProductCardProps) => {
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    onQuantityChange(product.id, newQuantity);
  };

  return (
    <div className="w-full p-4">
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white">
        <div className="aspect-[4/5] relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Top-left checkbox */}
          <div className="absolute top-4 left-4">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelectionChange(product.id, checked as boolean)}
              className="h-6 w-6 rounded-full bg-white/80 backdrop-blur-sm border-2 border-white/60 data-[state=checked]:bg-black data-[state=checked]:border-black"
            />
          </div>

          {/* Glass overlay with product info */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-6 rounded-t-3xl border-t border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-inter font-semibold text-black mb-1">
                  {product.name}
                </h3>
                <p className="text-2xl font-inter font-bold text-black">
                  ₦{(product.price * quantity).toLocaleString()} 
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    ({quantity} {quantity === 1 ? 'yard' : 'yards'})
                  </span>
                </p>
              </div>
              
              {/* Quantity controls */}
              <div className="flex items-center bg-black/10 rounded-2xl p-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4 text-black" />
                </button>
                <span className="w-12 text-center font-inter font-semibold text-black">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 transition-colors"
                >
                  <Plus className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
