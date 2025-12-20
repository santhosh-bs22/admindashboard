import React, { useState } from 'react';
import { Search, Download, Printer, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import Header from '../../components/Header';
import { formatINR } from '../../lib/utils';
import { mockInvoices } from '../../data/mockData';

const Invoices: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.client.toLowerCase().includes(search.toLowerCase()) ||
    invoice.id.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: string) => {
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

  const getStatusBadge = (status: string) => {
    const config = {
      paid: { icon: CheckCircle, class: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
      pending: { icon: Clock, class: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' },
      overdue: { icon: XCircle, class: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
    };
    const Conf = config[status as keyof typeof config];
    const Icon = Conf.icon;

    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit border ${Conf.class}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Header title="Invoices" subtitle="Manage your billing and invoices" />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search invoice or client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent">
            <Download className="h-4 w-4" /> Export
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90">
            <FileText className="h-4 w-4" /> Create Invoice
          </button>
        </div>
      </div>

      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground w-[50px]">
                  <input
                    type="checkbox"
                    checked={selected.length === filteredInvoices.length && filteredInvoices.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-gray-300 accent-primary"
                  />
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Invoice ID</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Client</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50 last:border-0">
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      checked={selected.includes(invoice.id)}
                      onChange={() => toggleSelect(invoice.id)}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                  </td>
                  <td className="p-4 align-middle font-medium">{invoice.id}</td>
                  <td className="p-4 align-middle">{invoice.client}</td>
                  <td className="p-4 align-middle text-muted-foreground">{invoice.date}</td>
                  <td className="p-4 align-middle font-semibold">{formatINR(invoice.amount)}</td>
                  <td className="p-4 align-middle">{getStatusBadge(invoice.status)}</td>
                  <td className="p-4 align-middle text-right">
                    <button className="text-primary hover:underline font-medium text-xs">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground px-2">
        Showing {filteredInvoices.length} entries
      </div>
    </div>
  );
};

export default Invoices;