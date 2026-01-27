import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiTrash2, FiUser } from 'react-icons/fi';
import { RiRobot2Fill } from 'react-icons/ri';

export function AIChat({ messages, isLoading, error, onSendMessage, onClear, fullHeight = false }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className={`rounded-xl bg-[#111] border border-white/10 flex flex-col ${fullHeight ? 'h-full rounded-none border-0' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20">
            <RiRobot2Fill className="text-emerald-400" size={16} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">AI Trading Assistant</h2>
            <p className="text-[10px] text-white/40">Powered by GPT-4</p>
          </div>
        </div>
        {messages.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClear}
            className="p-2 rounded-lg bg-white/5 text-white/50 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            title="Clear chat"
          >
            <FiTrash2 size={14} />
          </motion.button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="p-4 rounded-2xl bg-white/5 mb-4">
              <RiRobot2Fill size={32} className="text-white/20" />
            </div>
            <p className="text-white/70 font-medium mb-1">Ask me about trading</p>
            <p className="text-xs text-white/40 max-w-[200px]">
              "Find me calls that will boom" or "Review my positions"
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-blue-500/20'
                  : 'bg-emerald-500/20'
              }`}>
                {message.role === 'user' ? (
                  <FiUser size={14} className="text-blue-400" />
                ) : (
                  <RiRobot2Fill size={14} className="text-emerald-400" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 ${
                  message.role === 'user'
                    ? 'bg-blue-500/20 text-white'
                    : 'bg-white/5 text-white/90'
                }`}
              >
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.isStreaming && !message.content ? (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-white/50 text-xs">Thinking...</span>
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
                {message.isStreaming && message.content && (
                  <span className="inline-block w-1.5 h-4 bg-emerald-400 ml-0.5 animate-pulse rounded-sm" />
                )}
              </div>
            </motion.div>
          ))
        )}
        {error && (
          <div className="p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about trades, positions, or market analysis..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
            disabled={isLoading}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiSend size={18} />
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
