import React, { useEffect, useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { formatINR } from '../lib/utils';

interface GeographyChartProps {
  data: any[];
  height?: number;
}

const GeographyChart: React.FC<GeographyChartProps> = ({ data, height = 500 }) => {
  const [geoFeatures, setGeoFeatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically fetch standard world map shapes
    fetch('https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/world_countries.json')
      .then((res) => res.json())
      .then((data) => {
        setGeoFeatures(data.features);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading map data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ height }} className="flex items-center justify-center bg-muted/10 rounded-xl border border-dashed animate-pulse">
        <p className="text-sm font-medium text-muted-foreground">Loading Map Data...</p>
      </div>
    );
  }

  // Dark/Light Mode Theme
  const theme = {
    axis: { ticks: { text: { fill: '#888888' } } },
    legends: { text: { fill: '#888888' } },
    tooltip: {
      container: {
        background: 'hsl(var(--card))',
        color: 'hsl(var(--foreground))',
        fontSize: '12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid hsl(var(--border))',
      },
    },
  };

  return (
    <div style={{ height }} className="w-full rounded-xl overflow-hidden bg-card border">
      <ResponsiveChoropleth
        data={data}
        features={geoFeatures}
        theme={theme}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="nivo"
        domain={[0, 1000000]}
        unknownColor="hsl(var(--muted))"
        label="properties.name"
        valueFormat={(value) => formatINR(value)}
        projectionScale={140}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="hsl(var(--border))"
        borderWidth={0.5}
        borderColor="hsl(var(--background))"
        match="id" // Matches 'IND' in data to 'IND' in map
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -20,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#888888',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [{ on: 'hover', style: { itemTextColor: 'hsl(var(--foreground))', itemOpacity: 1 } }]
          }
        ]}
      />
    </div>
  );
};

export default GeographyChart;