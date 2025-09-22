import React, { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'

const ItemsShipped = () => {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(6078.76)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-2">Items shipped</h3>
        <p className="text-sm text-gray-500 mb-4">amount in usd</p>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            ${animatedValue.toLocaleString()}
          </div>
          <div className="flex items-center justify-center text-success text-sm mb-6">
            <TrendingUp size={16} className="mr-1" />
            Shipment is 45% More than last Month
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full progress-animation"
            ></div>
          </div>
          <div className="text-right text-sm font-semibold">80%</div>
        </div>
      </div>
    </div>
  )
}

export default ItemsShipped