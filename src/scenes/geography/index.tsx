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
import { geographyData } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { formatINR } from '../../lib/utils';

const Geography: React.FC = () => {
  // Sort data for better visualization in a horizontal bar chart
  const sortedData = [...geographyData].sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <Header title="Geography" subtitle="Revenue by region (Top Markets)" />
      
      <Card>
        <CardHeader>
           <CardTitle>Regional Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedData}
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} className="stroke-muted/40" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="id" 
                  type="category" 
                  width={60}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                  }}
                  // FIX: Updated type to accept number | undefined
                  formatter={(value: number | undefined) => [formatINR(value || 0), "Revenue"]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {sortedData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index < 3 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Geography;