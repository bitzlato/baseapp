import { sprinkles } from 'theme/sprinkles.css';

export const item = sprinkles({
  color: {
    default: 'text',
    hover: 'textHighlighted',
  },
  textDecoration: {
    default: 'none',
    hover: 'underline',
  },
  cursor: 'pointer',
  display: 'flex',
  height: 'full',
  alignItems: 'center',
});

export const itemActive = sprinkles({
  color: 'textHighlighted',
});
