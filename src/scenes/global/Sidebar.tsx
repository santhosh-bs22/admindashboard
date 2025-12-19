import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, Users, Phone, FileText, Calendar, HelpCircle, BarChart3, PieChart, LineChart, Map } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/team', icon: Users, label: 'Team' },
    { to: '/contacts', icon: Phone, label: 'Contacts' },
    { to: '/invoices', icon: FileText, label: 'Invoices' },
    { to: '/form', icon: FileText, label: 'Profile Form' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/faq', icon: HelpCircle, label: 'FAQ' },
  ];

  const chartItems = [
    { to: '/bar', icon: BarChart3, label: 'Bar Chart' },
    { to: '/pie', icon: PieChart, label: 'Pie Chart' },
    { to: '/line', icon: LineChart, label: 'Line Chart' },
    { to: '/geography', icon: Map, label: 'Geography' },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out lg:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <div className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Main
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Charts
            </div>
            {chartItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  <li className="mb-2 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Main
                  </li>
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) => cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
                  Charts
                </div>
                <ul className="-mx-2 mt-2 space-y-1">
                  {chartItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) => cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                          isActive
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;