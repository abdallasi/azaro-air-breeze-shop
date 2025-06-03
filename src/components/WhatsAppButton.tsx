
interface WhatsAppButtonProps {
  selectedProducts: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  totalYards: number;
}

const WhatsAppButton = ({ selectedProducts, totalYards }: WhatsAppButtonProps) => {
  const handleWhatsAppOrder = () => {
    if (selectedProducts.length === 0) return;

    let message = "Hello Azaro, I'd like to order:\n";
    
    selectedProducts.forEach(product => {
      message += `- ${product.name}: ${product.quantity} ${product.quantity === 1 ? 'yard' : 'yards'}\n`;
    });
    
    message += `Total: ${totalYards} ${totalYards === 1 ? 'yard' : 'yards'}\n`;
    message += "Please confirm availability.";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/2348064327408?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      <button
        onClick={handleWhatsAppOrder}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-inter font-semibold py-4 px-6 rounded-2xl shadow-2xl transition-colors backdrop-blur-sm"
      >
        Order {selectedProducts.length} {selectedProducts.length === 1 ? 'Fabric' : 'Fabrics'} · {totalYards} {totalYards === 1 ? 'Yard' : 'Yards'} – Send via WhatsApp
      </button>
    </div>
  );
};

export default WhatsAppButton;
