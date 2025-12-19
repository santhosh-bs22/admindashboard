import React, { useState } from 'react';
import { Search, Download, Printer, CheckCircle, XCircle, Clock } from 'lucide-react';
import Header from '../../components/Header';

interface Invoice {
  id: number;
  client: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

const Invoices: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  const invoices: Invoice[] = [
    { id: 1, client: 'John Doe', date: '2024-01-15', amount: 2500, status: 'paid' },
    { id: 2, client: 'Jane Smith', date: '2024-01-16', amount: 1500, status: 'pending' },
    { id: 3, client: 'Bob Johnson', date: '2024-01-17', amount: 3500, status: 'overdue' },
    { id: 4, client: 'Alice Brown', date: '2024-01-18', amount: 500, status: 'paid' },
    { id: 5, client: 'Charlie Wilson', date: '2024-01-19', amount: 1800, status: 'pending' },
    { id: 6, client: 'David Lee', date: '2024-01-20', amount: 2200, status: 'paid' },
  ];

  const filteredInvoices = invoices.filter(invoice =>
    invoice.client.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredInvoices.length) {
      setSelected([]);
    } else {
      setSelected(filteredInvoices.map(invoice => invoice.id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'overdue':
        return 'Overdue';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return '';
    }
  };

  return (
    <div>
      <Header title="Invoices" subtitle="Manage your invoices and balances" />
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Create Invoice
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-6">
                  <input
                    type="checkbox"
                    checked={selected.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-6 font-semibold">ID</th>
                <th className="text-left py-3 px-6 font-semibold">Client</th>
                <th className="text-left py-3 px-6 font-semibold">Date</th>
                <th className="text-left py-3 px-6 font-semibold">Amount</th>
                <th className="text-left py-3 px-6 font-semibold">Status</th>
                <th className="text-left py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-6">
                    <input
                      type="checkbox"
                      checked={selected.includes(invoice.id)}
                      onChange={() => toggleSelect(invoice.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-6">#{invoice.id}</td>
                  <td className="py-3 px-6 font-medium">{invoice.client}</td>
                  <td className="py-3 px-6">{invoice.date}</td>
                  <td className="py-3 px-6 font-semibold">${invoice.amount.toLocaleString()}</td>
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoice.status)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="flex gap-2">
                      <button className="text-sm font-medium text-primary hover:underline">
                        View
                      </button>
                      <button className="text-sm font-medium text-primary hover:underline">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {selected.length} of {filteredInvoices.length} selected
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <>
              <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                Mark as Paid
              </button>
              <button className="rounded-lg border px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                Delete Selected
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;