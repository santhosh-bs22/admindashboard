import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Contact, Receipt, User, Calendar, 
  HelpCircle, BarChart2, PieChart, TrendingUp, Map,
  ShoppingBag, ShoppingCart // Added new icons
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', path: '/', icon: Home },
    { title: 'Manage Team', path: '/team', icon: Users },
    { title: 'Contacts', path: '/contacts', icon: Contact },
    { title: 'Invoices', path: '/invoices', icon: Receipt },
    // --- New E-commerce Sections ---
    { title: 'Products', path: '/products', icon: ShoppingBag },
    { title: 'Orders', path: '/orders', icon: ShoppingCart },
    // -------------------------------
    { title: 'Profile Form', path: '/form', icon: User },
    { title: 'Calendar', path: '/calendar', icon: Calendar },
    { title: 'FAQ Page', path: '/faq', icon: HelpCircle },
    { title: 'Bar Chart', path: '/bar', icon: BarChart2 },
    { title: 'Pie Chart', path: '/pie', icon: PieChart },
    { title: 'Line Chart', path: '/line', icon: TrendingUp },
    { title: 'Geography', path: '/geography', icon: Map },
  ];

  return (
    <aside 
      className={cn(
        "bg-card border-r shadow-sm transition-all duration-300 ease-in-out flex flex-col z-40 h-full",
        "fixed inset-y-0 left-0 md:relative", 
        isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      {/* Brand Logo */}
      <div className="h-16 flex items-center justify-center border-b px-4">
        {isOpen ? (
           <h2 className="text-xl font-bold tracking-wider uppercase text-primary">ADMINIS</h2>
        ) : (
           <h2 className="text-xl font-bold text-primary">A</h2>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
              className={cn(
                "flex items-center px-6 py-3 text-sm font-medium transition-colors relative",
                isActive 
                  ? "text-primary bg-primary/10 border-r-4 border-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                !isOpen && "md:justify-center md:px-2" 
              )}
            >
              <item.icon className={cn("h-5 w-5", isOpen && "mr-3")} />
              {isOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t">
        <div className={cn("flex items-center", !isOpen && "md:justify-center")}>
           <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
             A
           </div>
           {isOpen && (
             <div className="ml-3 overflow-hidden">
               <p className="text-sm font-medium truncate">Admin User</p>
               <p className="text-xs text-muted-foreground truncate">admin@test.com</p>
             </div>
           )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;