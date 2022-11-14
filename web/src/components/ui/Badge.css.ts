import { styleVariants } from '@vanilla-extract/css';
import { sprinkles } from 'web/src/theme/sprinkles.css';

const badgeBase = sprinkles({
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 'circle',
  fontSize: 'medium',
  fontWeight: 'strong',
  px: '3x',
  height: '6x',
});

export const badge = styleVariants({
  danger: [
    badgeBase,
    sprinkles({
      bg: 'danger',
      color: 'badgeDangerColor',
    }),
  ],
  clarified: [
    badgeBase,
    sprinkles({
      bg: 'badgeClarifiedBg',
      color: 'badgeClarifiedColor',
    }),
  ],
});
