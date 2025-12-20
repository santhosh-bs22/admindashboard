import React, { useState, useEffect } from 'react';
import { 
  Users, 
  IndianRupee, 
  Activity, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { formatINR } from '../../lib/utils';
import { mockTransactions, revenueData } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(1234);
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. Add state for the filter
  const [statusFilter, setStatusFilter] = useState<'All' | 'Success' | 'Processing' | 'Failed'>('All');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 10) - 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. Filter logic based on the "All" button or specific statuses
  const filteredTransactions = mockTransactions.filter((txn) => {
    if (statusFilter === 'All') return true;
    return txn.status === statusFilter;
  });

  // 3. Download Report Logic
  const handleDownloadReport = () => {
    setIsLoading(true);

    // Simulate a brief delay for better UX
    setTimeout(() => {
      // --- Section A: Revenue Data ---
      const revenueHeaders = ['Month', 'Revenue', 'Profit', 'Orders'];
      const revenueRows = revenueData.map(item => 
        [item.name, item.revenue, item.profit, item.orders || 0].join(',')
      );

      // --- Section B: Transactions Data (Respects current filter) ---
      const txnHeaders = ['ID', 'User', 'Date', 'Amount', 'Status', 'Method'];
      const txnRows = filteredTransactions.map(txn => 
        [txn.id, txn.name, txn.date, txn.amount, txn.status, txn.method].join(',')
      );

      // Combine into a single CSV string with separators
      const csvContent = [
        '--- MONTHLY FINANCIAL OVERVIEW ---',
        revenueHeaders.join(','),
        ...revenueRows,
        '\n--- RECENT TRANSACTIONS REPORT ---',
        txnHeaders.join(','),
        ...txnRows
      ].join('\n');

      // Create Blob and Trigger Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dashboard_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <button 
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            onClick={handleDownloadReport}
            disabled={isLoading}
          >
            <Download className={`mr-2 h-4 w-4 ${isLoading ? 'animate-bounce' : ''}`} />
            {isLoading ? 'Downloading...' : 'Download Reports'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatINR(4523189)}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                +20.1% <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users (Live)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold transition-all duration-300">{activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-green-500 flex items-center mr-1">
                +180 <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </span>
              since last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <span className="text-red-500 flex items-center mr-1">
                -4% <ArrowDownRight className="h-3 w-3 ml-0.5" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground mt-1">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Monthly revenue breakdown for the current fiscal year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      borderColor: 'hsl(var(--border))', 
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value: number | undefined) => [formatINR(value || 0), "Amount"]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(221, 83%, 53%)" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="hsl(142, 71%, 45%)" 
                    fillOpacity={1} 
                    fill="url(#colorProfit)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Recent Sales</CardTitle>
              {/* Filter Buttons UI */}
              <div className="flex space-x-2">
                {['All', 'Success', 'Processing', 'Failed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status as any)}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors border ${
                      statusFilter === status 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'text-muted-foreground hover:bg-muted border-transparent hover:border-border'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <CardDescription>
              {statusFilter === 'All' 
                ? `You made ${mockTransactions.filter(t => t.status === 'Success').length} successful sales this month.`
                : `Showing ${filteredTransactions.length} ${statusFilter.toLowerCase()} transactions.`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Display Filtered Transactions (Showing up to 6) */}
              {filteredTransactions.slice(0, 6).map((txn) => (
                <div key={txn.id} className="flex items-center group">
                  <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary items-center justify-center font-bold border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {txn.name.charAt(0)}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{txn.name}</p>
                    <p className="text-xs text-muted-foreground">{txn.method}</p>
                  </div>
                  <div className={`ml-auto font-medium ${txn.status === 'Success' ? 'text-green-600 dark:text-green-500' : ''}`}>
                    {txn.status === 'Success' ? '+' : ''}{formatINR(txn.amount)}
                  </div>
                </div>
              ))}
              
              {filteredTransactions.length === 0 && (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  No transactions found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;