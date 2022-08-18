import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  selectCurrentColorTheme,
  selectCurrentLanguage,
  selectMobileDeviceState,
} from 'web/src/modules';
import { Footer as SharedFooter } from 'web/src/components/shared/Footer/Footer';
import { MobileFooter as SharedMobileFooter } from 'web/src/components/shared/MobileFooter/MobileFooter';
import { getLinkToP2P } from 'web/src/components/Header/getLinkToP2P';
import {
  BottomTabLink,
  RenderLinkComponent,
  RenderNavLinkComponent,
} from 'web/src/components/shared/sharedTypes';
import { useT } from 'web/src/hooks/useT';

export const Footer: FC = () => {
  const t = useT();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const language = useSelector(selectCurrentLanguage);
  const theme = useSelector(selectCurrentColorTheme);
  const p2pURL = getLinkToP2P(language);

  const BOTTOM_TABS: BottomTabLink[] = [
    {
      to: '/',
      type: 'internal',
      exact: true,
      title: t('bottomTabs.home'),
      icon: 'home',
    },
    {
      to: '/gifts',
      type: 'internal',
      icon: 'gifts',
      title: t('bottomTabs.gifts'),
    },
    {
      to: '/quick-exchange',
      type: 'internal',
      icon: 'exchange',
      title: t('bottomTabs.exchange'),
    },
    {
      to: '/trading',
      type: 'internal',
      icon: 'trading',
      title: t('bottomTabs.trading'),
    },
    {
      to: '/wallets',
      type: 'internal',
      icon: 'wallets',
      title: t('bottomTabs.balances'),
    },
    {
      to: p2pURL,
      type: 'external',
      icon: 'p2p',
      title: t('bottomTabs.p2p'),
    },
  ];

  const renderLinkComponent: RenderLinkComponent = (props) => <Link {...props} />;
  const renderNavLinkComponent: RenderNavLinkComponent = (props) => <NavLink {...props} />;

  return isMobileDevice ? (
    <SharedMobileFooter
      theme={theme}
      tabLinks={BOTTOM_TABS}
      renderNavLinkComponent={renderNavLinkComponent}
    />
  ) : (
    <SharedFooter
      logoURL={window.env.logoDarkUrl}
      theme={theme}
      language={language}
      renderMarketLink={renderLinkComponent}
    />
  );
};
