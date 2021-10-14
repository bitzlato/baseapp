export const tradesColorMapping = {
  sell: {
    color: 'var(--asks)',
    text: 'Sell',
  },
  buy: {
    color: 'var(--bids)',
    text: 'Buy',
  },
};

export const transferColorMapping = {
  completed: 'var(--system-green)',
};

export const setTradesType = (type: string) => tradesColorMapping[type] || { color: '', text: '' };

export const setTransferStatusColor = (status: string): string => transferColorMapping[status];
