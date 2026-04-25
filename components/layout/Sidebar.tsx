import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserCog, BookOpen, Banknote, Library, Megaphone } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/students', icon: Users, label: 'Students' },
  { to: '/teachers', icon: UserCog, label: 'Teachers' },
  { to: '/academics', icon: BookOpen, label: 'Academics' },
  { to: '/fees', icon: Banknote, label: 'Fees' },
  { to: '/library', icon: Library, label: 'Library' },
  { to: '/communication', icon: Megaphone, label: 'Communicate' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside className={`bg-white dark:bg-dark-card shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} relative h-full`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
        <div className={`flex items-center gap-2 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
          <div className="bg-primary-500 rounded-lg p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          {isOpen && <span className="text-xl font-bold text-gray-800 dark:text-white">Victory SMS</span>}
        </div>
      </div>
      <nav className="mt-4 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.to} className="px-4 py-1">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="ml-4 font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 w-full px-4">
        <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <img className="h-10 w-10 rounded-full" src="https://picsum.photos/seed/admin/40/40" alt="Admin"/>
          {isOpen && 
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-800 dark:text-white">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">System Admin</p>
            </div>
          }
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
