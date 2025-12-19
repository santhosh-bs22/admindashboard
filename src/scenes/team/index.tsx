import React, { useState } from 'react';
import { Search, Edit, Trash2, Filter } from 'lucide-react';
import Header from '../../components/Header';
import { mockUsers } from '../../data/mockData';

const Team: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const getAccessBadge = (access: string) => {
    const styles = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      manager: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      user: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[access as keyof typeof styles]}`}>
        {access}
      </span>
    );
  };

  return (
    <div>
      <Header title="Manage Team" subtitle="Manage your team members" />
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Add Member
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-6 font-semibold">ID</th>
                <th className="text-left py-3 px-6 font-semibold">Name</th>
                <th className="text-left py-3 px-6 font-semibold">Email</th>
                <th className="text-left py-3 px-6 font-semibold">Age</th>
                <th className="text-left py-3 px-6 font-semibold">Phone</th>
                <th className="text-left py-3 px-6 font-semibold">Access</th>
                <th className="text-left py-3 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-6">{user.id}</td>
                  <td className="py-3 px-6 font-medium">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.age}</td>
                  <td className="py-3 px-6">{user.phone}</td>
                  <td className="py-3 px-6">{getAccessBadge(user.access)}</td>
                  <td className="py-3 px-6">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-muted rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1 hover:bg-muted rounded text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

export default Team;