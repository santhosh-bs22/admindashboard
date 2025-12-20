import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, X, User as UserIcon, Calendar, Shield } from 'lucide-react';
import Header from '../../components/Header';
import { mockUsers, User } from '../../data/mockData';
import { Card, CardContent, CardHeader } from '../../components/ui/card';

const Contacts: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedContact, setSelectedContact] = useState<User | null>(null);

  const filteredContacts = mockUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Header title="Contacts" subtitle="Directory of all contacts" />
      
      {/* Search Bar */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Contacts Grid */}
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
                  <span>{contact.address || 'Mumbai, India'}</span>
               </div>
               <div className="pt-4 flex justify-between items-center border-t mt-4">
                  <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${
                      contact.access === 'admin' ? 'bg-red-100 text-red-700' :
                      contact.access === 'manager' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                  }`}>
                    {contact.access}
                  </span>
                  <button 
                    onClick={() => setSelectedContact(contact)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View Profile
                  </button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Modal */}
      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card w-full max-w-lg rounded-lg shadow-xl border relative animate-in fade-in zoom-in duration-200 overflow-hidden">
            {/* Modal Header Background */}
            <div className="h-24 bg-primary/10 w-full absolute top-0 left-0"></div>
            
            <button 
              onClick={() => setSelectedContact(null)}
              className="absolute top-4 right-4 z-10 p-1 bg-background/50 rounded-full hover:bg-background transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative pt-12 px-6 pb-6">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-card border-4 border-card shadow-md flex items-center justify-center text-4xl font-bold text-primary mx-auto mb-4">
                {selectedContact.name.charAt(0)}
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">{selectedContact.name}</h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
                   <Shield className="w-4 h-4" />
                   <span className="capitalize">{selectedContact.access} Account</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Email Address</p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm truncate">{selectedContact.email}</span>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Phone Number</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm">{selectedContact.phone}</span>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{selectedContact.address || 'Mumbai, India'}</span>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Member Age</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">{selectedContact.age} Years Old</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;