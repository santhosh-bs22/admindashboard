import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { formatINR } from '../lib/utils';

interface BarChartProps {
  data: any[];
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, height = 400 }) => {
  // Common theme for dark/light mode compatibility
  const theme = {
    axis: {
      domain: { line: { stroke: '#71717a' } },
      legend: { text: { fill: '#71717a' } },
      ticks: { 
        line: { stroke: '#71717a', strokeWidth: 1 }, 
        text: { fill: '#71717a' } 
      }
    },
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
      <ResponsiveBar
        data={data}
        theme={theme}
        keys={['value']}
        indexBy="country"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Country',
          legendPosition: 'middle',
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Sales',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        enableGridY={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        role="application"
        ariaLabel="Sales Bar Chart"
      />
    </div>
  );
};

export default BarChart;