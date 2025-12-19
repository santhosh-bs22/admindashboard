import React, { useState } from 'react';
import { Search, Bell, Settings, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-10 pr-3 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">
            <Settings className="h-5 w-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" />
          <div className="flex items-center gap-x-3">
            <img
              className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;