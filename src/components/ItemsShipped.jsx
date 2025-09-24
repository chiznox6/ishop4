import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const ItemsShipped = () => {
  const [shippedAmount, setShippedAmount] = useState(0);
  const [targetAmount, setTargetAmount] = useState(10000);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate fetching data or calculating values
    const timer = setTimeout(() => {
      const currentShipped = 6078.76;
      setShippedAmount(currentShipped);
      const calculatedProgress = (currentShipped / targetAmount) * 100;
      setProgress(calculatedProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, [targetAmount]);

  return (
    <div className="card bg-gray-800 shadow-xl p-6 text-white flex flex-col h-full justify-between"> {/* DaisyUI card, added flex for layout */}
      <div>
        <h3 className="text-2xl font-bold mb-2 text-left">Items Shipped</h3>
        <p className="amount-subtitle text-base text-gray-400 text-left mb-4">Total amount of items shipped</p>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="shipped-amount text-7xl font-extrabold mb-2">{shippedAmount.toLocaleString()}</div>
        <p className="shipped-description text-lg text-gray-400 mb-6">Target: {targetAmount.toLocaleString()}</p>
      </div>

      <div className="flex items-center justify-center gap-4 w-full">
        <progress className="progress progress-primary flex-grow h-4" value={progress} max="100"></progress>
        <span className="progress-value text-xl text-white font-semibold">{progress.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default ItemsShipped;
