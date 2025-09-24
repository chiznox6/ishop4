import React, { useState } from 'react';
import { Line, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesGraph = () => {
  const [timeRange, setTimeRange] = useState('month');

  const monthlyData = [
    { name: 'Jan', sales: 4000, revenue: 2400, orders: 240 },
    { name: 'Feb', sales: 3000, revenue: 1398, orders: 221 },
    { name: 'Mar', sales: 2000, revenue: 9800, orders: 229 },
    { name: 'Apr', sales: 2780, revenue: 3908, orders: 200 },
    { name: 'May', sales: 1890, revenue: 4800, orders: 218 },
    { name: 'Jun', sales: 2390, revenue: 3800, orders: 250 },
    { name: 'Jul', sales: 3490, revenue: 4300, orders: 210 },
  ];

  const weeklyData = [
    { name: 'Week 1', sales: 1200, revenue: 800, orders: 85 },
    { name: 'Week 2', sales: 1900, revenue: 1200, orders: 92 },
    { name: 'Week 3', sales: 1600, revenue: 950, orders: 78 },
    { name: 'Week 4', sales: 2100, revenue: 1400, orders: 105 },
  ];

  const dailyData = [
    { name: 'Mon', sales: 400, revenue: 240, orders: 24 },
    { name: 'Tue', sales: 300, revenue: 139, orders: 22 },
    { name: 'Wed', sales: 200, revenue: 980, orders: 29 },
    { name: 'Thu', sales: 278, revenue: 390, orders: 20 },
    { name: 'Fri', sales: 189, revenue: 480, orders: 18 },
    { name: 'Sat', sales: 239, revenue: 380, orders: 25 },
    { name: 'Sun', sales: 349, revenue: 430, orders: 21 },
  ];

  const data = timeRange === 'day' ? dailyData : timeRange === 'week' ? weeklyData : monthlyData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 p-4 rounded-xl shadow-md border border-gray-600">
          <p className="font-bold text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-gray-800 shadow-xl rounded-2xl p-6 h-full flex flex-col hover:scale-[1.02] transition-transform duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Sales Performance</h3>
        <div className="join">
          {['day', 'week', 'month'].map((range) => (
            <input
              key={range}
              className="join-item btn btn-sm btn-outline hover:bg-primary hover:text-white transition-colors text-gray-300"
              type="radio"
              name="timeRange"
              aria-label={range}
              checked={timeRange === range}
              onChange={() => setTimeRange(range)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex-grow mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--p))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--p))" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--s))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--s))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--bc))" />
            <XAxis dataKey="name" stroke="hsl(var(--nc)))" fontSize={12} />
            <YAxis stroke="hsl(var(--nc))" fontSize={12} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="sales" stroke="hsl(var(--p))" fillOpacity={1} fill="url(#colorSales)" name="Sales ($)" strokeWidth={2} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--s))" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue ($)" strokeWidth={2} />
            <Line type="monotone" dataKey="orders" stroke="hsl(var(--a))" strokeWidth={2} dot={{ fill: 'hsl(var(--a))', strokeWidth: 2, r: 4 }} name="Orders" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="stats stats-vertical lg:stats-horizontal shadow bg-gray-700 mt-4 rounded-xl">
        <div className="stat p-4">
          <div className="stat-title text-gray-300 text-base">Total Sales</div>
          <div className="stat-value text-primary text-3xl">
            ${data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
          </div>
          <div className="stat-desc text-gray-400 text-sm">21% more than last period</div>
        </div>
        <div className="stat p-4">
          <div className="stat-title text-gray-300 text-base">Total Revenue</div>
          <div className="stat-value text-secondary text-3xl">
            ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </div>
          <div className="stat-desc text-gray-400 text-sm">15% more than last period</div>
        </div>
        <div className="stat p-4">
          <div className="stat-title text-gray-300 text-base">Total Orders</div>
          <div className="stat-value text-accent text-3xl">{data.reduce((sum, item) => sum + item.orders, 0)}</div>
          <div className="stat-desc text-gray-400 text-sm">8% more than last period</div>
        </div>
      </div>
    </div>
  );
};

export default SalesGraph;
