import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { formatINR } from '../lib/utils';

interface LineChartProps {
  data: any[];
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, height = 400 }) => {
  const theme = {
    axis: {
      domain: { line: { stroke: '#71717a' } },
      legend: { text: { fill: '#71717a' } },
      ticks: { 
        line: { stroke: '#71717a', strokeWidth: 1 }, 
        text: { fill: '#71717a' } 
      }
    },
    grid: { line: { stroke: '#e5e7eb', strokeWidth: 1 } }, // Light grid
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
    crosshair: { line: { stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeOpacity: 0.5 } },
  };

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveLine
        data={data}
        theme={theme}
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        yFormat=" >-.2f"
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Month',
          legendOffset: 40,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Revenue',
          legendOffset: -50,
          legendPosition: 'middle',
          format: (value) => `₹${value / 1000}k` // Abbreviated currency
        }}
        enableGridX={false}
        enableGridY={true}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        enableSlices="x"
      />
    </div>
  );
};

export default LineChart;