import React, { useContext } from 'react';
import { Search, Bell, Settings, User, Menu, Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../contexts/ThemeContext';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error("Topbar must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <header className="h-16 bg-card border-b flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Left Side: Toggle & Search */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-md hover:bg-muted text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="h-9 w-64 rounded-md border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Right Side: Icons & Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-muted text-foreground transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        
        <button className="p-2 rounded-full hover:bg-muted text-muted-foreground">
          <Bell className="h-5 w-5" />
        </button>
        
        <button className="p-2 rounded-full hover:bg-muted text-muted-foreground">
          <Settings className="h-5 w-5" />
        </button>
        
        <div className="ml-2 h-8 w-8 rounded-full bg-muted flex items-center justify-center border cursor-pointer hover:ring-2 hover:ring-ring">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;