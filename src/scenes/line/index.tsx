import React from 'react';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import { lineChartData } from '../../data/mockData';

const LineChartPage: React.FC = () => {
  return (
    <div>
      <Header title="Line Chart" subtitle="Visualizing trends over time" />
      
      <div className="bg-card rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue & Profit Trends</h3>
        <div className="h-[500px]">
          <LineChart data={lineChartData} height={500} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 rounded-lg bg-card border">
          <p className="font-medium">Average Revenue</p>
          <p className="text-2xl font-bold mt-2">$3,189</p>
        </div>
        <div className="p-4 rounded-lg bg-card border">
          <p className="font-medium">Peak Month</p>
          <p className="text-2xl font-bold mt-2">March</p>
        </div>
        <div className="p-4 rounded-lg bg-card border">
          <p className="font-medium">Growth Rate</p>
          <p className="text-2xl font-bold mt-2">18.5%</p>
        </div>
      </div>
    </div>
  );
};

export default LineChartPage;