
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
      id: "air-white-001",
      name: "Azaro Air — White 001",
      price: 3500,
      image: "/lovable-uploads/de1ebf44-36a6-48fa-a988-0f52b68dcfad.png"
    },
    {
      id: "air-earth-002",
      name: "Azaro Air — Earth 002",
      price: 3500,
      image: "/lovable-uploads/9293ccbd-77fa-4c57-bad6-f0a1f8a8b52a.png"
    },
    {
      id: "air-cream-003",
      name: "Azaro Air — Cream 003",
      price: 3500,
      image: "/lovable-uploads/82dee669-cf77-4ee2-a9ef-180e1b04c448.png"
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
