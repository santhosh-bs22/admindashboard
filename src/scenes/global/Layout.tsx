import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children ? children : <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;