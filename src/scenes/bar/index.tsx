import React from 'react';
import Header from '../../components/Header';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';
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
             <div className="h-[400px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                   <defs>
                     <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                       <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
                   <XAxis 
                     dataKey="country" 
                     stroke="#888888" 
                     fontSize={12} 
                     tickLine={false} 
                     axisLine={false} 
                   />
                   <YAxis 
                     stroke="#888888" 
                     fontSize={12} 
                     tickLine={false} 
                     axisLine={false} 
                   />
                   <Tooltip 
                     cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                     contentStyle={{ 
                       backgroundColor: 'hsl(var(--card))', 
                       borderColor: 'hsl(var(--border))', 
                       borderRadius: '8px',
                       boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                     }}
                   />
                   <Bar 
                     dataKey="value" 
                     fill="url(#colorBar)" 
                     radius={[6, 6, 0, 0]}
                     maxBarSize={60}
                   />
                 </BarChart>
               </ResponsiveContainer>
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