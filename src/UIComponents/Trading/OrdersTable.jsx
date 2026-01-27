import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiAlertCircle, FiFileText } from 'react-icons/fi';

export function OrdersTable({ orders, isLoading, error, onCancelOrder, onFetchOrders, compact = false }) {
  const [cancelingId, setCancelingId] = useState(null);
  const [filter, setFilter] = useState('open');

  const formatCurrency = (value) => {
    if (value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancel = async (orderId) => {
    setCancelingId(orderId);
    try {
      await onCancelOrder(orderId);
    } finally {
      setCancelingId(null);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    onFetchOrders(newFilter);
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-500/20 text-blue-400',
      partially_filled: 'bg-amber-500/20 text-amber-400',
      filled: 'bg-emerald-500/20 text-emerald-400',
      canceled: 'bg-white/10 text-white/50',
      expired: 'bg-white/10 text-white/50',
      pending_new: 'bg-blue-500/20 text-blue-400',
      accepted: 'bg-blue-500/20 text-blue-400',
      rejected: 'bg-red-500/20 text-red-400',
    };
    return colors[status] || 'bg-white/10 text-white/50';
  };

  if (error) {
    return (
      <div className={compact ? '' : 'rounded-xl bg-[#111] border border-white/10 p-5'}>
        <h2 className={`font-bold text-white mb-4 ${compact ? 'text-sm' : 'text-lg'}`}>Orders</h2>
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
          <h2 className={`font-bold text-white ${compact ? 'text-sm' : 'text-lg'}`}>Orders</h2>
          {orders.length > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/10 text-white/70">
              {orders.length}
            </span>
          )}
        </div>
        <div className="flex rounded-lg bg-white/5 p-0.5">
          <button
            onClick={() => handleFilterChange('open')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'open'
                ? 'bg-white text-black'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Open
          </button>
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all'
                ? 'bg-white text-black'
                : 'text-white/70 hover:text-white'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {isLoading && orders.length === 0 ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-12 bg-white/5 rounded-lg"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-8">
          <FiFileText size={32} className="mx-auto mb-3 text-white/20" />
          <p className="text-white/50 text-sm">No {filter} orders</p>
        </div>
      ) : (
        <div className="space-y-2">
          {orders.map((order) => {
            const isBuy = order.side === 'buy';
            const canCancel = ['new', 'pending_new', 'accepted', 'partially_filled'].includes(order.status);

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${isBuy ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {order.side.toUpperCase()}
                  </span>
                  <div>
                    <p className="font-bold text-white text-sm">{order.symbol}</p>
                    <p className="text-xs text-white/50">
                      {order.qty} @ {order.type === 'market' ? 'MKT' : formatCurrency(order.limit_price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-white/40 mt-1">{formatTime(order.created_at)}</p>
                  </div>

                  {canCancel && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCancel(order.id)}
                      disabled={cancelingId === order.id}
                      className="p-1.5 rounded bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                      title="Cancel order"
                    >
                      {cancelingId === order.id ? (
                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FiX size={14} />
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
