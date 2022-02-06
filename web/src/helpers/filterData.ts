const consist = (a: string, b: string) => {
  return a.toLowerCase().indexOf(b.toLowerCase()) !== -1;
};

export const handleFilter = (
  item: {
    currency: any;
    name?: string;
    balance?: number;
    type?: string;
    fee?: number;
    fixed?: number;
  },
  term: string,
) => {
  return consist(item.currency, term);
};
