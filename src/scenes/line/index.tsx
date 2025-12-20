import React from 'react';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import { lineChartData } from '../../data/mockData';
import { Card, CardContent } from '../../components/ui/card';
import { formatINR } from '../../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const LineChartPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Header title="Line Chart" subtitle="Revenue trends over the fiscal year" />
      
      <Card>
        <CardContent className="pt-6">
           <div className="h-[500px]">
            <LineChart data={lineChartData} height={500} />
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
               <TrendingUp className="h-4 w-4 text-green-500" />
               <p className="text-sm font-medium text-muted-foreground">Average Monthly Revenue</p>
            </div>
            <p className="text-3xl font-bold">{formatINR(46500)}</p>
          </CardContent>
        </Card>
        <Card>
           <CardContent className="pt-6">
             <div className="flex items-center gap-2 mb-2">
               <TrendingUp className="h-4 w-4 text-green-500" />
               <p className="text-sm font-medium text-muted-foreground">Peak Month</p>
             </div>
             <p className="text-3xl font-bold">June</p>
             <p className="text-xs text-muted-foreground mt-1">₹61,000 revenue recorded</p>
           </CardContent>
        </Card>
        <Card>
           <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                 <Minus className="h-4 w-4 text-blue-500" />
                 <p className="text-sm font-medium text-muted-foreground">Projected Growth</p>
              </div>
              <p className="text-3xl font-bold">18.5%</p>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LineChartPage;