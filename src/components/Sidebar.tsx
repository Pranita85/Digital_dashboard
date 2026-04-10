import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Building2,
  ClipboardList,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const userNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/labs', icon: Building2, label: 'Labs & Rooms' },
    { to: '/book', icon: Calendar, label: 'Book a Lab' },
    { to: '/my-bookings', icon: ClipboardList, label: 'My Bookings' },
  ];

  const adminNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/labs', icon: Building2, label: 'Labs & Rooms' },
    { to: '/book', icon: Calendar, label: 'Book a Lab' },
    { to: '/all-bookings', icon: ClipboardList, label: 'All Bookings' },
    { to: '/users', icon: Users, label: 'User Management' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/charges', icon: CreditCard, label: 'Charges' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  'nav-link',
                  isActive && 'active'
                )}
              >
                <item.icon className={cn('h-5 w-5 shrink-0', isActive && 'text-sidebar-primary')} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <div className="p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
