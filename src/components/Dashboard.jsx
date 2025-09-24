import React from 'react';
import SalesGraph from './SalesGraph';
import ShipmentSummary from './ShipmentSummary';
import TopProducts from './TopProducts';
import ItemsShipped from './ItemsShipped';
import LevelComparison from './LevelComparison';
import DonutChart from './DonutChart';
import BusinessOverview from './BusinessOverview'; // Import BusinessOverview

function Dashboard() {
  return (
    <div
      className="flex-1 p-6 bg-gray-900 flex flex-col min-h-screen"
    >
      {/* Header */}
      <header className="mb-8 p-4 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-white mb-2">iShop4U</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-200">Today's Shipment</h2>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><BusinessOverview /></div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><ShipmentSummary /></div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><TopProducts /></div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><ItemsShipped /></div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><LevelComparison /></div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><DonutChart /></div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white"><SalesGraph /></div>
      </div>
    </div>
  );
}

export default Dashboard;
