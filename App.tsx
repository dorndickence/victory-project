import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import AcademicsPage from './pages/AcademicsPage';
import FeesPage from './pages/FeesPage';
import LibraryPage from './pages/LibraryPage';
import CommunicationPage from './pages/CommunicationPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AIAssistant from './components/ai/AIAssistant';

// This component wraps the main application layout
const AppLayout: React.FC<{
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}> = ({ onLogout, theme, toggleTheme, isSidebarOpen, toggleSidebar }) => (
  <div className="flex h-screen bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-dark-text">
    <Sidebar isOpen={isSidebarOpen} />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header
        toggleSidebar={toggleSidebar}
        toggleTheme={toggleTheme}
        currentTheme={theme}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-dark-bg p-4 sm:p-6 md:p-8 relative">
        {/* Nested routes for the authenticated part of the app */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          {/* A fallback for any other authenticated route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <AIAssistant />
      </main>
    </div>
  </div>
);

// This component handles the routing logic
const AppRoutes: React.FC = () => {
  // Check localStorage once on initial load
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('isAuthenticated'));
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  
  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!isAuthenticated ? <SignUpPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
      <Route path="/*" element={
        isAuthenticated ? (
          <AppLayout 
            onLogout={handleLogout}
            theme={theme}
            toggleTheme={toggleTheme}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        ) : (
          <Navigate to="/login" replace />
        )
      }/>
    </Routes>
  );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;