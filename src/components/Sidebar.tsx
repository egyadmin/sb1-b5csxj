import React from 'react';
import { 
  LayoutDashboard, 
  Box, 
  Wrench, 
  Boxes,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Shield,
  Flag,
  Truck
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguageStore } from '../store/languageStore';
import { useAppStore } from '../store/appStore';
import LanguageToggle from './LanguageToggle';

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
}

export default function Sidebar() {
  const { language } = useLanguageStore();
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore();
  const location = useLocation();
  const isRTL = language === 'ar';

  const navItems: NavItem[] = [
    { path: '/', icon: LayoutDashboard, label: isRTL ? 'لوحة التحكم' : 'Dashboard' },
    { path: '/assets', icon: Box, label: isRTL ? 'الأصول' : 'Assets' },
    { path: '/work-orders', icon: Wrench, label: isRTL ? 'أوامر العمل' : 'Work Orders' },
    { path: '/inventory', icon: Boxes, label: isRTL ? 'المخزون' : 'Inventory' },
    { path: '/shipments', icon: Truck, label: isRTL ? 'تتبع الشحنات' : 'Shipments' },
    { path: '/local-content', icon: Flag, label: isRTL ? 'المحتوى المحلي' : 'Local Content' },
    { path: '/reports', icon: FileText, label: isRTL ? 'التقارير' : 'Reports' },
    { path: '/environmental', icon: Leaf, label: isRTL ? 'البيئة' : 'Environmental' },
    { path: '/security', icon: Shield, label: isRTL ? 'الأمن' : 'Security' },
    { path: '/settings', icon: Settings, label: isRTL ? 'الإعدادات' : 'Settings' },
  ];

  return (
    <aside className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-screen bg-gray-900 text-white transition-all duration-300 ${
      sidebarCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold">
              {isRTL ? 'نظام إدارة الأصول' : 'EAM System'}
            </h1>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            {isRTL ? 
              (sidebarCollapsed ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />) :
              (sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />)
            }
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <LanguageToggle collapsed={sidebarCollapsed} />
          <button className="flex items-center gap-2 w-full p-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg mt-2">
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && (
              <span>{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}