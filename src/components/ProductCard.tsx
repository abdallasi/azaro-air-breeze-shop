
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

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
  onProductClick: (productId: string) => void;
}

const ProductCard = ({ 
  product, 
  isSelected, 
  quantity, 
  onSelectionChange, 
  onQuantityChange,
  onProductClick 
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    onQuantityChange(product.id, newQuantity);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    // Don't trigger product click if clicking on controls
    if ((e.target as HTMLElement).closest('.product-controls')) {
      return;
    }
    onProductClick(product.id);
  };

  return (
    <div className="w-full px-4 mb-3">
      <div 
        className="relative rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer"
        onClick={handleProductClick}
      >
        <div className="aspect-[4/5] relative">
          {!imageLoaded && (
            <Skeleton className="w-full h-full absolute inset-0" />
          )}
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Top-left checkbox */}
          <div className="absolute top-3 left-3 product-controls">
            <div className="flex flex-col items-center">
              <Checkbox
                checked={isSelected}
                onCheckedChange={(checked) => onSelectionChange(product.id, checked as boolean)}
                className="h-5 w-5 rounded-full bg-white/90 backdrop-blur-sm border border-white/60 data-[state=checked]:bg-black data-[state=checked]:border-black mb-1"
              />
              <span className="text-xs font-medium text-white/90 bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                Select
              </span>
            </div>
          </div>

          {/* Floating glass container */}
          <div className="absolute bottom-4 left-4 right-4 product-controls">
            <div className="bg-white/85 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-black mb-0.5 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-black">
                    ₦{(product.price * quantity).toLocaleString()}
                  </p>
                </div>
                
                {/* Quantity controls */}
                <div className="flex items-center bg-black/5 rounded-xl px-1 py-1 ml-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(-1);
                    }}
                    className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3 h-3 text-black" />
                  </button>
                  <span className="w-10 text-center font-semibold text-black text-sm">
                    {quantity}y
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(1);
                    }}
                    className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  >
                    <Plus className="w-3 h-3 text-black" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
