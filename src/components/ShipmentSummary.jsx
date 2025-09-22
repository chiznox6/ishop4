import React from 'react'
import { TrendingUp, Package, ShoppingCart, Gift } from 'lucide-react'

const ShipmentSummary = () => {
  const stats = [
    {
      icon: Package,
      value: '$5k',
      label: 'Total shipment',
      change: '+10% from yesterday',
      color: 'text-blue-600'
    },
    {
      icon: ShoppingCart,
      value: '500',
      label: 'Total Order',
      change: '+3% from yesterday',
      color: 'text-green-600'
    },
    {
      icon: Gift,
      value: '9',
      label: 'Product Shipped',
      change: '+2% from yesterday',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      value: '12',
      label: 'New Goods',
      change: '+3% from yesterday',
      color: 'text-orange-600'
    }
  ]

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-4">Shipment Summary</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-figure">
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className="stat-title text-sm font-medium text-gray-600">{stat.label}</div>
              <div className="stat-value text-2xl font-bold">{stat.value}</div>
              <div className="stat-desc text-xs text-success">
                <TrendingUp size={12} className="inline mr-1" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShipmentSummary