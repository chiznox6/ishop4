import React from 'react';
import { Target, Calendar } from 'lucide-react';

const LevelComparison = () => {
  return (
    <div className="card bg-gray-800 shadow-xl p-6 text-white flex flex-col h-full justify-between"> {/* DaisyUI card, added flex for layout */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Target size={24} className="text-primary" />
          <h3 className="text-2xl font-bold">Level Comparison</h3>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={20} className="text-gray-400" />
          <p className="level-subtitle text-lg text-gray-400">Comparison between last month and this month</p>
        </div>
      </div>

      <div className="month-comparison flex flex-grow justify-around items-center mb-6">
        <div className="month-item text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Calendar size={20} className="text-gray-400" />
            <p className="month-label text-lg text-gray-400">Last Month</p>
          </div>
          <p className="month-amount text-4xl font-extrabold text-white">12,450</p>
        </div>
        <div className="month-item text-center flex flex-col items-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Calendar size={20} className="text-gray-400" />
            <p className="month-label text-lg text-gray-400">This Month</p>
          </div>
          <p className="month-amount text-4xl font-extrabold text-white">15,600</p>
        </div>
      </div>

      <p className="new-visions text-primary font-semibold text-xl text-center">New Visions: +25% Growth</p>
    </div>
  );
};

export default LevelComparison;
