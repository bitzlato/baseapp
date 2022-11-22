import { createT } from './sharedI18n';

describe('sharedI18n', () => {
  test('should return the string by the key', () => {
    const t = createT('ru');

    expect(t('About Us')).toEqual('О нас');
  });

  test('should return an interpolate string', () => {
    const t = createT('ru');

    expect(t('Chat with', { partner: 'username' })).toEqual('Чат с username');
    expect(t('Chat with', { partner: 'username', foo: 'bar' })).toEqual('Чат с username');
  });

  test('should return an uninterpolate string', () => {
    const t = createT('ru');

    expect(t('Chat with', { partner: undefined })).toEqual('Чат с {partner}');
    expect(t('Chat with', { partner: null })).toEqual('Чат с {partner}');
    expect(t('Chat with')).toEqual('Чат с {partner}');
  });
});
