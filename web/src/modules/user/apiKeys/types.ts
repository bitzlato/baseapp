export type P2PApiKey = {
  kid: number;
  name: string;
  key: {
    kty: string;
    crv: string;
    x: string;
    y: string;
    alg: string;
  };
  active: boolean;
  authorities: { canRead: boolean; canTrade: boolean; canTransfer: boolean };
};
