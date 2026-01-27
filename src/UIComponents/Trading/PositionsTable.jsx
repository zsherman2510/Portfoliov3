import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiTrendingUp, FiTrendingDown, FiAlertCircle, FiBox } from 'react-icons/fi';

export function PositionsTable({ positions, isLoading, error, onClosePosition, onTickerClick, compact = false }) {
  const [closingSymbol, setClosingSymbol] = useState(null);
  const [confirmClose, setConfirmClose] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const handleClose = async (symbol) => {
    if (confirmClose !== symbol) {
      setConfirmClose(symbol);
      setTimeout(() => setConfirmClose(null), 3000);
      return;
    }

    setClosingSymbol(symbol);
    try {
      await onClosePosition(symbol);
    } finally {
      setClosingSymbol(null);
      setConfirmClose(null);
    }
  };

  if (error) {
    return (
      <div className={compact ? '' : 'rounded-xl bg-[#111] border border-white/10 p-5'}>
        <h2 className={`font-bold text-white mb-4 ${compact ? 'text-sm' : 'text-lg'}`}>Positions</h2>
        <div className="flex items-center gap-2 text-red-400">
          <FiAlertCircle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? '' : 'rounded-xl bg-[#111] border border-white/10 p-5'}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className={`font-bold text-white ${compact ? 'text-sm' : 'text-lg'}`}>Positions</h2>
          {positions.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70">
              {positions.length}
            </span>
          )}
        </div>
      </div>

      {isLoading && positions.length === 0 ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-12 bg-white/5 rounded-lg"></div>
          ))}
        </div>
      ) : positions.length === 0 ? (
        <div className="text-center py-8">
          <FiBox size={32} className="mx-auto mb-3 text-white/20" />
          <p className="text-white/50 text-sm">No open positions</p>
        </div>
      ) : (
        <div className="space-y-2">
          {positions.map((position) => {
            const isProfit = position.unrealized_pl >= 0;
            const plPercent = position.unrealized_plpc * 100;

            return (
              <motion.div
                key={position.symbol}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <button
                  onClick={() => onTickerClick?.(position.symbol)}
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  {isProfit ? (
                    <FiTrendingUp className="text-emerald-400" size={14} />
                  ) : (
                    <FiTrendingDown className="text-red-400" size={14} />
                  )}
                  <span className="font-bold text-white">{position.symbol}</span>
                  <span className="text-xs text-white/50">{position.qty} shares</span>
                </button>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`text-sm font-bold font-mono ${isProfit ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isProfit ? '+' : ''}{formatCurrency(position.unrealized_pl)}
                    </p>
                    <p className="text-xs text-white/50">
                      {isProfit ? '+' : ''}{plPercent.toFixed(2)}%
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleClose(position.symbol)}
                    disabled={closingSymbol === position.symbol}
                    className={`p-1.5 rounded transition-all ${
                      confirmClose === position.symbol
                        ? 'bg-red-500 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100'
                    }`}
                    title={confirmClose === position.symbol ? 'Click to confirm' : 'Close position'}
                  >
                    {closingSymbol === position.symbol ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FiX size={14} />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
