import React from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';
import { Input } from '../common';

const Header = ({ onMenuClick, user }) => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side - Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-text hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search Bar */}
          <div className="hidden md:block max-w-md w-full">
            <Input
              type="search"
              placeholder="Search for..."
              icon={Search}
              iconPosition="left"
              className="bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Mobile Search Button */}
          <button className="md:hidden text-text-light hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative text-text-light hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-semibold flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Profile Dropdown */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-text">Ankit Sharma</p>
              <p className="text-xs text-text-light">Frontend Developer</p>
            </div>
            <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-400 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">AS</span>
              </div>
              <ChevronDown className="w-4 h-4 text-text-light hidden sm:block" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
