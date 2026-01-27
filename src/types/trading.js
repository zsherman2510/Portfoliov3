// Trading types (JSDoc for type hints)

/**
 * @typedef {Object} BrokerAccount
 * @property {string} id
 * @property {number} cash
 * @property {number} buying_power
 * @property {number} equity
 * @property {number} last_equity
 * @property {number} portfolio_value
 * @property {string} status
 * @property {string} currency
 * @property {boolean} pattern_day_trader
 * @property {boolean} trading_blocked
 * @property {boolean} account_blocked
 */

/**
 * @typedef {Object} BrokerPosition
 * @property {string} symbol
 * @property {number} qty
 * @property {number} avg_entry_price
 * @property {number} current_price
 * @property {number} market_value
 * @property {number} unrealized_pl
 * @property {number} unrealized_plpc
 * @property {string} side
 * @property {string} asset_class
 */

/**
 * @typedef {Object} BrokerOrder
 * @property {string} id
 * @property {string} client_order_id
 * @property {string} symbol
 * @property {number} qty
 * @property {number} filled_qty
 * @property {'buy' | 'sell'} side
 * @property {'market' | 'limit' | 'stop' | 'stop_limit'} type
 * @property {'day' | 'gtc' | 'ioc' | 'fok'} time_in_force
 * @property {number} [limit_price]
 * @property {number} [stop_price]
 * @property {number} [filled_avg_price]
 * @property {string} status
 * @property {string} created_at
 * @property {string} [updated_at]
 * @property {boolean} extended_hours
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {'user' | 'assistant'} role
 * @property {string} content
 * @property {Date} timestamp
 * @property {boolean} [isStreaming]
 */

/**
 * @typedef {Object} UnusualActivityItem
 * @property {string} id
 * @property {Object} trade
 * @property {Object} trade.contract
 * @property {string} trade.contract.ticker
 * @property {number} trade.contract.strike
 * @property {string} trade.contract.expiration
 * @property {'call' | 'put'} trade.contract.option_type
 * @property {string} trade.contract.contract_symbol
 * @property {number} trade.price
 * @property {number} trade.size
 * @property {number} trade.premium
 * @property {number} trade.volume
 * @property {number} trade.open_interest
 * @property {number} volume_ratio
 * @property {'bullish' | 'bearish' | 'neutral'} sentiment
 * @property {boolean} is_high_volume
 * @property {boolean} is_large_premium
 * @property {boolean} is_sweep
 * @property {boolean} is_block_trade
 * @property {string} detected_at
 */

export {};
