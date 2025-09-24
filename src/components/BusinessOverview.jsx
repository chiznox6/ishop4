import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler } from 'chart.js';
import { fetchSalesData, fetchProductCategories } from '../services/api';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler);

const BusinessOverview = () => {
  const [salesData, setSalesData] = useState(null);
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const sales = await fetchSalesData();
        const categories = await fetchProductCategories();
        setSalesData(sales);
        setCategoriesData(categories);
      } catch (err) {
        setError("Failed to fetch business data.");
        console.error("Error fetching business data:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-400 text-lg">Loading business overview...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 text-lg">{error}</div>;
  }

  // Prepare sales chart data
  const salesChartData = {
    labels: salesData?.map(s => s.date) || [],
    datasets: [
      {
        label: 'Sales',
        data: salesData?.map(s => s.amount) || [],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Prepare categories chart data
  const categoriesChartData = {
    labels: categoriesData?.map(c => c.name) || [],
    datasets: [
      {
        data: categoriesData?.map(c => c.product_count) || [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="card bg-gray-800 shadow-xl p-6 h-full flex flex-col"> {/* Using DaisyUI card and neutral background */}
      <h3 className="text-3xl font-bold text-white mb-6 text-center">Business Performance Overview</h3> {/* Using DaisyUI text color */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        <div className="card bg-gray-700 shadow-md p-4 flex flex-col justify-between">
          <h4 className="text-xl font-semibold text-white mb-4">Sales Trend</h4> {/* Using DaisyUI text color */}
          {salesData && salesData.length > 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <Line data={salesChartData} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <React.Fragment>
              <p className="text-gray-300 text-center text-lg">No sales data available.</p>
            </React.Fragment>
          )}
        </div>
        <div className="card bg-gray-700 shadow-md p-4 flex flex-col justify-between">
          <h4 className="text-xl font-semibold text-white mb-4">Products by Category</h4> {/* Using DaisyUI text color */}
          {categoriesData && categoriesData.length > 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <Doughnut data={categoriesChartData} options={{ maintainAspectRatio: false }} />
            </div>
          ) : (
            <React.Fragment>
              <p className="text-gray-300 text-center text-lg">No category data available.</p>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;
