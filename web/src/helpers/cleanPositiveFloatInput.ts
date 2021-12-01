export const cleanPositiveFloatInput = (text: string) => {
  const thousands = text.search(/,[^.]*\./) !== -1;

  if (thousands) {
    text = text.replace(',', '');
  } else {
    text = text.replace(',', '.');
  }

  text = text
    .replace(/-+/, '')
    .replace(/^0+/, '0')
    .replace(/\.+/, '.')
    .replace(/^0+([1-9])/, '$1');

  if (text[0] === '.') {
    text = `0${text}`;
  }

  return text;
};
