
import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import ProductDetailView from "@/components/ProductDetailView";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProductSelection } from "@/hooks/useProductSelection";
import { useProductManagement } from "@/hooks/useProductManagement";

const Index = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const {
    updateSelection,
    updateQuantity,
    getSelection,
    getSelectedProducts,
    getTotalYards
  } = useProductSelection();

  const { products } = useProductManagement();

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-inter">
      <Header />
      <HeroCarousel />
      
      <div className="pb-32">
        {products.map((product) => {
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
        })}
      </div>

      <WhatsAppButton 
        selectedProducts={selectedProducts}
        totalYards={totalYards}
      />
    </div>
  );
};

export default Index;
