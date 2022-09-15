import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { HeaderContext } from 'web/src/components/shared/Header/HeaderContext';
import { LinkNav } from 'web/src/components/shared/sharedTypes';
import { MenuMobileContext } from 'web/src/components/shared/Header/MenuMobile/MenuMobile';
import * as s from './MenuMobileSubItems.css';

interface Props {
  links: LinkNav[];
  open?: boolean | undefined;
}

export const MenuMobileSubItems: FC<Props> = ({ links, open = false }) => {
  const { renderNavLinkComponent } = useContext(HeaderContext);
  const { onClose } = useContext(MenuMobileContext);

  const handleClick = () => {
    onClose();
  };

  return (
    <Box className={s.items[open ? 'opened' : 'closed']}>
      {links.map((link) =>
        renderNavLinkComponent({
          key: link.key,
          to: link.to,
          children: link.children,
          exact: link.exact ?? false,
          className: s.item.base,
          activeClassName: s.item.active,
          onClick: handleClick,
        }),
      )}
    </Box>
  );
};
