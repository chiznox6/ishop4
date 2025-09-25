import React, { useState, useEffect } from 'react';
import { fetchBrands } from '../services/api'; // Import fetchBrands from api.jsx

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadBrands = async () => { // Renamed to loadBrands to avoid confusion
      try {
        const data = await fetchBrands(); // Call the imported fetchBrands
        setBrands(data); // Backend returns a list of strings directly
        setMessage(''); // Clear any previous message on success
      } catch (error) {
        setMessage(error.message || 'Failed to fetch brands');
        console.error('Error fetching brands:', error);
      }
    };
    loadBrands();
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