import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api"; // Import getProducts and deleteProduct
import ProductForm from "../components/ProductForm"; // Import ProductForm
// import { addToCart } from "../services/api"; // No longer needed for this page's core functionality
// import axios from "axios"; // No longer needed
// import TopProducts from "../components/TopProducts"; // No longer needed

const TopProductsPage = () => { // Renamed from ProductsPage to TopProductsPage for clarity
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(); // Use our getProducts API
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
    setLoading(false);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh the list after saving
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4 text-yellow-400">Products</h1> {/* Changed title from Top Products to Products */}

      <button
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
        className="mt-2 btn btn-primary w-full" // Using existing button style
      >
        Add New Product
      </button>

      {showForm && (
        <div className="card bg-gray-800 shadow-md p-4 rounded-lg my-4"> {/* Using existing card styling */}
          <ProductForm
            product={editingProduct}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-gray-800 shadow-md p-4 rounded-lg hover:bg-gray-700 transition-all"
            >
              {/* Removed image and affiliate link as they are specific to Amazon products */}
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-300">${product.price}</p> {/* Displaying price */}
              <p className="text-gray-300 text-sm">{product.description}</p> {/* Displaying description */}
              <div className="mt-4 flex justify-end space-x-2"> {/* Using flex for buttons */}
                <button
                  onClick={() => handleEdit(product)}
                  className="btn btn-primary" // Using existing button style
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-primary" // Using existing button style, assuming primary for now
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopProductsPage;
