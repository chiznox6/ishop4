import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Trophy, ShoppingBag, Package, BarChart2, PieChart, LineChart, LogOut } from "lucide-react";

const Sidebar = ({ logout, user }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Top Products", icon: <Package size={20} />, path: "/products" },
    { name: "Shipment Summary", icon: <ShoppingBag size={20} />, path: "/shipments" },
    { name: "Items Shipped", icon: <BarChart2 size={20} />, path: "/items-shipped" },
    { name: "Level Comparison", icon: <Trophy size={20} />, path: "/level-comparison" },
    { name: "Donut Chart", icon: <PieChart size={20} />, path: "/donut-chart" },
    { name: "Sales Graph", icon: <LineChart size={20} />, path: "/sales-graph" },
  ];

  const handleSignOut = () => {
    logout();
  };

  return (
    <aside className="w-64 bg-gray-900 text-gray-100 shadow-xl flex flex-col">
      
      {/* Profile section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-gray-900 ring-offset-2 overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg hover:text-primary transition-colors duration-300 cursor-default">
              {user?.username || "Guest"}
            </h2>
            <p className="text-sm text-gray-300">{user?.role || "Admin"}</p>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                ${isActive
                  ? "bg-primary/20 text-primary font-semibold"
                  : "hover:bg-gray-700 hover:text-primary"}`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-700">
        <button
          className="btn btn-error w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut size={20} /> <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
