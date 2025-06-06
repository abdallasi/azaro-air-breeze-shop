
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsList from "./ProductsList";
import HeroImagesList from "./HeroImagesList";
import { useProductManagement } from "@/hooks/useProductManagement";

const ProductManagementDashboard = () => {
  const { isLoading, error } = useProductManagement();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Catalog
              </Button>
            </Link>
            <h1 className="text-3xl font-light">Product Management</h1>
            {isLoading && (
              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
            )}
          </div>
        </div>

        <div className="space-y-12">
          <ProductsList />
          <HeroImagesList />
        </div>
      </div>
    </div>
  );
};

export default ProductManagementDashboard;
