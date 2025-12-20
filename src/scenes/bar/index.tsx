import React from 'react';
import Header from '../../components/Header';
import BarChart from '../../components/BarChart';
import { barChartData } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const BarChartPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Header title="Bar Chart" subtitle="Visualizing sales by country" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
             <CardTitle>Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[400px]">
               <BarChart data={barChartData} height={400} />
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900">
              <p className="font-semibold text-blue-900 dark:text-blue-100">Market Leader</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">India leads the market with 950 units sold.</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900">
              <p className="font-semibold text-green-900 dark:text-green-100">Growth</p>
              <p className="text-sm text-green-700 dark:text-green-300">45% growth in Asian markets this quarter.</p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900">
              <p className="font-semibold text-orange-900 dark:text-orange-100">Opportunity</p>
              <p className="text-sm text-orange-700 dark:text-orange-300">Singapore market showing high potential.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BarChartPage;