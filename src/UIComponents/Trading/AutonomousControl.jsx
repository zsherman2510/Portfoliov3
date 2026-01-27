import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiSettings, FiActivity, FiAlertTriangle, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function AutonomousControl() {
  const [status, setStatus] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState({
    max_position_size: 500,
    max_daily_loss: 1000,
    preferred_direction: null
  });

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/autonomous/status`);
      const data = await res.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to fetch autonomous status:', error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/autonomous/logs?limit=20`);
      const data = await res.json();
      setLogs(data.logs || []);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchLogs();
    const interval = setInterval(() => {
      fetchStatus();
      fetchLogs();
    }, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleQuickSetup = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/autonomous/quick-setup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) {
        await fetchStatus();
      }
    } catch (error) {
      console.error('Quick setup failed:', error);
    }
    setIsLoading(false);
  };

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/autonomous/start`, { method: 'POST' });
      if (res.ok) {
        await fetchStatus();
        await fetchLogs();
      }
    } catch (error) {
      console.error('Start failed:', error);
    }
    setIsLoading(false);
  };

  const handleStop = async () => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}/autonomous/stop`, { method: 'POST' });
      await fetchStatus();
    } catch (error) {
      console.error('Stop failed:', error);
    }
    setIsLoading(false);
  };

  const handleManualScan = async () => {
    setIsLoading(true);
    try {
      await fetch(`${API_BASE_URL}/autonomous/scan`, { method: 'POST' });
      await fetchStatus();
      await fetchLogs();
    } catch (error) {
      console.error('Manual scan failed:', error);
    }
    setIsLoading(false);
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'live': return 'text-red-400 bg-red-500/20';
      case 'paper_only': return 'text-amber-400 bg-amber-500/20';
      default: return 'text-white/50 bg-white/10';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'execute': return 'text-emerald-400';
      case 'error': return 'text-red-400';
      case 'skip': return 'text-white/50';
      case 'recommend': return 'text-blue-400';
      default: return 'text-white/70';
    }
  };

  if (!status) {
    return (
      <div className="rounded-xl bg-[#111] border border-white/10 p-5">
        <div className="animate-pulse h-32 bg-white/5 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#111] border border-white/10 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiActivity className={status.is_running ? 'text-emerald-400 animate-pulse' : 'text-white/50'} size={18} />
          <h2 className="text-lg font-bold text-white">AI Autopilot</h2>
          <span className={`px-2 py-0.5 text-xs rounded-full ${getModeColor(status.mode)}`}>
            {status.mode}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfig(!showConfig)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FiSettings size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchStatus}
            disabled={isLoading}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <FiRefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
          </motion.button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-[10px] text-white/50 uppercase tracking-wide">Status</p>
          <div className="flex items-center gap-1.5 mt-1">
            {status.is_running ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-sm font-bold text-emerald-400">Running</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
                <span className="text-sm font-bold text-white/50">Stopped</span>
              </>
            )}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-[10px] text-white/50 uppercase tracking-wide">Trades Today</p>
          <p className="text-sm font-bold text-white mt-1">{status.trades_today}</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-[10px] text-white/50 uppercase tracking-wide">Daily P/L</p>
          <p className={`text-sm font-bold mt-1 ${status.daily_pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${status.daily_pnl?.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-[10px] text-white/50 uppercase tracking-wide">Market</p>
          <div className="flex items-center gap-1.5 mt-1">
            {status.market_open ? (
              <>
                <FiCheck className="text-emerald-400" size={12} />
                <span className="text-sm font-bold text-emerald-400">Open</span>
              </>
            ) : (
              <>
                <FiX className="text-white/50" size={12} />
                <span className="text-sm font-bold text-white/50">Closed</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Config Panel */}
      {showConfig && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <h3 className="text-sm font-bold text-white mb-3">Quick Setup</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-wide">Max Per Trade</label>
              <input
                type="number"
                value={config.max_position_size}
                onChange={(e) => setConfig({ ...config, max_position_size: parseFloat(e.target.value) })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-wide">Max Daily Loss</label>
              <input
                type="number"
                value={config.max_daily_loss}
                onChange={(e) => setConfig({ ...config, max_daily_loss: parseFloat(e.target.value) })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-wide">Direction</label>
              <select
                value={config.preferred_direction || ''}
                onChange={(e) => setConfig({ ...config, preferred_direction: e.target.value || null })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
              >
                <option value="">Both</option>
                <option value="bullish">Bullish Only</option>
                <option value="bearish">Bearish Only</option>
              </select>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickSetup}
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-bold hover:bg-amber-500/30 transition-colors"
          >
            Apply Settings (Paper Mode)
          </motion.button>
        </motion.div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-2 mb-4">
        {status.mode === 'disabled' ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickSetup}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm hover:bg-amber-500/30 transition-colors"
          >
            Enable AI Trading
          </motion.button>
        ) : !status.is_running ? (
          <>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              disabled={isLoading || !status.market_open}
              className="flex-1 py-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FiPlay size={14} />
              Start Autopilot
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleManualScan}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-lg bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Manual Scan
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStop}
            disabled={isLoading}
            className="flex-1 py-2.5 rounded-lg bg-red-500/20 text-red-400 font-bold text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <FiPause size={14} />
            Stop Autopilot
          </motion.button>
        )}
      </div>

      {/* Warning */}
      {status.mode === 'live' && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-2">
          <FiAlertTriangle className="text-red-400 mt-0.5" size={14} />
          <p className="text-xs text-red-400">
            <strong>LIVE MODE:</strong> Real money is at risk. The AI will execute trades automatically.
          </p>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h3 className="text-xs font-bold text-white/50 uppercase tracking-wide mb-2">Recent Activity</h3>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-xs text-white/30 text-center py-4">No activity yet</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded bg-white/5">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                  {log.ticker && (
                    <span className="text-xs font-bold text-white">{log.ticker}</span>
                  )}
                  {log.reason && (
                    <span className="text-xs text-white/50 truncate max-w-[200px]">{log.reason}</span>
                  )}
                </div>
                <span className="text-[10px] text-white/30">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
