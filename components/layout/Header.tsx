import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Sun, Moon, Bell, User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleTheme: () => void;
  currentTheme: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleTheme, currentTheme, onLogout }) => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white dark:bg-dark-card shadow-sm h-16 flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 dark:text-gray-400 focus:outline-none">
          <Menu className="h-6 w-6" />
        </button>
        <div className="relative ml-4 hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-dark-border bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-dark-primary text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
          {currentTheme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
        </button>
        <button className="relative p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-dark-card"></span>
        </button>
        <div className="relative" ref={profileMenuRef}>
          <button onClick={() => setProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center focus:outline-none">
            <img className="h-10 w-10 rounded-full" src="https://picsum.photos/seed/admin/40/40" alt="Admin"/>
          </button>
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-border">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@victory.com</p>
              </div>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                <User className="mr-3 h-4 w-4" /> Profile
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="mr-3 h-4 w-4" /> Settings
              </a>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut className="mr-3 h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
