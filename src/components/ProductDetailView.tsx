
import { ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailView = ({ product, onBack }: ProductDetailViewProps) => {
  const defaultDescription = "Fabric designed for heat. For the hustle. For the street. For home. Cooked in Kano, adopted worldwide";
  const description = product.description || defaultDescription;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white border-b border-gray-100">
        <button 
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors mr-3"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <h1 className="text-lg font-semibold text-black">Product Details</h1>
      </div>

      {/* Product Image */}
      <div className="aspect-square relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="px-6 py-6">
        <h2 className="text-2xl font-bold text-black mb-2">
          {product.name}
        </h2>
        <p className="text-3xl font-bold text-black mb-4">
          ₦{product.price.toLocaleString()}/yard
        </p>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-black mb-2">Features</h3>
            <ul className="text-gray-600 space-y-1">
              <li>• Breathable and lightweight</li>
              <li>• Heat-resistant design</li>
              <li>• Premium quality fabric</li>
              <li>• Perfect for tropical climates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
