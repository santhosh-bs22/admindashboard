import React from 'react';
import Header from '../../components/Header';
import GeographyChart from '../../components/GeographyChart';
import { geographyData } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { formatINR } from '../../lib/utils';
import { Globe, TrendingUp } from 'lucide-react';

const GeographyChartPage: React.FC = () => {
  // Sort data to find top performers
  const sortedData = [...geographyData].sort((a, b) => b.value - a.value);
  const totalUsers = geographyData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6">
      <Header title="Geography" subtitle="Global user distribution and traffic analysis" />
      
      {/* Key Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full text-blue-600">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold">{totalUsers.toLocaleString()}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Top Region</p>
              <h3 className="text-2xl font-bold">India (IND)</h3>
              <p className="text-xs text-muted-foreground">Highest traffic source</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map Area */}
        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Global Traffic Map</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
             <GeographyChart data={geographyData} height={500} />
          </CardContent>
        </Card>
        
        {/* Sidebar - Top Regions List */}
        <Card className="lg:col-span-1 h-full">
          <CardHeader>
            <CardTitle>Top Regions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {sortedData.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{item.id}</p>
                    <div className="w-24 h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${(item.value / sortedData[0].value) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
                <span className="text-sm font-medium">{formatINR(item.value)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeographyChartPage;