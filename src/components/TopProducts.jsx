import React from 'react';
import { addToCart } from '../services/api';

const TopProducts = () => {
  const products = [
    { id: 'O1', name: 'Nome Decore Range', popularity: '', shipment: '46%' },
    { id: 'O2', name: 'Disney Princess Dress', popularity: '', shipment: '17%' },
    { id: 'O3', name: 'Bathroom Essentials', popularity: '', shipment: '18%' },
    { id: 'O4', name: 'Apple Smartwatch', popularity: '', shipment: '28%' }
  ];

  const getShipmentColor = (percentage) => {
    if (percentage >= 40) return 'badge-success'; // DaisyUI success badge
    if (percentage >= 20) return 'badge-warning'; // DaisyUI warning badge
    return 'badge-error'; // DaisyUI error badge
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await addToCart({ 
        id: product.id, 
        name: product.name, 
        price: Math.floor(Math.random() * 100) + 10, // dummy price, replace if API has price
        quantity: 1 
      });
      if (response.success) {
        alert(`${product.name} added to cart`);
      } else {
        alert('Failed to add to cart');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Error adding product to cart');
    }
  };

  return (
    <div className="card bg-gray-800 shadow-xl rounded-2xl p-6 text-white">
      <h3 className="text-xl font-bold mb-6">Top Products</h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th>#</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Shipment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const shipmentPercent = parseInt(product.shipment);
              return (
                <tr key={product.id} className="hover:bg-gray-600 transition-colors">
                  <td className="font-semibold text-white">{product.id}</td>
                  <td className="text-gray-300">{product.name}</td>
                  <td>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${shipmentPercent + 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getShipmentColor(shipmentPercent)}`}>
                      {product.shipment}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-sm btn-primary hover:scale-105 transition-transform"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProducts;
