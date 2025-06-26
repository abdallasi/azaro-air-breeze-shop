
import { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import ProductDetailView from "@/components/ProductDetailView";
import PaystackButton from "@/components/PaystackButton";
import { useProductSelection } from "@/hooks/useProductSelection";
import { useProductManagement } from "@/hooks/useProductManagement";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const {
    updateSelection,
    updateQuantity,
    getSelection,
    getSelectedProducts,
    getTotalYards
  } = useProductSelection();

  const { products, isLoading, error } = useProductManagement();

  // Memoize expensive calculations
  const selectedProducts = useMemo(() => getSelectedProducts(products), [products, getSelectedProducts]);
  const totalYards = useMemo(() => getTotalYards(products), [products, getTotalYards]);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId), 
    [products, selectedProductId]
  );

  if (selectedProduct) {
    return (
      <ProductDetailView 
        product={selectedProduct} 
        onBack={handleBackToList} 
      />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-inter flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-inter">
      <Header />
      <HeroCarousel />
      
      <div className="pb-32">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full px-4 mb-3">
                <Skeleton className="w-full aspect-[4/5] rounded-2xl" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-gray-600">No products available</p>
          </div>
        ) : (
          products.map((product) => {
            const selection = getSelection(product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                isSelected={selection.selected}
                quantity={selection.quantity}
                onSelectionChange={updateSelection}
                onQuantityChange={updateQuantity}
                onProductClick={handleProductClick}
              />
            );
          })
        )}
      </div>

      <PaystackButton 
        selectedProducts={selectedProducts}
        totalYards={totalYards}
      />
    </div>
  );
};

export default Index;
