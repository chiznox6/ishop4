import React, { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'

const SalesGraph = () => {
  const [timeRange, setTimeRange] = useState('month')

  const monthlyData = [
    { name: 'Jan', sales: 4000, revenue: 2400, orders: 240 },
    { name: 'Feb', sales: 3000, revenue: 1398, orders: 221 },
    { name: 'Mar', sales: 2000, revenue: 9800, orders: 229 },
    { name: 'Apr', sales: 2780, revenue: 3908, orders: 200 },
    { name: 'May', sales: 1890, revenue: 4800, orders: 218 },
    { name: 'Jun', sales: 2390, revenue: 3800, orders: 250 },
    { name: 'Jul', sales: 3490, revenue: 4300, orders: 210 },
  ]

  const weeklyData = [
    { name: 'Week 1', sales: 1200, revenue: 800, orders: 85 },
    { name: 'Week 2', sales: 1900, revenue: 1200, orders: 92 },
    { name: 'Week 3', sales: 1600, revenue: 950, orders: 78 },
    { name: 'Week 4', sales: 2100, revenue: 1400, orders: 105 },
  ]

  const dailyData = [
    { name: 'Mon', sales: 400, revenue: 240, orders: 24 },
    { name: 'Tue', sales: 300, revenue: 139, orders: 22 },
    { name: 'Wed', sales: 200, revenue: 980, orders: 29 },
    { name: 'Thu', sales: 278, revenue: 390, orders: 20 },
    { name: 'Fri', sales: 189, revenue: 480, orders: 18 },
    { name: 'Sat', sales: 239, revenue: 380, orders: 25 },
    { name: 'Sun', sales: 349, revenue: 430, orders: 21 },
  ]

  const data = timeRange === 'day' ? dailyData : timeRange === 'week' ? weeklyData : monthlyData

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title text-lg font-semibold">Sales Performance</h3>
          <div className="join">
            <input 
              className="join-item btn btn-sm" 
              type="radio" 
              name="timeRange" 
              aria-label="Day" 
              checked={timeRange === 'day'}
              onChange={() => setTimeRange('day')}
            />
            <input 
              className="join-item btn btn-sm" 
              type="radio" 
              name="timeRange" 
              aria-label="Week" 
              checked={timeRange === 'week'}
              onChange={() => setTimeRange('week')}
            />
            <input 
              className="join-item btn btn-sm" 
              type="radio" 
              name="timeRange" 
              aria-label="Month" 
              checked={timeRange === 'month'}
              onChange={() => setTimeRange('month')}
            />
          </div>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorSales)"
                name="Sales ($)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Orders"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200 mt-4">
          <div className="stat">
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-primary">${data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</div>
            <div className="stat-desc">21% more than last period</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-secondary">${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</div>
            <div className="stat-desc">15% more than last period</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value text-accent">{data.reduce((sum, item) => sum + item.orders, 0)}</div>
            <div className="stat-desc">8% more than last period</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesGraph