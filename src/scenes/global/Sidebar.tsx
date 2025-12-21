import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Contact, Receipt, User, Calendar, 
  HelpCircle, BarChart2, PieChart, TrendingUp,
  ShoppingBag, ShoppingCart
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const menuGroups = [
  {
    label: "Main",
    items: [{ title: 'Dashboard', path: '/', icon: Home }]
  },
  {
    label: "E-Commerce",
    items: [
      { title: 'Products', path: '/products', icon: ShoppingBag },
      { title: 'Orders', path: '/orders', icon: ShoppingCart },
      { title: 'Invoices', path: '/invoices', icon: Receipt },
    ]
  },
  {
    label: "Data & Team",
    items: [
      { title: 'Manage Team', path: '/team', icon: Users },
      { title: 'Contacts', path: '/contacts', icon: Contact },
    ]
  },
  {
    label: "Charts",
    items: [
      { title: 'Bar Chart', path: '/bar', icon: BarChart2 },
      { title: 'Pie Chart', path: '/pie', icon: PieChart },
      { title: 'Line Chart', path: '/line', icon: TrendingUp },
    ]
  },
  {
    label: "Pages",
    items: [
      { title: 'Profile Form', path: '/form', icon: User },
      { title: 'Calendar', path: '/calendar', icon: Calendar },
      { title: 'FAQ Page', path: '/faq', icon: HelpCircle },
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <aside className={cn(
      "bg-card border-r shadow-sm transition-all duration-300 ease-in-out flex flex-col z-40 h-full fixed inset-y-0 left-0 md:relative", 
      isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:translate-x-0 md:w-20"
    )}>
      <div className="h-16 flex items-center justify-between px-6 border-b">
        <h2 className={cn("font-bold tracking-wider text-primary", isOpen ? "text-xl" : "text-2xl")}>
          {isOpen ? "ADMINIS" : "A"}
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.label}>
            {isOpen && <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.label}</p>}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      !isOpen && "md:justify-center"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5 shrink-0", isOpen && "mr-3")} />
                    {isOpen && <span>{item.title}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t bg-muted/30">
        <div className={cn("flex items-center", !isOpen && "md:justify-center")}>
           <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">A</div>
           {isOpen && (
             <div className="ml-3 overflow-hidden">
               <p className="text-sm font-bold truncate">Admin User</p>
               <p className="text-xs text-muted-foreground truncate">admin@test.com</p>
             </div>
           )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;