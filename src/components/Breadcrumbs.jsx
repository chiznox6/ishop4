import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Define a mapping for display names
  const nameMap = {
    'shop': 'Shop',
    'cart': 'Cart',
    'checkout': 'Checkout',
    'products': 'Top Products',
    'shipments': 'Shipment Summary',
    'items-shipped': 'Items Shipped',
    'level-comparison': 'Level Comparison',
    'donut-chart': 'Donut Chart',
    'sales-graph': 'Sales Graph',
    'dashboard': 'Dashboard',
  };

  return (
    <div className="text-sm breadcrumbs mb-4">
      <ul>
        <li><Link to="/" className="text-base-content hover:text-primary">Home</Link></li>
        {pathnames.length === 0 ? (
          <li><span className="text-base-content">{nameMap[location.pathname.slice(1)] || 'Dashboard'}</span></li>
        ) : (
          pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const displayName = nameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

            return (
              <li key={to}>
                {last ? (
                  <span className="text-base-content">{displayName}</span>
                ) : (
                  <Link to={to} className="text-base-content hover:text-primary">{displayName}</Link>
                )}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
