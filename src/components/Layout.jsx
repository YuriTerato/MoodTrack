import React from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { Home, BarChart2, ShieldAlert, Smile } from 'lucide-react';
    import { motion } from 'framer-motion';

    const Layout = ({ children }) => {
      const location = useLocation();

      const navItems = [
        { path: '/', label: 'Humor', icon: Smile },
        { path: '/history', label: 'Histórico', icon: BarChart2 },
        { path: '/crisis-support', label: 'Apoio', icon: ShieldAlert },
      ];

      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
          <header className="p-4 shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                MoodTrack
              </Link>
            </div>
          </header>

          <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
            {children}
          </main>

          <footer className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-t-md sticky bottom-0">
            <nav className="container mx-auto flex justify-around">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'
                  }`}
                >
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span className="text-xs sm:text-sm mt-1">{item.label}</span>
                </Link>
              ))}
            </nav>
          </footer>
        </div>
      );
    };

    export default Layout;