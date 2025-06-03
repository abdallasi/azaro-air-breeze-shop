
import { useState } from 'react';

interface ProductSelection {
  [productId: string]: {
    selected: boolean;
    quantity: number;
  };
}

export const useProductSelection = () => {
  const [selections, setSelections] = useState<ProductSelection>({});

  const updateSelection = (productId: string, selected: boolean) => {
    setSelections(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        selected,
        quantity: prev[productId]?.quantity || 4
      }
    }));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setSelections(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity,
        selected: prev[productId]?.selected || false
      }
    }));
  };

  const getSelection = (productId: string) => {
    return selections[productId] || { selected: false, quantity: 4 };
  };

  const getSelectedProducts = (products: Array<{ id: string; name: string }>) => {
    return products
      .filter(product => selections[product.id]?.selected)
      .map(product => ({
        id: product.id,
        name: product.name,
        quantity: selections[product.id].quantity
      }));
  };

  const getTotalYards = (products: Array<{ id: string }>) => {
    return products.reduce((total, product) => {
      const selection = selections[product.id];
      if (selection?.selected) {
        return total + selection.quantity;
      }
      return total;
    }, 0);
  };

  return {
    updateSelection,
    updateQuantity,
    getSelection,
    getSelectedProducts,
    getTotalYards
  };
};
