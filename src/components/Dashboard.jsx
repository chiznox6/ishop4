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
    <div className="flex-1 p-6 flex flex-col">
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
