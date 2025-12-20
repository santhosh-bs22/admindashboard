import React, { useMemo } from 'react';
import Header from '../../components/Header';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { lineChartData } from '../../data/mockData';
import { Card, CardContent } from '../../components/ui/card';
import { formatINR } from '../../lib/utils';
import { TrendingUp, Minus } from 'lucide-react';

const LineChartPage: React.FC = () => {
  
  // Transform Nivo data to Recharts compatible format
  const transformedData = useMemo(() => {
    if (!lineChartData || lineChartData.length === 0) return [];
    const firstSeries = lineChartData[0].data;
    return firstSeries.map((point, index) => {
      const dataPoint: any = { name: point.x };
      lineChartData.forEach(series => {
        dataPoint[series.id] = series.data[index].y;
      });
      return dataPoint;
    });
  }, []);

  return (
    <div className="space-y-6">
      <Header title="Revenue Analysis" subtitle="Monthly revenue, expense, and profit trends" />
      
      <Card>
        <CardContent className="pt-6">
           <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transformedData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(221, 83%, 53%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
                <XAxis 
                  dataKey="name" 
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
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                  }}
                  // FIX: Updated type to accept number | undefined
                  formatter={(value: number | undefined) => [formatINR(value || 0), ""]}
                />
                <Legend iconType="circle" />
                <Area 
                  type="monotone" 
                  dataKey="Revenue" 
                  stroke="hsl(221, 83%, 53%)" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="Profit" 
                  stroke="hsl(142, 71%, 45%)" 
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="Expenses" 
                  stroke="hsl(0, 84%, 60%)" 
                  fill="transparent" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
               <TrendingUp className="h-4 w-4 text-green-500" />
               <p className="text-sm font-medium text-muted-foreground">Average Revenue</p>
            </div>
            <p className="text-3xl font-bold">{formatINR(46500)}</p>
          </CardContent>
        </Card>
        <Card>
           <CardContent className="pt-6">
             <div className="flex items-center gap-2 mb-2">
               <TrendingUp className="h-4 w-4 text-green-500" />
               <p className="text-sm font-medium text-muted-foreground">Peak Performance</p>
             </div>
             <p className="text-3xl font-bold">June</p>
             <p className="text-xs text-muted-foreground mt-1">Highest profit margin recorded</p>
           </CardContent>
        </Card>
        <Card>
           <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                 <Minus className="h-4 w-4 text-blue-500" />
                 <p className="text-sm font-medium text-muted-foreground">YoY Growth</p>
              </div>
              <p className="text-3xl font-bold">18.5%</p>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LineChartPage;