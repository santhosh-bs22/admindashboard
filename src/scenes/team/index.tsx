import React, { useState } from 'react';
import Header from '../../components/Header';
import { mockUsers, User } from '../../data/mockData';
import { 
  UserPlus, 
  Edit2, 
  Trash2, 
  Shield, 
  ShieldCheck, 
  ShieldAlert,
  X,
  Search,
  Filter,
  Download // Import Download icon
} from 'lucide-react';

const Team: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});
  const [isEditing, setIsEditing] = useState(false);
  
  // --- Filter State ---
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // --- Handlers ---
  const handleOpenAdd = () => {
    setCurrentUser({ access: 'user', status: 'Active' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && currentUser.id) {
      setUsers(users.map((user) => 
        user.id === currentUser.id ? { ...user, ...currentUser } as User : user
      ));
    } else {
      const newUser: User = {
        ...currentUser,
        id: Math.max(...users.map(u => u.id), 0) + 1,
        age: Number(currentUser.age),
      } as User;
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  // --- Filtering Logic ---
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) || 
      user.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = roleFilter === 'All' || user.access === roleFilter;

    return matchesSearch && matchesRole;
  });

  // --- Download Functionality ---
  const handleDownload = () => {
    const headers = ["ID", "Name", "Age", "Phone", "Email", "Access", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredUsers.map(user => 
        [user.id, `"${user.name}"`, user.age, `"${user.phone}"`, user.email, user.access, user.status].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "team_members.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getAccessIcon = (access: string) => {
    if (access === 'admin') return <ShieldCheck className="w-4 h-4 mr-2" />;
    if (access === 'manager') return <ShieldAlert className="w-4 h-4 mr-2" />;
    return <Shield className="w-4 h-4 mr-2" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Header title="Manage Team" subtitle="Managing the Team Members" />
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {/* --- Filter Toolbar --- */}
      <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-lg border shadow-sm items-center">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input 
            placeholder="Search by Name or Email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 w-full bg-background border rounded-md text-sm focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Role Filter Dropdown */}
        <div className="relative w-full sm:w-48">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-9 pr-4 py-2 w-full bg-background border rounded-md text-sm focus:ring-2 focus:ring-primary appearance-none"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Download Button */}
        <button 
          onClick={handleDownload}
          className="p-2 hover:bg-muted rounded-full transition hidden sm:block" 
          title="Download CSV"
        >
          <Download className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Access</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{user.id}</td>
                    <td className="px-6 py-4 text-primary font-semibold">{user.name}</td>
                    <td className="px-6 py-4">{user.age}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center w-fit px-3 py-1 rounded-full text-xs font-semibold ${
                        user.access === 'admin' ? 'bg-green-100 text-green-700' :
                        user.access === 'manager' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getAccessIcon(user.access)}
                        {user.access}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenEdit(user)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No users found matching your filters.
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
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Member' : 'Add New Member'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input name="name" required value={currentUser.name || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <input name="age" type="number" required value={currentUser.age || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input name="phone" required value={currentUser.phone || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" required value={currentUser.email || ''} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium">Access Level</label>
                <select name="access" value={currentUser.access || 'user'} onChange={handleInputChange} className="w-full mt-1 p-2 bg-background border rounded-md focus:ring-2 focus:ring-primary">
                  <option value="user">User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">{isEditing ? 'Save Changes' : 'Add Member'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;