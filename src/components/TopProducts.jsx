import React from 'react'

const TopProducts = () => {
  const products = [
    { id: 'O1', name: 'Nome Decore Range', popularity: '', shipment: '46%' },
    { id: 'O2', name: 'Disney Princess Dress', popularity: '', shipment: '17%' },
    { id: 'O3', name: 'Bathroom Essentials', popularity: '', shipment: '18%' },
    { id: 'O4', name: 'Apple Smartwatch', popularity: '', shipment: '28%' }
  ]

  const getShipmentColor = (percentage) => {
    if (percentage >= 40) return 'bg-primary text-primary-content'
    if (percentage >= 20) return 'bg-secondary text-secondary-content'
    return 'bg-accent text-accent-content'
  }

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-4">Top Products</h3>
        
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-base-200">#</th>
                <th className="bg-base-200">Name</th>
                <th className="bg-base-200">Popularity</th>
                <th className="bg-base-200">Shipment</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-base-200 transition-colors">
                  <td className="font-semibold">{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${parseInt(product.shipment) + 20}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge badge-lg ${getShipmentColor(parseInt(product.shipment))}`}>
                      {product.shipment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TopProducts