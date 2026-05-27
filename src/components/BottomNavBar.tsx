import { CalendarDays, Home, Info } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const navItems = [
  { key: 'home' as const, label: '首頁', icon: Home },
  { key: 'itinerary' as const, label: '行程', icon: CalendarDays },
  { key: 'info' as const, label: '旅客', icon: Info }
];

export default function BottomNavBar({ activeTab, onTabChange }: BottomNavBarProps) {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-outline-variant bg-white px-4 py-3 shadow-lg">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.key;

        return (
          <button
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'fill-current' : ''}`} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
