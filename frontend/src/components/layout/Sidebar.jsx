import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  FileEdit, 
  Map, 
  Settings,
  User
} from 'lucide-react';
import Badge from '../common/Badge';

const Sidebar = ({ isOpen, onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Job Search', href: '/jobs', icon: Search },
    { name: 'Applications', href: '/applications', icon: FileText, badge: 7 },
    { name: 'Resume Builder', href: '/resume', icon: FileEdit },
    { name: 'Learning Path', href: '/roadmaps', icon: Map },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-30 h-screen w-64 
          bg-primary text-white 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-6">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">CareerOS</h1>
              <p className="text-xs text-blue-200">The Operating System for</p>
              <p className="text-xs text-blue-200">Your Career</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 custom-scrollbar overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white bg-opacity-20 text-white shadow-md'
                      : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <Badge 
                    variant="error" 
                    size="sm" 
                    className="ml-auto bg-red-500 text-white border-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </NavLink>
            ))}
          </nav>

          {/* User Profile Card */}
          <div className="p-4 border-t border-white border-opacity-20">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white bg-opacity-10 cursor-pointer hover:bg-opacity-20 transition-all">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Ankit Sharma 🇮🇳</p>
                <p className="text-xs text-blue-200 truncate">Frontend Developer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
