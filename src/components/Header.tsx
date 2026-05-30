import React from 'react';
import { Sun, Moon, Wallet, Shield, Layers, HelpCircle, LogOut, Menu, X, Bell } from 'lucide-react';
import { User, SystemNotification } from '../types';

interface HeaderProps {
  user: User | null;
  onOpenWallet: () => void;
  onOpenNotifications: () => void;
  notifications: SystemNotification[];
  adminView: boolean;
  setAdminView: (val: boolean) => void;
  onLogout: () => void;
  onLogin: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({
  user,
  onOpenWallet,
  onOpenNotifications,
  notifications,
  adminView,
  setAdminView,
  onLogout,
  onLogin,
  activeTab,
  setActiveTab,
  darkMode,
  toggleDarkMode
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full transition-all border-b glass-panel duration-150 shadow-xs" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Right Section: Logo and Navigation Links */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => { setActiveTab('home'); setAdminView(false); }}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
                <span className="font-mono text-xl font-black italic tracking-tighter">N</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black tracking-tight text-slate-800 dark:text-slate-100 block">نکس‌‌ایمیج</span>
                <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-mono">NexImage Downloader</span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => { setActiveTab('home'); setAdminView(false); }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'home' && !adminView
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                صفحه اصلی
              </button>
              <button
                onClick={() => { setActiveTab('converter'); setAdminView(false); }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'converter' && !adminView
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                مبدل لینک هوشمند
              </button>
              <button
                onClick={() => { setActiveTab('archive'); setAdminView(false); }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeTab === 'archive' && !adminView
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                کاتالوگ طرح‌ها
              </button>
              {user && (
                <button
                  onClick={() => { setActiveTab('tickets'); setAdminView(false); }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activeTab === 'tickets' && !adminView
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  پشتیبانی و تیکت‌ها
                </button>
              )}
            </nav>
          </div>

          {/* Left Section: User Actions & Utilities */}
          <div className="flex items-center gap-3">
            
            {/* Dark & Light Theme Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-350 transition-all cursor-pointer focus:outline-none"
              title={darkMode ? "حالت روشن" : "حالت تاریک"}
              id="theme-toggle-btn"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-500 animate-[spin_10s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Notifications Menu */}
            <button
              onClick={onOpenNotifications}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-350 transition-all cursor-pointer focus:outline-none relative"
              title="اطلاعیه‌ها"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Admin View Switcher */}
            {user && user.isAdmin && (
              <button
                onClick={() => setAdminView(!adminView)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  adminView
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10'
                    : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>{adminView ? 'خروج از پنل مدیریت' : 'پنل مدیریت'}</span>
              </button>
            )}

            {/* Wallet Quick Action */}
            {user && (
              <button
                onClick={onOpenWallet}
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 rounded-xl text-emerald-600 dark:text-emerald-400 font-extrabold text-xs transition-all cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-950/70"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span className="font-mono">{user.walletCoins}</span>
                <span>کوین</span>
              </button>
            )}

            {/* User profile dropdown or login */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setActiveTab('dashboard'); setAdminView(false); }}
                  className="w-10 h-10 rounded-full border border-emerald-500/20 overflow-hidden cursor-pointer"
                  title="داشبورد من"
                >
                  <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                </button>
                <button
                  onClick={onLogout}
                  className="hidden md:flex p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                  title="خروج از حساب"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm"
              >
                ورود / ثبت نام
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu Options */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 space-y-2 text-right">
          <button
            onClick={() => { setActiveTab('home'); setAdminView(false); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block ${
              activeTab === 'home' && !adminView ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'text-slate-750 dark:text-slate-300'
            }`}
          >
            صفحه اصلی
          </button>
          <button
            onClick={() => { setActiveTab('converter'); setAdminView(false); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block ${
              activeTab === 'converter' && !adminView ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'text-slate-750 dark:text-slate-300'
            }`}
          >
            مبدل لینک هوشمند
          </button>
          <button
            onClick={() => { setActiveTab('archive'); setAdminView(false); setMobileMenuOpen(false); }}
            className={`w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block ${
              activeTab === 'archive' && !adminView ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'text-slate-750 dark:text-slate-300'
            }`}
          >
            کاتالوگ طرح‌ها
          </button>
          {user && (
            <>
              <button
                onClick={() => { setActiveTab('tickets'); setAdminView(false); setMobileMenuOpen(false); }}
                className={`w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block ${
                  activeTab === 'tickets' && !adminView ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'text-slate-750 dark:text-slate-300'
                }`}
              >
                پشتیبانی و تیکت‌ها
              </button>
              <button
                onClick={() => { setActiveTab('dashboard'); setAdminView(false); setMobileMenuOpen(false); }}
                className={`w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block ${
                  activeTab === 'dashboard' && !adminView ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400' : 'text-slate-750 dark:text-slate-300'
                }`}
              >
                داشبورد حساب من
              </button>
              <button
                onClick={() => { onOpenWallet(); setMobileMenuOpen(false); }}
                className="w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20"
              >
                کیف پول: {user.walletCoins} کوین
              </button>
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="w-full text-right px-4 py-2.5 rounded-xl text-xs font-extrabold block text-red-500 bg-red-50 dark:bg-red-950/20"
              >
                خروج از سیستم
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
