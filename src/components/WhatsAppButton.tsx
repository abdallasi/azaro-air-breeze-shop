
import { useState } from "react";

interface WhatsAppButtonProps {
  selectedProducts: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  totalYards: number;
}

const WhatsAppButton = ({ selectedProducts, totalYards }: WhatsAppButtonProps) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [showContainer, setShowContainer] = useState(false);

  // Calculate total price - ₦3,500 per yard
  const totalAmount = totalYards * 3500;

  const handleWhatsAppOrder = () => {
    if (!showContainer) {
      setShowContainer(true);
      setShowAddressInput(true);
      return;
    }

    if (!deliveryAddress.trim()) {
      return;
    }

    // Apple-style message format
    let message = "🎯 New Order Request\n\n";
    message += "📦 ITEMS:\n";
    
    selectedProducts.forEach((product, index) => {
      message += `${index + 1}. ${product.name}\n   ${product.quantity} ${product.quantity === 1 ? 'yard' : 'yards'}\n\n`;
    });
    
    message += `📏 TOTAL: ${totalYards} ${totalYards === 1 ? 'yard' : 'yards'}\n`;
    message += `💰 AMOUNT: ₦${totalAmount.toLocaleString()}\n\n`;
    message += `📍 DELIVERY ADDRESS:\n${deliveryAddress}\n\n`;
    message += "Please confirm availability and delivery details. Thank you! 🙏";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2347018921717?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      <div className={`transition-all duration-300 ease-out ${
        showContainer 
          ? 'backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-4 shadow-2xl opacity-100' 
          : 'p-0 opacity-100'
      }`}>
        {showAddressInput && showContainer && (
          <textarea
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter your delivery address..."
            className="w-full px-4 py-3 mb-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50 animate-fade-in resize-none"
            rows={3}
            autoFocus
          />
        )}
        
        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-black/90 hover:bg-black backdrop-blur-sm text-white font-medium py-4 px-6 rounded-2xl transition-all duration-200 text-base border border-white/10"
        >
          <div className="flex items-center justify-center gap-2">
            <span>Order via WhatsApp</span>
          </div>
          <div className="text-sm opacity-80 mt-1">
            ₦{totalAmount.toLocaleString()} • {totalYards} {totalYards === 1 ? 'yard' : 'yards'}
          </div>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppButton;
