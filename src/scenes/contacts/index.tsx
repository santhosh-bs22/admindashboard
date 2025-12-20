import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin } from 'lucide-react';
import Header from '../../components/Header';
import { mockUsers } from '../../data/mockData';
import { Card, CardContent, CardHeader } from '../../components/ui/card';

const Contacts: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredContacts = mockUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header title="Contacts" subtitle="Directory of all contacts" />
      
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                 <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {contact.name.charAt(0)}
                 </div>
                 <div>
                    <h3 className="font-semibold text-sm">{contact.name}</h3>
                    <p className="text-xs text-muted-foreground">ID: #{contact.id}</p>
                 </div>
              </div>
            </CardHeader>
            <CardContent className="mt-4 space-y-3">
               <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{contact.email}</span>
               </div>
               <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
               </div>
               <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
               </div>
               <div className="pt-4 flex justify-between items-center border-t mt-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                      contact.access === 'admin' ? 'bg-red-100 text-red-700' :
                      contact.access === 'manager' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                  }`}>
                    {contact.access.toUpperCase()}
                  </span>
                  <button className="text-xs font-medium text-primary hover:underline">View Profile</button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Contacts;