
import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import ProductDetailView from "@/components/ProductDetailView";
import WhatsAppButton from "@/components/WhatsAppButton";
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

  const selectedProducts = getSelectedProducts(products);
  const totalYards = getTotalYards(products);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleBackToList = () => {
    setSelectedProductId(null);
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

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

      <WhatsAppButton 
        selectedProducts={selectedProducts}
        totalYards={totalYards}
      />
    </div>
  );
};

export default Index;
