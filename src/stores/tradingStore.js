import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const useTradingStore = create((set, get) => ({
  // Data
  account: null,
  positions: [],
  orders: [],
  activity: [],
  chatHistory: [],

  // UI State
  isLoading: {
    account: false,
    positions: false,
    orders: false,
    activity: false,
    chat: false,
  },
  errors: {
    account: null,
    positions: null,
    orders: null,
    activity: null,
    chat: null,
  },

  // Fetch account
  fetchAccount: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, account: true },
      errors: { ...state.errors, account: null }
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/broker/account`);
      if (!res.ok) throw new Error('Failed to fetch account');
      const data = await res.json();
      set({ account: data });
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, account: error.message }
      }));
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, account: false } }));
    }
  },

  // Fetch positions
  fetchPositions: async () => {
    set((state) => ({
      isLoading: { ...state.isLoading, positions: true },
      errors: { ...state.errors, positions: null }
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/broker/positions`);
      if (!res.ok) throw new Error('Failed to fetch positions');
      const data = await res.json();
      set({ positions: data.positions || data });
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, positions: error.message }
      }));
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, positions: false } }));
    }
  },

  // Fetch orders
  fetchOrders: async (status = 'open') => {
    set((state) => ({
      isLoading: { ...state.isLoading, orders: true },
      errors: { ...state.errors, orders: null }
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/broker/orders?status=${status}`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      set({ orders: data.orders || data });
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, orders: error.message }
      }));
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, orders: false } }));
    }
  },

  // Fetch unusual activity
  fetchActivity: async (limit = 20) => {
    set((state) => ({
      isLoading: { ...state.isLoading, activity: true },
      errors: { ...state.errors, activity: null }
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/unusual-activity?limit=${limit}`);
      if (!res.ok) throw new Error('Failed to fetch activity');
      const data = await res.json();
      set({ activity: data.activities || data });
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, activity: error.message }
      }));
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, activity: false } }));
    }
  },

  // Refresh all data
  refreshAll: async () => {
    const state = get();
    await Promise.all([
      state.fetchAccount(),
      state.fetchPositions(),
      state.fetchOrders(),
      state.fetchActivity(),
    ]);
  },

  // Place order
  placeOrder: async (order) => {
    const res = await fetch(`${API_BASE_URL}/broker/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to place order');
    }

    await get().fetchOrders();
    await get().fetchAccount();
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    const res = await fetch(`${API_BASE_URL}/broker/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to cancel order');
    await get().fetchOrders();
  },

  // Close position
  closePosition: async (symbol, qty) => {
    const url = qty
      ? `${API_BASE_URL}/broker/positions/${symbol}?qty=${qty}`
      : `${API_BASE_URL}/broker/positions/${symbol}`;

    const res = await fetch(url, { method: 'DELETE' });

    if (!res.ok) throw new Error('Failed to close position');
    await get().fetchPositions();
    await get().fetchAccount();
  },

  // Send chat message with streaming
  sendMessage: async (message) => {
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, userMessage],
      isLoading: { ...state.isLoading, chat: true },
      errors: { ...state.errors, chat: null },
    }));

    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, assistantMessage],
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/ai/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: get().chatHistory.slice(0, -2).map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('Failed to send message');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  set((state) => ({
                    chatHistory: state.chatHistory.map((m) =>
                      m.id === assistantMessage.id
                        ? { ...m, content: fullContent }
                        : m
                    ),
                  }));
                }
              } catch {
                fullContent += data;
                set((state) => ({
                  chatHistory: state.chatHistory.map((m) =>
                    m.id === assistantMessage.id
                      ? { ...m, content: fullContent }
                      : m
                  ),
                }));
              }
            }
          }
        }
      }

      set((state) => ({
        chatHistory: state.chatHistory.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, isStreaming: false }
            : m
        ),
      }));
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, chat: error.message },
        chatHistory: state.chatHistory.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: 'Failed to get response. Please try again.', isStreaming: false }
            : m
        ),
      }));
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, chat: false } }));
    }
  },

  clearChat: () => {
    set({ chatHistory: [] });
  },

  // Make best trade - AI analyzes and recommends THE best trade
  makeBestTrade: async (options = {}) => {
    const {
      risk_tolerance = 'medium',
      preferred_direction = null,
      max_position_size = 1000,
    } = options;

    set((state) => ({
      isLoading: { ...state.isLoading, chat: true },
      errors: { ...state.errors, chat: null },
    }));

    // Add user message showing intent
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: `Make the best trade (${risk_tolerance} risk, $${max_position_size} max)`,
      timestamp: new Date(),
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, userMessage],
    }));

    // Add thinking message
    const thinkingMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
    };

    set((state) => ({
      chatHistory: [...state.chatHistory, thinkingMessage],
    }));

    try {
      const res = await fetch(`${API_BASE_URL}/ai/recommendations/make-best-trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          risk_tolerance,
          preferred_direction,
          max_position_size,
          min_premium: 50000,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Failed to get recommendation');
      }

      const data = await res.json();

      // Format the response nicely
      let responseContent = '';

      if (data.recommendation) {
        const rec = data.recommendation;
        responseContent = `🎯 **Best Trade Found**\n\n`;
        responseContent += `**${rec.ticker}** - ${rec.action?.toUpperCase() || 'BUY'}\n`;
        responseContent += `Strike: $${rec.strike} | Exp: ${rec.expiration}\n`;
        responseContent += `Entry: $${rec.suggested_entry} | Target: $${rec.suggested_exit}\n`;
        responseContent += `Stop Loss: $${rec.stop_loss}\n\n`;
        responseContent += `**Confidence:** ${(rec.confidence * 100).toFixed(0)}% | **Risk:** ${rec.risk_level}\n`;
        responseContent += `**Expected Return:** ${rec.expected_return}\n`;
        responseContent += `**Timeframe:** ${rec.timeframe}\n\n`;
        responseContent += `**Why:** ${rec.reasoning}\n\n`;

        if (rec.catalysts?.length > 0) {
          responseContent += `**Catalysts:** ${rec.catalysts.join(', ')}\n\n`;
        }

        if (data.analysis) {
          responseContent += `📊 ${data.analysis}\n\n`;
        }

        if (data.runner_ups?.length > 0) {
          responseContent += `**Also worth watching:**\n`;
          data.runner_ups.forEach(r => {
            responseContent += `• ${r}\n`;
          });
        }
      } else {
        responseContent = data.analysis || data.message || 'No trades found matching your criteria right now. Try during market hours or adjust your filters.';
      }

      // Update the thinking message with the result
      set((state) => ({
        chatHistory: state.chatHistory.map((m) =>
          m.id === thinkingMessage.id
            ? { ...m, content: responseContent, isStreaming: false, tradeRecommendation: data.recommendation }
            : m
        ),
      }));

      return data;

    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, chat: error.message },
        chatHistory: state.chatHistory.map((m) =>
          m.id === thinkingMessage.id
            ? { ...m, content: `❌ ${error.message}`, isStreaming: false }
            : m
        ),
      }));
      throw error;
    } finally {
      set((state) => ({ isLoading: { ...state.isLoading, chat: false } }));
    }
  },

  // Get market data for a ticker
  getMarketData: async (ticker) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/recommendations/market-data/${ticker}`);
      if (!res.ok) throw new Error('Failed to fetch market data');
      return await res.json();
    } catch (error) {
      console.error('Market data error:', error);
      return null;
    }
  },

  // Get technicals for a ticker
  getTechnicals: async (ticker) => {
    try {
      const res = await fetch(`${API_BASE_URL}/ai/recommendations/technicals/${ticker}`);
      if (!res.ok) throw new Error('Failed to fetch technicals');
      return await res.json();
    } catch (error) {
      console.error('Technicals error:', error);
      return null;
    }
  },
}));
