import { BottomTabIconName, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import { Box } from 'web/src/components/ui/Box';
import HomeIcon from 'web/src/assets/svg/bottom-tabs/Home.svg';
import ExchangeIcon from 'web/src/assets/svg/bottom-tabs/Exchange.svg';
import P2PIcon from 'web/src/assets/svg/bottom-tabs/P2P.svg';
import TradingIcon from 'web/src/assets/svg/bottom-tabs/Trading.svg';
import WalletsIcon from 'web/src/assets/svg/bottom-tabs/Wallets.svg';
import * as s from './BottomTabButton.css';

const icons = {
  home: <HomeIcon />,
  exchange: <ExchangeIcon />,
  trading: <TradingIcon />,
  wallets: <WalletsIcon />,
  p2p: <P2PIcon />,
};

export const BottomTabButton = ({
  to,
  exact = false,
  icon,
  title,
  type,
  renderNavLinkComponent,
}: {
  to: string;
  exact?: boolean;
  icon: BottomTabIconName;
  title: string;
  type: 'internal' | 'external';
  renderNavLinkComponent: RenderNavLinkComponent;
}) => {
  const children = (
    <>
      <Box as="span" className={s.tabIcon}>
        {icons[icon]}
      </Box>
      <Box as="span" className={s.tabTitle}>
        {title}
      </Box>
    </>
  );

  return type === 'internal' ? (
    renderNavLinkComponent({
      key: to,
      className: s.tabLink,
      activeClassName: s.tabLinkActive,
      to,
      children,
      exact,
    })
  ) : (
    <Box as="a" className={s.tabLink} href={to}>
      {children}
    </Box>
  );
};
