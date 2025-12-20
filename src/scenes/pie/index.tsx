import React, { useState } from 'react';
import Header from '../../components/Header';
import { 
  PieChart, 
  Pie, 
  Sector, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { pieChartData } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Custom shape for the active (hovered) slice
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill} className="font-bold text-lg">
        {payload.label}
      </text>
      <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#999" className="text-sm">
        {`${value} Units`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
    </g>
  );
};

const PieChartPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-6">
      <Header title="Category Sales" subtitle="Interactive breakdown of product categories" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    // FIX: Removed activeIndex={activeIndex} as it is removed in Recharts v3.
                    // The chart will handle the active shape internally on hover.
                    activeShape={renderActiveShape}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    dataKey="value"
                    onMouseEnter={onPieEnter} // Updates the list highlight
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
             <CardTitle>Details</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
             <p className="text-sm text-muted-foreground mb-4">
               Hover over the chart segments to see details.
             </p>
            {pieChartData.map((item, index) => (
              <div 
                key={item.id} 
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${index === activeIndex ? 'bg-muted border-primary/50' : 'bg-transparent'}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <span className="font-bold text-sm">{item.value}</span>
              </div>
            ))}
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PieChartPage;