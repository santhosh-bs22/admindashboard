import React from 'react';
import Header from '../../components/Header';
import PieChart from '../../components/PieChart';
import { pieChartData } from '../../data/mockData';

const PieChartPage: React.FC = () => {
  return (
    <div>
      <Header title="Pie Chart" subtitle="Visualizing data distribution" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Technology Usage Distribution</h3>
          <div className="h-[400px]">
            <PieChart data={pieChartData} height={400} />
          </div>
        </div>
        
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Distribution Details</h3>
          <div className="space-y-4">
            {pieChartData.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: `hsl(var(--primary))` }}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="font-semibold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartPage;