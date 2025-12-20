import React, { useState } from 'react';
import Header from '../../components/Header';
import { formatINR } from '../../lib/utils';
import { mockInvoices, Invoice } from '../../data/mockData';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Search,
  Filter,
  Download 
} from 'lucide-react';

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Partial<Invoice>>({});
  const [isEditing, setIsEditing] = useState(false);

  // --- Filter State ---
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // --- Handlers ---
  const handleOpenAdd = () => {
    setCurrentInvoice({ 
      status: 'pending', 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentInvoice.id) {
      setInvoices(invoices.map(inv => 
        inv.id === currentInvoice.id ? { ...inv, ...currentInvoice } as Invoice : inv
      ));
    } else {
      const newInvoice: Invoice = {
        ...currentInvoice,
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        amount: Number(currentInvoice.amount),
      } as Invoice;
      setInvoices([newInvoice, ...invoices]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentInvoice(prev => ({ ...prev, [name]: value }));
  };

  // --- Filter Logic ---
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.client.toLowerCase().includes(search.toLowerCase()) ||
      invoice.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // --- Download Functionality ---
  const handleDownload = () => {
    const headers = ["ID", "Client", "Date", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredInvoices.map(inv => 
        [inv.id, `"${inv.client}"`, inv.date, inv.amount, inv.status].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "invoices.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Header title="Invoices" subtitle="List of Invoice Balances" />
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* --- Filter Toolbar --- */}
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg border shadow-sm items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            placeholder="Search by ID or Client..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 w-full bg-background border rounded-md text-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Status Filter */}
        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-9 pr-4 py-2 w-full bg-background border rounded-md text-sm focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="All">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Export Button */}
        <button 
          onClick={handleDownload}
          className="p-2 hover:bg-muted rounded-full transition hidden sm:block" 
          title="Download CSV"
        >
          <Download className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{invoice.id}</td>
                    <td className="px-6 py-4">{invoice.client}</td>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4 font-bold text-primary">
                      {formatINR(invoice.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                        invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <button 
                        onClick={() => handleOpenEdit(invoice)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(invoice.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No invoices found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md p-6 rounded-lg shadow-xl border relative animate-in fade-in zoom-in duration-200">
             <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Invoice' : 'New Invoice'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Client Name</label>
                <input name="client" required value={currentInvoice.client || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input name="date" type="date" required value={currentInvoice.date || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <input name="amount" type="number" required value={currentInvoice.amount || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select name="status" value={currentInvoice.status || 'pending'} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary">
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">{isEditing ? 'Save Changes' : 'Create Invoice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;