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

export const setTradesType = (type: string) =>
  tradesColorMapping[type as keyof typeof tradesColorMapping] || { color: '', text: '' };

export const setTransferStatusColor = (status: string): string =>
  transferColorMapping[status as keyof typeof transferColorMapping];
