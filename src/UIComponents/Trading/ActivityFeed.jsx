import { motion } from 'framer-motion';
import { FiRefreshCw, FiTrendingUp, FiTrendingDown, FiMinus, FiAlertCircle, FiZap, FiActivity } from 'react-icons/fi';

export function ActivityFeed({ activities, isLoading, error, onRefresh, onActivityClick }) {
  const formatPremium = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return <FiTrendingUp className="text-emerald-400" size={12} />;
      case 'bearish':
        return <FiTrendingDown className="text-red-400" size={12} />;
      default:
        return <FiMinus className="text-white/50" size={12} />;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'bullish':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'bearish':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-white/10 text-white/50';
    }
  };

  if (error) {
    return (
      <div className="rounded-xl bg-[#111] border border-white/10 p-5 h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Activity</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FiRefreshCw size={14} />
          </motion.button>
        </div>
        <div className="flex items-center gap-2 text-red-400">
          <FiAlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#111] border border-white/10 p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiActivity className="text-amber-400" size={18} />
          <h2 className="text-lg font-bold text-white">Whale Activity</h2>
          {activities.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-amber-500/20 text-amber-400">
              {activities.length}
            </span>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <FiRefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
        </motion.button>
      </div>

      {isLoading && activities.length === 0 ? (
        <div className="space-y-2 flex-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse h-16 bg-white/5 rounded-lg"></div>
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FiActivity size={32} className="mx-auto mb-3 text-white/20" />
            <p className="text-white/50 text-sm">No unusual activity</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2 flex-1 overflow-y-auto max-h-[600px] pr-1">
          {activities.map((activity, index) => (
            <motion.button
              key={activity._id || activity.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onActivityClick?.(activity)}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all group border border-transparent hover:border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSentimentIcon(activity.sentiment)}
                  <span className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
                    {activity.ticker}
                  </span>
                  <span className="text-[10px] text-white/40">
                    ${activity.strike} {activity.optionType?.charAt(0).toUpperCase() || '?'}
                  </span>
                </div>
                <span className="text-[10px] text-white/40">{formatTime(activity.detectedAt)}</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-bold font-mono text-amber-400">
                  {formatPremium(activity.premium)}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${getSentimentColor(activity.sentiment)}`}>
                  {activity.sentiment}
                </span>
                {activity.isSweep && (
                  <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400">
                    <FiZap size={8} />
                    sweep
                  </span>
                )}
                {activity.isBlockTrade && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                    block
                  </span>
                )}
              </div>

              {activity.volumeRatio > 1.5 && (
                <p className="text-[10px] text-emerald-400/70 mt-1">
                  {activity.volumeRatio.toFixed(1)}x normal volume
                </p>
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
