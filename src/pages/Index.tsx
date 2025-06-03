
import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import ProductDetailView from "@/components/ProductDetailView";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProductSelection } from "@/hooks/useProductSelection";

const Index = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  const {
    updateSelection,
    updateQuantity,
    getSelection,
    getSelectedProducts,
    getTotalYards
  } = useProductSelection();

  const products = [
    {
      id: "azaro-air-001",
      name: "Azaro Air 001",
      price: 3500,
      image: "/lovable-uploads/de5437e6-e7e7-49a0-b111-fb38c85517c0.png"
    },
    {
      id: "azaro-air-002",
      name: "Azaro Air 002",
      price: 3500,
      image: "/lovable-uploads/750e7d97-f592-4785-8f0f-740ecf93f04e.png"
    },
    {
      id: "azaro-air-003",
      name: "Azaro Air 003",
      price: 3500,
      image: "/lovable-uploads/2b18bf3b-98f4-4136-bcaa-c3fd11903f89.png"
    },
    {
      id: "azaro-air-004",
      name: "Azaro Air 004",
      price: 3500,
      image: "/lovable-uploads/5d68c649-9f9d-43bc-b368-f1ed2d4f6c81.png"
    }
  ];

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
