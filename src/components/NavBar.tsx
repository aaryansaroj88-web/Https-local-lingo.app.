import React from 'react';
import { useApp } from '../context/AppContext';
import { getCourseLabel } from '../types';
import { 
  Compass, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Settings, 
  Flame, 
  LogOut, 
  User as UserIcon,
  ShieldAlert,
  Wifi,
  WifiOff,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'motion/react';

interface NavBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    user, 
    profile, 
    isAdmin, 
    loginAnonymously, 
    logout, 
    selectedLanguage, 
    updateProfileLanguage,
    isOnline,
    offlineMode,
    setOfflineMode,
    theme,
    isDarkMode,
    toggleTheme
  } = useApp();

  const navItems = [
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'dashboard', label: 'Dashboard', icon: Award },
    { id: 'tutor', label: 'AI Tutor', icon: MessageSquare },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: ShieldAlert });
  } else {
    navItems.push({ id: 'login', label: 'Sign In', icon: UserIcon });
  }

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="flex cursor-pointer items-center space-x-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-100 dark:shadow-none">
            <Compass className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:block">
            Lingo<span className="text-emerald-500 dark:text-emerald-400">Local</span>
          </span>
        </div>

        {/* Navigation Tabs */}
        {user && (
          <nav className="hidden space-x-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative flex items-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-emerald-600 dark:text-emerald-400' 
                      : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 h-4.5 w-4.5" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Action Controls & User Auth Section */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* Theme Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer shadow-sm"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Night Mode"}
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-amber-300 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {user ? (
            <>
              {/* Language Selector */}
              <div className="relative hidden sm:block">
                <select
                  value={selectedLanguage}
                  onChange={(e) => updateProfileLanguage(e.target.value)}
                  className="appearance-none rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 px-3 py-1.5 pr-8 text-xs font-semibold text-gray-700 dark:text-slate-200 outline-none transition-all hover:border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="marathi">Marathi (मराठी)</option>
                  <option value="hindi">Hindi (हिंदी)</option>
                  <option value="english">English (Eng)</option>
                  <option value="gujarati">Gujarati (ગુજરાતી)</option>
                  <option value="marwadi">Marwadi (मारवाड़ी)</option>
                  <option value="tamil">Tamil (தமிழ்)</option>
                  <option value="telugu">Telugu (తెలుగు)</option>
                  <option value="kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="bengali">Bengali (বাংলা)</option>
                  <option value="punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="malayalam">Malayalam (മലയാളം)</option>
                  <option value="sanskrit">Sanskrit (संस्कृत)</option>
                  <option value="spanish">Spanish (Español)</option>
                  <option value="french">French (Français)</option>
                  <option value="german">German (Deutsch)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-slate-400">
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Connection Status Indicator */}
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`flex items-center space-x-1.5 rounded-xl px-2.5 py-1.5 text-xs font-extrabold transition-all shadow-sm cursor-pointer ${
                  (offlineMode || !isOnline)
                    ? 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 shadow-red-100 dark:shadow-none hover:bg-red-100'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-emerald-100 dark:shadow-none hover:bg-emerald-100'
                }`}
                title={
                  offlineMode 
                    ? "Offline Mode Simulated (Click to Go Online)" 
                    : !isOnline 
                    ? "Browser is Offline (Click to Go Online)" 
                    : "Online Connection (Click to Go Offline / Simulate Offline)"
                }
              >
                {(offlineMode || !isOnline) ? (
                  <>
                    <WifiOff className="h-4 w-4 text-red-500 animate-pulse" />
                    <span className="hidden sm:inline">Offline</span>
                  </>
                ) : (
                  <>
                    <Wifi className="h-4 w-4 text-emerald-500" />
                    <span className="hidden sm:inline">Connected</span>
                  </>
                )}
              </button>

              {/* Daily Streak Indicator */}
              {profile && (
                <div className="flex items-center space-x-1 rounded-xl bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 shadow-sm shadow-orange-100 dark:shadow-none">
                  <Flame className="h-4.5 w-4.5 fill-current" />
                  <span>{profile.dailyStreak}</span>
                </div>
              )}

              {/* Admin Badge */}
              {isAdmin && (
                <button
                  onClick={() => setCurrentTab('admin')}
                  className="hidden lg:flex items-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-3 py-1.5 text-xs font-black text-white shadow-sm transition-all"
                  title="Super Admin: aaryansaroj88@gmail.com"
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-100" />
                  <span>Admin Mode</span>
                </button>
              )}

              {/* User Dropdown Action */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  title="View Profile Dashboard"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="avatar" 
                      className="h-9 w-9 rounded-xl object-cover border border-emerald-100 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <UserIcon className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={logout}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentTab('login')}
                className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-100 dark:shadow-none hover:bg-emerald-600 active:scale-95 transition-all cursor-pointer"
              >
                <UserIcon className="h-4 w-4" />
                <span>Sign In / Admin</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      {user && (
        <div className="flex border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-1 md:hidden justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 text-xs font-medium transition-colors w-16 ${
                  isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-400 dark:text-slate-500'
                }`}
              >
                <Icon className="h-5 w-5 mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
