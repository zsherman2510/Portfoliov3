import { motion } from 'framer-motion';
import { FiRefreshCw, FiAlertCircle, FiDollarSign, FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export function AccountCard({ account, isLoading, error, onRefresh }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const dayPL = account ? account.equity - account.last_equity : 0;
  const dayPLPercent = account && account.last_equity > 0
    ? ((account.equity - account.last_equity) / account.last_equity) * 100
    : 0;

  if (error) {
    return (
      <div className="rounded-xl bg-[#111] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Account</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FiRefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </motion.button>
        </div>
        <div className="flex items-center gap-2 text-red-400">
          <FiAlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (isLoading && !account) {
    return (
      <div className="rounded-xl bg-[#111] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Account</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-white/10 rounded w-16 mb-2"></div>
              <div className="h-6 bg-white/10 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="rounded-xl bg-[#111] border border-white/10 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Account</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FiRefreshCw size={16} />
          </motion.button>
        </div>
        <p className="text-white/50 text-sm">No account data</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#111] border border-white/10 p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white">Account</h2>
          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {account.pattern_day_trader ? 'LIVE' : 'PAPER'}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <FiRefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20">
            <FiDollarSign className="text-blue-400" size={18} />
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Cash</p>
            <p className="text-base font-bold font-mono text-white">{formatCurrency(account.cash)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <FiActivity className="text-purple-400" size={18} />
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Buying Power</p>
            <p className="text-base font-bold font-mono text-white">{formatCurrency(account.buying_power)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20">
            <FiTrendingUp className="text-cyan-400" size={18} />
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Portfolio</p>
            <p className="text-base font-bold font-mono text-white">{formatCurrency(account.portfolio_value)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${dayPL >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
            {dayPL >= 0 ? (
              <FiTrendingUp className="text-emerald-400" size={18} />
            ) : (
              <FiTrendingDown className="text-red-400" size={18} />
            )}
          </div>
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-wide">Day P/L</p>
            <p className={`text-base font-bold font-mono ${dayPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {dayPL >= 0 ? '+' : ''}{formatCurrency(dayPL)}
              <span className="text-xs ml-1 opacity-70">({dayPLPercent.toFixed(2)}%)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
