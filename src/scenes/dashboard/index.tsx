import React from 'react';
import { Mail, Users, DollarSign, TrendingUp } from 'lucide-react';
import Header from '../../components/Header';
import StatBox from '../../components/StatBox';
import ProgressCircle from '../../components/ProgressCircle';
import LineChart from '../../components/LineChart';
import { lineChartData, mockTransactions } from '../../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle="Welcome to your admin dashboard" 
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatBox
          title="Emails Sent"
          value="12,361"
          subtitle="+14% from last month"
          icon={Mail}
          trend={{ value: 14, isPositive: true }}
        />
        <StatBox
          title="Sales Obtained"
          value="431,225"
          subtitle="+21% from last month"
          icon={DollarSign}
          trend={{ value: 21, isPositive: true }}
        />
        <StatBox
          title="New Clients"
          value="32,441"
          subtitle="+5% from last month"
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
        <StatBox
          title="Traffic Received"
          value="1,325,134"
          subtitle="+43% from last month"
          icon={TrendingUp}
          trend={{ value: 43, isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Generated</h3>
          <div className="h-[300px]">
            <LineChart data={lineChartData} height={300} />
          </div>
        </div>

        {/* Campaign Progress */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign</h3>
          <div className="flex flex-col items-center">
            <ProgressCircle value={75} size={180} />
            <p className="mt-4 text-center text-muted-foreground">
              $48,352 revenue generated
            </p>
            <p className="text-sm text-center">Includes extra misc expenditures and costs</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">ID</th>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{transaction.id}</td>
                  <td className="py-3 px-4">{transaction.name}</td>
                  <td className="py-3 px-4">{transaction.date}</td>
                  <td className="py-3 px-4">${transaction.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;