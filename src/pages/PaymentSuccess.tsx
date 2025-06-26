
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentRef = searchParams.get('ref');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // In a real app, you'd verify the payment with your backend
    // For now, we'll just show success if we have a reference
    if (paymentRef) {
      setIsVerified(true);
    }
  }, [paymentRef]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            Payment Successful
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase! Your order has been confirmed.
          </p>
        </div>

        {paymentRef && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-8">
            <p className="text-sm text-gray-600 mb-1">Payment Reference</p>
            <p className="font-mono text-sm text-gray-900">{paymentRef}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link to="/" className="block">
            <Button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-2xl">
              Continue Shopping
            </Button>
          </Link>
          
          <p className="text-sm text-gray-500">
            You'll receive an email confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
