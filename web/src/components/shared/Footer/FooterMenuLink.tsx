import { FC, memo } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { RenderLinkComponent } from 'web/src/components/shared/sharedTypes';

import * as s from './FooterMenuLink.css';

interface Props {
  to: string;
  renderMarketLink?: RenderLinkComponent | undefined;
}

export const FooterMenuLink: FC<Props> = memo(({ to, children, renderMarketLink }) =>
  renderMarketLink ? (
    renderMarketLink({
      className: s.link,
      to,
      children,
    })
  ) : (
    <Box as="a" className={s.link} href={to}>
      {children}
    </Box>
  ),
);

FooterMenuLink.displayName = 'FooterMenuLink';
