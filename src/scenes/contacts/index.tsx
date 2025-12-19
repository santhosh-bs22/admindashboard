import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin } from 'lucide-react';
import Header from '../../components/Header';
import { mockUsers } from '../../data/mockData';

const Contacts: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredContacts = mockUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header title="Contacts" subtitle="Manage your contacts" />
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">ID: {contact.id}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                contact.access === 'admin' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : contact.access === 'manager'
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              }`}>
                {contact.access}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">New York, USA</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t flex justify-between">
              <button className="text-sm font-medium text-primary hover:underline">
                View Profile
              </button>
              <button className="text-sm font-medium text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;