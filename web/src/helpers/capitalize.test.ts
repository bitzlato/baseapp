import { capitalize } from './capitalize';

const TestMap = {
  S2: 1,
};

describe('capitalize', () => {
  it('should capitalize value', () => {
    expect(capitalize('s1')).toEqual('S1');
    expect(capitalize('')).toEqual('');
  });

  it('should property deduce uppercase type', () => {
    expect(TestMap[capitalize('s2')]).toEqual(1);
  });
});
