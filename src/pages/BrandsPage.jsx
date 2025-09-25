import React, { useState, useEffect } from 'react';
import { API_BASE } from '../services/api';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_BASE}/brands`);
        const data = await response.json();
        if (response.ok) {
          setBrands(data.brands);
          setMessage(data.message);
        } else {
          setMessage(data.error || 'Failed to fetch brands');
        }
      } catch (error) {
        setMessage('Error connecting to the server.');
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto p-4 text-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-white">Brands</h1>
      {message && <p className="mb-4 text-gray-300">{message}</p>}
      {brands.length > 0 ? (
        <ul className="space-y-2">
          {brands.map((brand, index) => (
            <li key={index} className="text-lg text-gray-200">{brand}</li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
          <p className="text-gray-300 mb-4">No brands to display. Here are some placeholder brands:</p>
          <ul className="list-disc list-inside space-y-1">
            <li className="text-gray-200">Brand A</li>
            <li className="text-gray-200">Brand B</li>
            <li className="text-gray-200">Brand C</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;