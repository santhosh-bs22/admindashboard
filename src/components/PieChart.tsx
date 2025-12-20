import React from 'react';
import { ResponsivePie } from '@nivo/pie';

interface PieChartProps {
  data: any[];
  height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, height = 400 }) => {
  const theme = {
    labels: { text: { fill: '#71717a' } },
    legends: { text: { fill: '#71717a' } },
    tooltip: {
      container: {
        background: 'hsl(var(--card))',
        color: 'hsl(var(--foreground))',
        fontSize: '12px',
        borderRadius: '6px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        border: '1px solid hsl(var(--border))'
      },
    },
  };

  return (
    <div style={{ height }} className="w-full">
      <ResponsivePie
        data={data}
        theme={theme}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="hsl(var(--foreground))"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: 'circle',
            effects: [{ on: 'hover', style: { itemTextColor: 'hsl(var(--primary))' } }]
          }
        ]}
      />
    </div>
  );
};

export default PieChart;