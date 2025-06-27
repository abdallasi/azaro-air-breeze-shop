
import { useState } from "react";

interface PaystackButtonProps {
  selectedProducts: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  totalYards: number;
}

const PaystackButton = ({ selectedProducts, totalYards }: PaystackButtonProps) => {
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showContainer, setShowContainer] = useState(false);

  // Calculate total price - ₦3,500 per yard
  const totalAmount = totalYards * 3500;

  const handlePayment = () => {
    if (!showContainer) {
      setShowContainer(true);
      return;
    }

    if (!email.trim()) {
      setShowEmailInput(true);
      return;
    }

    setIsProcessing(true);

    // Load Paystack script dynamically
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.onload = () => {
      const handler = (window as any).PaystackPop.setup({
        key: 'pk_test_d7ccc7862763f7441ead1dfa8592a38313eecdd0',
        email: email,
        amount: totalAmount * 100, // Convert to kobo
        currency: 'NGN',
        ref: `azaro_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        metadata: {
          products: selectedProducts,
          totalYards: totalYards
        },
        callback: function(response: any) {
          console.log('Payment successful:', response);
          // Show success screen
          window.location.href = `/payment-success?ref=${response.reference}`;
        },
        onClose: function() {
          setIsProcessing(false);
          console.log('Payment window closed');
        }
      });
      handler.openIframe();
    };
    document.head.appendChild(script);
  };

  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50">
      {/* Frosted glass container - hidden initially, revealed on click */}
      <div 
        className={`backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-4 shadow-2xl transition-all duration-500 ease-out ${
          showContainer 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        {showEmailInput && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 mb-4 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50 transition-all duration-200"
            autoFocus
          />
        )}
      </div>

      {/* Main button - always visible */}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={`w-full bg-black hover:bg-gray-900 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
          showContainer ? 'mt-0' : ''
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2">
              <span>Get it now</span>
            </div>
            <div className="text-sm opacity-80 mt-1">
              ₦{totalAmount.toLocaleString()} • {totalYards} {totalYards === 1 ? 'yard' : 'yards'}
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default PaystackButton;
