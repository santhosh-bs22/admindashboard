export const features = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "IND",
      properties: { name: "India" },
      geometry: { 
        type: "Polygon", 
        // Simplified Coordinates for India Visualization
        coordinates: [[[68.1, 33.5], [68.1, 8.0], [97.4, 8.0], [97.4, 33.5], [68.1, 33.5]]] 
      }
    },
    {
      type: "Feature",
      id: "USA",
      properties: { name: "USA" },
      geometry: { 
        type: "Polygon", 
        // Simplified Coordinates for USA Visualization
        coordinates: [[[-125.0, 49.0], [-125.0, 24.0], [-66.9, 24.0], [-66.9, 49.0], [-125.0, 49.0]]] 
      }
    },
     {
      type: "Feature",
      id: "GBR",
      properties: { name: "UK" },
      geometry: { 
        type: "Polygon", 
        // Simplified Coordinates for UK Visualization
        coordinates: [[[-8.6, 60.8], [-8.6, 49.9], [1.7, 49.9], [1.7, 60.8], [-8.6, 60.8]]] 
      }
    }
  ]
};