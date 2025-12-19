import React from 'react';
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';
import { barChartData } from '../../data/mockData';

const BarChartPage: React.FC = () => {
  return (
    <div>
      <Header title="Bar Chart" subtitle="Visualizing data with bar charts" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Sales by Country</h3>
          <div className="h-[400px]">
            <BarChart data={barChartData} height={400} />
          </div>
        </div>
        
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <p className="font-medium">Top Performer</p>
              <p className="text-sm text-muted-foreground">USA leads with $400K in sales</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="font-medium">Growth</p>
              <p className="text-sm text-muted-foreground">23% growth compared to last quarter</p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <p className="font-medium">Attention Needed</p>
              <p className="text-sm text-muted-foreground">Consider expanding in Asian markets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChartPage;