import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_BACKENED_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addProduct = async (productData) => {
    const response = await fetch(`${apiUrl}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const {newProduct} = await response.json();
    
    setProducts((prevProducts) => [newProduct, ...prevProducts]);

    return newProduct;
  };
  const deleteProduct = async (id) => {
    const response = await fetch(`${apiUrl}/api/products/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        loading,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
