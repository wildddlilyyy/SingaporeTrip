import { CalendarRange, Lock, UserRound } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isUnlocked: boolean;
  onLock: () => void;
}

export default function Header({ activeTab, onTabChange, isUnlocked, onLock }: HeaderProps) {
  const titles: Record<ActiveTab, string> = {
    home: '2026 新加坡旅遊',
    itinerary: '每日行程',
    info: '旅客資訊'
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant bg-white/90 px-4 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        <CalendarRange className="h-6 w-6 shrink-0 text-primary" />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-extrabold tracking-tight text-primary md:text-xl">
            {titles[activeTab]}
          </h1>
          <p className="text-[11px] font-semibold text-on-surface-variant">2026/7/22 - 2026/7/25</p>
        </div>
      </div>

      {activeTab === 'info' && isUnlocked ? (
        <button
          onClick={onLock}
          className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-2 text-xs font-bold text-white transition hover:bg-secondary/90"
        >
          <Lock className="h-3.5 w-3.5" />
          鎖定
        </button>
      ) : (
        <button
          onClick={() => onTabChange('info')}
          className="rounded-full p-2 text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary"
          title="旅客資訊"
        >
          <UserRound className="h-6 w-6" />
        </button>
      )}
    </header>
  );
}
