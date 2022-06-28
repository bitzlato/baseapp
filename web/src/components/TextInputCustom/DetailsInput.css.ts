import { style } from '@vanilla-extract/css';
import { responsiveStyle } from 'web/src/theme/themeUtils';

export * from 'web/src/components/shared/Trade/TradeModals/TradeDetailsModal.css';

export const detailsBox = style(
  responsiveStyle({
    mobile: {
      top: '88%',
    },
    tablet: {
      top: '65%',
    },
  }),
);
