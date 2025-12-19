import React from 'react';
import Header from '../../components/Header';
import GeographyChart from '../../components/GeographyChart';
import { geographyData } from '../../data/mockData';

const GeographyChartPage: React.FC = () => {
  return (
    <div>
      <Header title="Geography Chart" subtitle="Visualizing global data" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Global Distribution</h3>
          <div className="h-[500px]">
            <GeographyChart data={geographyData} height={500} />
          </div>
        </div>
        
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Top Regions</h3>
          <div className="space-y-4">
            {geographyData.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <span className="font-medium">{item.id}</span>
                <span className="font-semibold">${(item.value / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 rounded-lg bg-primary/10">
            <h4 className="font-medium mb-2">Insights</h4>
            <p className="text-sm text-muted-foreground">
              North America shows the highest values, followed by Europe. 
              Consider expanding marketing efforts in growing markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographyChartPage;