
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductEditForm from "./ProductEditForm";
import { useProductManagement } from "@/hooks/useProductManagement";

const ProductsList = () => {
  const { products, updateProduct, deleteProduct, addProduct } = useProductManagement();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (productId: string) => {
    setEditingProduct(productId);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
  };

  const handleSave = (productData: any, isNew: boolean) => {
    if (isNew) {
      addProduct(productData);
      setIsAddingNew(false);
    } else {
      updateProduct(editingProduct!, productData);
      setEditingProduct(null);
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light">Products</h2>
        <Button onClick={handleAddNew} className="bg-black hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {isAddingNew && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductEditForm
              onSave={(data) => handleSave(data, true)}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              {editingProduct === product.id ? (
                <ProductEditForm
                  product={product}
                  onSave={(data) => handleSave(data, false)}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
