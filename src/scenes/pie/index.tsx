import React from 'react';
import Header from '../../components/Header';
import PieChart from '../../components/PieChart';
import { pieChartData } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const PieChartPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Header title="Pie Chart" subtitle="Product category distribution" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <PieChart data={pieChartData} height={400} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <CardTitle>Category Breakdown</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
            {pieChartData.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: `hsl(var(--primary))` }} // Simplified color logic
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <span className="font-bold text-sm">{item.value} units</span>
              </div>
            ))}
             <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
               Electronics account for the largest share of sales (35%), followed by Fashion.
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PieChartPage;