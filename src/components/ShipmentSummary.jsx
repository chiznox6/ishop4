import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, Gift, TrendingDown, Truck, XCircle } from 'lucide-react';
import { fetchShipmentSummary } from '../services/api';

const iconMap = {
  Package: Package,
  ShoppingCart: ShoppingCart,
  Gift: Gift,
  TrendingUp: TrendingUp,
  TrendingDown: TrendingDown,
  Truck: Truck,
  XCircle: XCircle,
};

const ShipmentSummary = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getShipmentData = async () => {
      try {
        const data = await fetchShipmentSummary();
        setStats(data);
      } catch (err) {
        setError("Failed to fetch shipment summary.");
        console.error("Error fetching shipment summary:", err);
      } finally {
        setLoading(false);
      }
    };
    getShipmentData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading shipment summary...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="card bg-gray-800 shadow-xl rounded-2xl p-6 text-white flex flex-col h-full">
      <h3 className="text-2xl font-bold mb-6">Shipment Summary</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon];
          const changeColor = stat.change.includes('+') ? 'text-green-400' : 'text-red-400';
          const ChangeIcon = stat.change.includes('+') ? TrendingUp : TrendingDown;

          return (
            <div
              key={index}
              className="bg-gray-700 rounded-xl p-5 flex flex-col items-start shadow hover:shadow-lg hover:scale-[1.03] transition-all duration-300 h-full justify-between"
            >
              <div>
                <div className="stat-figure mb-3">
                  {Icon && <Icon className={`${stat.color}`} size={32} />}
                </div>
                <div className="stat-title text-base font-medium text-gray-300">{stat.label}</div>
              </div>
              <div>
                <div className="stat-value text-3xl font-extrabold mt-1 text-white">{stat.value}</div>
                <div className="stat-desc text-sm flex items-center mt-1 ${changeColor}">
                  {ChangeIcon && <ChangeIcon size={16} className="inline mr-1" />}
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentSummary;
