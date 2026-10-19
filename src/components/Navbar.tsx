import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Check,
  User,
  LogOut,
  RefreshCw,
  Calendar,
  Users,
  GraduationCap,
  Megaphone,
  Radio,
  FileText,
  BarChart3,
  Smartphone,
  ShieldCheck,
  Award,
  Database
} from 'lucide-react';

interface NavbarProps {
  onOpenLoginModal: () => void;
  onOpenIntakeModal: () => void;
  onOpenBroadcastModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLoginModal,
  onOpenIntakeModal,
  onOpenBroadcastModal,
}) => {
  const {
    currentUser,
    activeView,
    setActiveView,
    notifications,
    accounts,
    switchAccount,
    logout,
    isPushActive,
    togglePushNotifications,
    resetDatabase,
    isIntakeOpen,
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // Unread notifications for current parent or all recent for admin
  const unreadCount = currentUser.role === 'parent' && currentUser.parentId
    ? notifications.filter((n) => !n.readByParentIds.includes(currentUser.parentId!)).length
    : notifications.slice(0, 3).length;

  return (
    <header className="sticky top-0 z-40 bg-[#0b2545] text-white border-b border-blue-900/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: University Brand element */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-0.5 shadow-md border-2 border-amber-400">
              <img
                src="/src/assets/images/regenerated_image_1792130220954.png"
                alt="ISAT U Seal"
                className="w-full h-full object-contain rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <button
              onClick={() => setActiveView(currentUser.role === 'parent' ? 'dashboard' : 'parents')}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white text-base sm:text-lg group-hover:text-amber-300 transition-colors whitespace-nowrap">
                  ISAT U Parent Link
                </span>
                <span className="hidden sm:inline-block text-[11px] font-medium bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30 uppercase tracking-wider">
                  PGWBMS
                </span>
              </div>
              <p className="text-[11px] text-blue-200 hidden md:block tracking-wide">
                Parents’ Affairs and Relations (PAR) Office
              </p>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-blue-100">
            {currentUser.role === 'parent' ? (
              <>
                <button
                  onClick={() => setActiveView('dashboard')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'dashboard'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  Guidance & QF-PAR-01
                </button>
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    setTimeout(() => {
                      const el = document.getElementById('child-schedule-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 hover:text-white hover:bg-white/5 text-blue-100"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  Child Schedule
                </button>
                <button
                  onClick={() => setActiveView('needs_assessment')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'needs_assessment'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-300" />
                  Needs Assessment
                </button>
                <button
                  onClick={() => setActiveView('sms_gateway')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'sms_gateway'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-300" />
                  SMS Advisories
                </button>
                <button
                  onClick={() => setActiveView('involvement')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'involvement'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users className="w-4 h-4 text-blue-300" />
                  PTA Involvement
                </button>
                <button
                  onClick={() => setActiveView('events')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'events'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  School Events
                </button>
                <button
                  onClick={() => setActiveView('consultations')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'consultations'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  Consultations
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveView('parents')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'parents'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Database className="w-4 h-4 text-amber-300" />
                  Database (QF-PAR-01)
                </button>
                <button
                  onClick={() => setActiveView('needs_assessment')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'needs_assessment'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-300" />
                  Needs Assessment (QP-PAR 02)
                </button>
                <button
                  onClick={() => setActiveView('sms_gateway')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'sms_gateway'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-300" />
                  SMS Center
                </button>
                <button
                  onClick={() => setActiveView('academics')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'academics'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-blue-300" />
                  Guidance Records
                </button>
                <button
                  onClick={() => setActiveView('events')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'events'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-purple-300" />
                  Events
                </button>
                <button
                  onClick={() => setActiveView('iso_evaluation')}
                  className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    activeView === 'iso_evaluation'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-300" />
                  ISO 25010 Quality
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Push Notification Toggle */}
            <button
              onClick={togglePushNotifications}
              title={isPushActive ? 'Push notifications active' : 'Click to enable automated push alerts'}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                isPushActive
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/60'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isPushActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">
                {isPushActive ? 'Push Active' : 'Push Muted'}
              </span>
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 relative transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center tabular-nums">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        ISAT U Automated Updates
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Push & Email dispatches for parents
                      </p>
                    </div>
                    {currentUser.role !== 'parent' && (
                      <button
                        onClick={() => {
                          setShowNotifDropdown(false);
                          onOpenBroadcastModal();
                        }}
                        className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                      >
                        + Send New
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 4).map((notif) => {
                      const isRead = currentUser.parentId
                        ? notif.readByParentIds.includes(currentUser.parentId)
                        : true;
                      return (
                        <div
                          key={notif.id}
                          className={`p-3 text-left transition-colors hover:bg-slate-50 cursor-pointer ${
                            !isRead ? 'bg-amber-50/50' : ''
                          }`}
                          onClick={() => {
                            setShowNotifDropdown(false);
                            setActiveView('notifications');
                          }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-900 line-clamp-1">
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                              {notif.sentAt.split(' ')[0]}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                            {notif.body}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-500">
                            <span className="uppercase text-[9px] font-semibold tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                              {notif.channel}
                            </span>
                            <span>{notif.recipientCount} recipients</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setShowNotifDropdown(false);
                        setActiveView('notifications');
                      }}
                      className="text-xs font-medium text-blue-700 hover:text-blue-900"
                    >
                      View All Dispatches ({notifications.length})
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action for Admin */}
            {currentUser.role !== 'parent' ? (
              <button
                onClick={onOpenIntakeModal}
                className="hidden sm:inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-3 py-1.5 text-xs rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
              >
                + Register Parent
              </button>
            ) : null}

            {/* Account Switcher / User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-2.5 py-1.5 rounded-lg border border-white/10 transition-colors text-left"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-blue-200 capitalize">
                    {currentUser.role === 'parent'
                      ? 'Parent / Guardian'
                      : currentUser.role === 'mis_edp'
                      ? 'MIS/EDP Office'
                      : currentUser.role}
                  </div>
                </div>
              </button>

              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                    <div className="mt-1">
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800 tracking-wider">
                        {currentUser.role === 'parent'
                          ? 'Parent Portal View (Read-Only)'
                          : currentUser.role === 'mis_edp'
                          ? 'MIS / EDP Controller'
                          : `${currentUser.role} Control`}
                      </span>
                    </div>
                  </div>

                  {/* Switch Role Fast Bar */}
                  <div className="px-3 py-2">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1 px-1">
                      Switch Demo Identity
                    </div>
                    <div className="space-y-1">
                      {accounts.map((acc) => {
                        const isCurrent = acc.id === currentUser.id;
                        return (
                          <button
                            key={acc.id}
                            onClick={() => {
                              switchAccount(acc);
                              setShowAccountMenu(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              isCurrent ? 'bg-blue-50 text-blue-900 font-semibold' : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <div className="truncate">
                              <div>{acc.name}</div>
                              <div className="text-[10px] text-slate-400 capitalize">
                                {acc.role === 'parent' ? 'Parent' : acc.title || acc.role}
                              </div>
                            </div>
                            {isCurrent && <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-1 px-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowAccountMenu(false);
                        onOpenLoginModal();
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      Sign In with Custom Email
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Reset ISAT U portal database back to fresh default demo state?')) {
                          resetDatabase();
                          setShowAccountMenu(false);
                        }
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-amber-700 hover:bg-amber-50 rounded-lg flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                      Reset Database to Initial
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowAccountMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
