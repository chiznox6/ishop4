import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, Users, DollarSign, Eye } from 'lucide-react';
import SalesGraph from './SalesGraph';
import ShipmentSummary from './ShipmentSummary';
import TopProducts from './TopProducts';
import ItemsShipped from './ItemsShipped';
import LevelComparison from './LevelComparison';
import DonutChart from './DonutChart';
import BusinessOverview from './BusinessOverview';
import { fetchTotalSales } from '../services/api'; // Import fetchTotalSales

const MetricCard = ({ title, value, change, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    error: 'text-error bg-error/10',
    info: 'text-info bg-info/10'
  };

  return (
    <div className="card bg-gray-800 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            {change && (
              <p className={`text-sm flex items-center gap-1 ${
                change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                <TrendingUp size={16} className={change.startsWith('+') ? '' : 'rotate-180'} />
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [totalSales, setTotalSales] = useState(0); // State for total sales

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const salesData = await fetchTotalSales();
        setTotalSales(salesData.total_sales);
      } catch (error) {
        console.error("Failed to fetch total sales:", error);
        setTotalSales(0); // Set to 0 or handle error display
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Sales Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm text-white border-white hover:bg-white hover:text-gray-900">
            <Eye size={16} />
            View Reports
          </button>
          <button className="btn btn-primary btn-sm hover:bg-primary-focus">
            <TrendingUp size={16} />
            Analytics
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                  title="Total Revenue"
                  value={`$${totalSales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  change="+12.5% from last month" // Keep mock change for now
                  icon={DollarSign}
                  color="success"
                />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Graph */}
        <div className="card bg-gray-800 shadow-xl col-span-1 lg:col-span-2">
          <div className="card-body">
            <h3 className="card-title text-white">Sales Overview</h3>
            <SalesGraph />
          </div>
        </div>

        {/* Business Overview */}
        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Business Overview</h3>
            <BusinessOverview />
          </div>
        </div>

        {/* Shipment Summary */}
        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Shipment Summary</h3>
            <ShipmentSummary />
          </div>
        </div>

        {/* Top Products */}
        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Top Products</h3>
            <TopProducts />
          </div>
        </div>

        {/* Items Shipped */}
        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Items Shipped</h3>
            <ItemsShipped />
          </div>
        </div>

        {/* Level Comparison */}
        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Performance Comparison</h3>
            <LevelComparison />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="card bg-gray-800 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-white">Category Distribution</h3>
            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
