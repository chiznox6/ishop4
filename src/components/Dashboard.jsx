import React from 'react'
import ShipmentSummary from './ShipmentSummary'
import TopProducts from './TopProducts'
import ItemsShipped from './ItemsShipped'
import LevelComparison from './LevelComparison'
import DonutChart from './DonutChart'
import SalesGraph from './SalesGraph'

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-400 mb-2">www.nickelfox.com</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Today's Shipment</h2>
          <div className="text-sm text-gray-500">
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
      <div className="dashboard-grid">
        <div className="grid-area-summary">
          <ShipmentSummary />
        </div>
        
        <div className="grid-area-products">
          <TopProducts />
        </div>
        
        <div className="grid-area-shipped">
          <ItemsShipped />
        </div>
        
        <div className="grid-area-level">
          <LevelComparison />
        </div>

        {/* New Chart Sections */}
        <div className="grid-area-donut">
          <DonutChart />
        </div>
        
        <div className="grid-area-graph">
          <SalesGraph />
        </div>
      </div>
    </div>
  )
}

export default Dashboard