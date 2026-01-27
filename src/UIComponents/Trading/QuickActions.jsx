import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiEye, FiDollarSign, FiZap } from 'react-icons/fi';
import { RiSparklingFill } from 'react-icons/ri';
import { useTradingStore } from '../../stores/tradingStore';

const actions = [
  {
    id: 'find-trades',
    label: 'Find Trades',
    icon: FiSearch,
    prompt: 'Find me options trades that look good based on unusual activity. Focus on high-conviction setups with good risk/reward.',
    color: 'emerald',
  },
  {
    id: 'review-positions',
    label: 'Review Positions',
    icon: FiEye,
    prompt: 'Review my current positions and tell me if I should take profits, hold, or cut losses on any of them.',
    color: 'blue',
  },
  {
    id: 'reprice-orders',
    label: 'Reprice Orders',
    icon: FiDollarSign,
    prompt: 'Look at my open orders and tell me if any prices need to be adjusted based on current market conditions.',
    color: 'amber',
  },
  {
    id: 'market-analysis',
    label: "What's Hot",
    icon: RiSparklingFill,
    prompt: "What tickers are showing the most unusual activity right now? Give me your top 3 picks and why they're interesting.",
    color: 'purple',
  },
];

export function QuickActions({ onAction, isLoading }) {
  const [activeAction, setActiveAction] = useState(null);
  const [bestTradeLoading, setBestTradeLoading] = useState(false);
  const makeBestTrade = useTradingStore((state) => state.makeBestTrade);

  const handleClick = (id, prompt) => {
    if (isLoading) return;
    setActiveAction(id);
    onAction(id, prompt);
  };

  const handleMakeBestTrade = async () => {
    if (isLoading || bestTradeLoading) return;
    setBestTradeLoading(true);
    setActiveAction('best-trade');
    try {
      await makeBestTrade({
        risk_tolerance: 'medium',
        max_position_size: 1000,
      });
    } catch (error) {
      console.error('Best trade error:', error);
    } finally {
      setBestTradeLoading(false);
      setActiveAction(null);
    }
  };

  const getColorClasses = (color, isActive) => {
    const colorMap = {
      emerald: {
        base: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        hover: 'hover:bg-emerald-500/20 hover:border-emerald-500/40',
        active: 'bg-emerald-500/30 border-emerald-500/50',
      },
      blue: {
        base: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        hover: 'hover:bg-blue-500/20 hover:border-blue-500/40',
        active: 'bg-blue-500/30 border-blue-500/50',
      },
      amber: {
        base: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        hover: 'hover:bg-amber-500/20 hover:border-amber-500/40',
        active: 'bg-amber-500/30 border-amber-500/50',
      },
      purple: {
        base: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        hover: 'hover:bg-purple-500/20 hover:border-purple-500/40',
        active: 'bg-purple-500/30 border-purple-500/50',
      },
    };

    const colors = colorMap[color] || colorMap.emerald;
    return isActive ? colors.active : `${colors.base} ${colors.hover}`;
  };

  const isBestTradeActive = activeAction === 'best-trade' && (isLoading || bestTradeLoading);

  return (
    <div className="flex flex-wrap gap-2">
      {/* Make Best Trade - Primary CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleMakeBestTrade}
        disabled={isLoading || bestTradeLoading}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border-2 transition-all disabled:cursor-not-allowed
          ${isBestTradeActive
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 border-amber-400 text-black'
            : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400 hover:from-amber-500/30 hover:to-orange-500/30 hover:border-amber-500/60'
          }`}
      >
        {isBestTradeActive ? (
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <FiZap size={16} />
        )}
        Make Best Trade
      </motion.button>

      {/* Separator */}
      <div className="w-px h-8 bg-white/10 mx-1 self-center" />

      {/* Other Actions */}
      {actions.map((action) => {
        const Icon = action.icon;
        const isActive = activeAction === action.id && isLoading;

        return (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(action.id, action.prompt)}
            disabled={isLoading || bestTradeLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all disabled:opacity-50 disabled:cursor-not-allowed
              ${getColorClasses(action.color, isActive)}`}
          >
            {isActive ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon size={14} />
            )}
            {action.label}
          </motion.button>
        );
      })}
    </div>
  );
}
