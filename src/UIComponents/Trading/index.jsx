import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiRefreshCw, FiArrowLeft, FiTrendingUp, FiTrendingDown,
  FiMessageSquare, FiBriefcase, FiActivity, FiCpu,
  FiChevronLeft, FiChevronRight, FiMenu, FiX
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTradingStore } from '../../stores/tradingStore';
import { AccountCard } from './AccountCard';
import { PositionsTable } from './PositionsTable';
import { OrdersTable } from './OrdersTable';
import { ActivityFeed } from './ActivityFeed';
import { AIChat } from './AIChat';
import { QuickActions } from './QuickActions';
import { AutonomousControl } from './AutonomousControl';

// Mobile bottom nav tabs
const mobileNavItems = [
  { id: 'ai', label: 'AI', icon: FiMessageSquare },
  { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase },
  { id: 'activity', label: 'Whales', icon: FiActivity },
  { id: 'autopilot', label: 'Autopilot', icon: FiCpu },
];

// Desktop sidebar tabs
const sidebarTabs = [
  { id: 'positions', label: 'Positions' },
  { id: 'orders', label: 'Orders' },
  { id: 'activity', label: 'Whale Activity' },
  { id: 'autopilot', label: 'AI Autopilot' },
];

export function Trading() {
  const [mobileTab, setMobileTab] = useState('ai');
  const [sidebarTab, setSidebarTab] = useState('positions');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const {
    account,
    positions,
    orders,
    activity,
    chatHistory,
    isLoading,
    errors,
    fetchAccount,
    fetchPositions,
    fetchOrders,
    fetchActivity,
    refreshAll,
    cancelOrder,
    closePosition,
    sendMessage,
    clearChat,
  } = useTradingStore();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    refreshAll();
    const interval = setInterval(() => {
      fetchAccount();
      fetchPositions();
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshAll, fetchAccount, fetchPositions]);

  const handleActivityClick = (activity) => {
    const premium = activity.premium >= 1000000
      ? `$${(activity.premium / 1000000).toFixed(1)}M`
      : `$${(activity.premium / 1000).toFixed(0)}K`;
    const message = `Tell me about the unusual activity on ${activity.ticker} $${activity.strike} ${activity.optionType}. Premium was ${premium} and sentiment is ${activity.sentiment}. Should I trade this?`;
    sendMessage(message);
    if (isMobile) setMobileTab('ai');
  };

  const handleTickerClick = (ticker) => {
    sendMessage(`What's the current outlook on ${ticker}? Should I adjust my position?`);
    if (isMobile) setMobileTab('ai');
  };

  const handleQuickAction = (_action, prompt) => {
    sendMessage(prompt);
  };

  const formatCurrency = (value) => {
    if (!value && value !== 0) return '$--';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompact = (value) => {
    if (!value && value !== 0) return '$--';
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const dayPL = account ? account.equity - account.last_equity : 0;
  const dayPLPercent = account && account.last_equity > 0
    ? ((account.equity - account.last_equity) / account.last_equity) * 100
    : 0;

  // ============ MOBILE LAYOUT ============
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-body flex flex-col">
        {/* Mobile Header - Compact Account Summary */}
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link to="/" className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <FiArrowLeft size={16} />
                </Link>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">ORCAS FLOW</span>
                    {account && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/20 text-emerald-400">
                        PAPER
                      </span>
                    )}
                  </div>
                  {account && (
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-white/50">
                        {formatCompact(account.portfolio_value)}
                      </span>
                      <span className={dayPL >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {dayPL >= 0 ? '+' : ''}{formatCompact(dayPL)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={refreshAll}
                disabled={Object.values(isLoading).some(Boolean)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <FiRefreshCw size={16} className={Object.values(isLoading).some(Boolean) ? 'animate-spin' : ''} />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Content */}
        <main className="flex-1 overflow-auto pb-20">
          <AnimatePresence mode="wait">
            {mobileTab === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4 space-y-4"
              >
                <QuickActions onAction={handleQuickAction} isLoading={isLoading.chat} />
                <AIChat
                  messages={chatHistory}
                  isLoading={isLoading.chat}
                  error={errors.chat}
                  onSendMessage={sendMessage}
                  onClear={clearChat}
                />
              </motion.div>
            )}

            {mobileTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4 space-y-4"
              >
                <AccountCard
                  account={account}
                  isLoading={isLoading.account}
                  error={errors.account}
                  onRefresh={fetchAccount}
                />
                <PositionsTable
                  positions={positions}
                  isLoading={isLoading.positions}
                  error={errors.positions}
                  onClosePosition={closePosition}
                  onTickerClick={handleTickerClick}
                />
                <OrdersTable
                  orders={orders}
                  isLoading={isLoading.orders}
                  error={errors.orders}
                  onCancelOrder={cancelOrder}
                  onFetchOrders={fetchOrders}
                />
              </motion.div>
            )}

            {mobileTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4"
              >
                <ActivityFeed
                  activities={activity}
                  isLoading={isLoading.activity}
                  error={errors.activity}
                  onRefresh={fetchActivity}
                  onActivityClick={handleActivityClick}
                />
              </motion.div>
            )}

            {mobileTab === 'autopilot' && (
              <motion.div
                key="autopilot"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-4"
              >
                <AutonomousControl />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#111]/95 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
          <div className="flex justify-around py-2 px-2">
            {mobileNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = mobileTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMobileTab(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px] ${
                    isActive
                      ? 'text-emerald-400'
                      : 'text-white/40'
                  }`}
                >
                  <Icon size={22} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>
      </div>
    );
  }

  // ============ DESKTOP LAYOUT ============
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left - Logo & Nav */}
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <FiArrowLeft size={18} />
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight">ORCAS FLOW</h1>
                {account && (
                  <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {account.is_paper ? 'PAPER' : 'LIVE'}
                  </span>
                )}
              </div>
            </div>

            {/* Center - Account Stats */}
            {account && (
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Portfolio</p>
                  <p className="text-lg font-bold font-mono">{formatCurrency(account.portfolio_value)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Buying Power</p>
                  <p className="text-lg font-bold font-mono">{formatCurrency(account.buying_power)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">Day P/L</p>
                  <p className={`text-lg font-bold font-mono ${dayPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {dayPL >= 0 ? '+' : ''}{formatCurrency(dayPL)}
                    <span className="text-xs ml-1 opacity-60">
                      ({dayPLPercent >= 0 ? '+' : ''}{dayPLPercent.toFixed(2)}%)
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Right - Actions */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refreshAll}
                disabled={Object.values(isLoading).some(Boolean)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
              >
                <FiRefreshCw size={14} className={Object.values(isLoading).some(Boolean) ? 'animate-spin' : ''} />
                Refresh
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-white/10 bg-[#0a0a0a] flex flex-col overflow-hidden"
            >
              {/* Sidebar Tabs */}
              <div className="flex border-b border-white/10 bg-[#111]">
                {sidebarTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSidebarTab(tab.id)}
                    className={`flex-1 px-3 py-3 text-xs font-medium transition-all border-b-2 ${
                      sidebarTab === tab.id
                        ? 'text-white border-white bg-white/5'
                        : 'text-white/50 border-transparent hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <AnimatePresence mode="wait">
                  {sidebarTab === 'positions' && (
                    <motion.div
                      key="positions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <PositionsTable
                        positions={positions}
                        isLoading={isLoading.positions}
                        error={errors.positions}
                        onClosePosition={closePosition}
                        onTickerClick={handleTickerClick}
                        compact
                      />
                    </motion.div>
                  )}
                  {sidebarTab === 'orders' && (
                    <motion.div
                      key="orders"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <OrdersTable
                        orders={orders}
                        isLoading={isLoading.orders}
                        error={errors.orders}
                        onCancelOrder={cancelOrder}
                        onFetchOrders={fetchOrders}
                        compact
                      />
                    </motion.div>
                  )}
                  {sidebarTab === 'activity' && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ActivityFeed
                        activities={activity}
                        isLoading={isLoading.activity}
                        error={errors.activity}
                        onRefresh={fetchActivity}
                        onActivityClick={handleActivityClick}
                      />
                    </motion.div>
                  )}
                  {sidebarTab === 'autopilot' && (
                    <motion.div
                      key="autopilot"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AutonomousControl />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar Toggle */}
        <motion.button
          layout
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex-shrink-0 w-6 flex items-center justify-center bg-[#0a0a0a] border-r border-white/10 hover:bg-white/5 transition-colors"
        >
          {sidebarOpen ? <FiChevronLeft size={16} className="text-white/50" /> : <FiChevronRight size={16} className="text-white/50" />}
        </motion.button>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Quick Actions */}
          <div className="p-4 border-b border-white/10 bg-[#0a0a0a]">
            <QuickActions onAction={handleQuickAction} isLoading={isLoading.chat} />
          </div>

          {/* AI Chat */}
          <div className="flex-1 overflow-hidden">
            <AIChat
              messages={chatHistory}
              isLoading={isLoading.chat}
              error={errors.chat}
              onSendMessage={sendMessage}
              onClear={clearChat}
              fullHeight
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Trading;
