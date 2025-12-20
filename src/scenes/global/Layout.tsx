import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      {/* Sidebar (Left) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area (Right) */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* SCROLLABLE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-slate-900/50">
           {/* THIS IS WHERE THE DASHBOARD/TEAM/CONTACTS PAGES RENDER */}
           <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;