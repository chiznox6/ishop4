import React, { useState } from 'react';

const ProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productPrice) {
      alert('Product name and price are required!');
      return;
    }
    const newProduct = {
      id: Date.now(), // Simple unique ID
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      image: productImage || 'https://via.placeholder.com/150', // Default image
    };
    onAddProduct(newProduct);
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage('');
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6"> {/* DaisyUI card */}
      <h2 className="text-2xl font-bold mb-4 text-base-content">Add New Product</h2> {/* DaisyUI text color */}
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4"> {/* DaisyUI form-control */}
          <label htmlFor="productName" className="label">
            <span className="label-text text-base-content">Product Name:</span>
          </label>
          <input
            type="text"
            id="productName"
            className="input input-bordered w-full" // DaisyUI input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="form-control mb-4"> {/* DaisyUI form-control */}
          <label htmlFor="productDescription" className="label">
            <span className="label-text text-base-content">Description:</span>
          </label>
          <textarea
            id="productDescription"
            className="textarea textarea-bordered w-full" // DaisyUI textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div className="form-control mb-4"> {/* DaisyUI form-control */}
          <label htmlFor="productPrice" className="label">
            <span className="label-text text-base-content">Price:</span>
          </label>
          <input
            type="number"
            id="productPrice"
            className="input input-bordered w-full" // DaisyUI input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            step="0.01"
          />
        </div>
        <div className="form-control mb-4"> {/* DaisyUI form-control */}
          <label htmlFor="productImage" className="label">
            <span className="label-text text-base-content">Image URL:</span>
          </label>
          <input
            type="text"
            id="productImage"
            className="input input-bordered w-full" // DaisyUI input
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary" // DaisyUI primary button
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
