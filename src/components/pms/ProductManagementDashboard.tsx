
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductsList from "./ProductsList";
import HeroImagesList from "./HeroImagesList";

const ProductManagementDashboard = () => {
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
