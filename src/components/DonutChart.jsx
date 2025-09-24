import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DonutChart = () => {
  const data = [
    { name: 'Electronics', value: 35, color: 'hsl(var(--p))', hoverColor: 'hsl(var(--pf))' }, // primary
    { name: 'Clothing', value: 25, color: 'hsl(var(--s))', hoverColor: 'hsl(var(--sf))' }, // secondary
    { name: 'Home & Kitchen', value: 20, color: 'hsl(var(--a))', hoverColor: 'hsl(var(--af))' }, // accent
    { name: 'Toys', value: 15, color: 'hsl(var(--w))', hoverColor: 'hsl(var(--wf))' }, // warning
    { name: 'Beauty', value: 5, color: 'hsl(var(--er))', hoverColor: 'hsl(var(--erf))' } // error
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 p-3 rounded-xl shadow-md border border-gray-600">
          <p className="font-semibold text-white">{payload[0].name}</p>
          <p className="text-sm text-gray-300">
            Value: <span className="font-semibold">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-gray-800 shadow-xl rounded-2xl p-6 h-full hover:scale-[1.02] transition-transform duration-300">
      <h3 className="text-xl font-bold mb-6 text-white">Product Categories Distribution</h3>
      
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              innerRadius={50}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-300 hover:text-primary cursor-pointer transition-colors duration-300">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
