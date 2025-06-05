
import { useState } from "react";
import SecretKeyLogin from "@/components/pms/SecretKeyLogin";
import ProductManagementDashboard from "@/components/pms/ProductManagementDashboard";

const ProductManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthentication = (success: boolean) => {
    setIsAuthenticated(success);
  };

  if (!isAuthenticated) {
    return <SecretKeyLogin onAuthentication={handleAuthentication} />;
  }

  return <ProductManagementDashboard />;
};

export default ProductManagement;
