import React, { useContext, useState, useMemo } from 'react';
import { Search, Bell, Settings, User, Menu, Sun, Moon, Package, Users, Receipt, ShoppingCart } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';
// Import your mock data to search through
import { mockUsers, mockProducts, mockOrders, mockInvoices } from '../../data/mockData';
import { Link } from 'react-router-dom';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const themeContext = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  
  if (!themeContext) {
    throw new Error("Topbar must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  // Global Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();

    const results = [
      ...mockUsers.filter(u => u.name.toLowerCase().includes(query)).map(u => ({ ...u, type: 'User', icon: <Users className="h-4 w-4" />, link: '/team' })),
      ...mockProducts.filter(p => p.name.toLowerCase().includes(query)).map(p => ({ ...p, type: 'Product', icon: <Package className="h-4 w-4" />, link: '/products' })),
      ...mockOrders.filter(o => o.customerName.toLowerCase().includes(query) || o.id.toLowerCase().includes(query)).map(o => ({ ...o, name: o.customerName, type: 'Order', icon: <ShoppingCart className="h-4 w-4" />, link: '/orders' })),
      ...mockInvoices.filter(i => i.client.toLowerCase().includes(query)).map(i => ({ ...i, name: i.client, type: 'Invoice', icon: <Receipt className="h-4 w-4" />, link: '/invoices' }))
    ];

    return results.slice(0, 6); // Limit results for UI
  }, [searchQuery]);

  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-muted text-muted-foreground">
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search users, products, orders..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-80 rounded-md border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full bg-card border rounded-md shadow-lg z-50 overflow-hidden">
              {searchResults.map((result, idx) => (
                <Link 
                  key={`${result.type}-${idx}`} 
                  to={result.link}
                  onClick={() => setSearchQuery("")}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors border-b last:border-0"
                >
                  <span className="text-muted-foreground">{result.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{'name' in result ? result.name : ''}</span>
                    <span className="text-[10px] uppercase text-muted-foreground tracking-wider">{result.type}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted text-foreground transition-colors">
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="p-2 rounded-full hover:bg-muted text-muted-foreground"><Bell className="h-5 w-5" /></button>
        <button className="p-2 rounded-full hover:bg-muted text-muted-foreground"><Settings className="h-5 w-5" /></button>
        <div className="ml-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center border cursor-pointer hover:ring-2 hover:ring-ring">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;