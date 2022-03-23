import { FC } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { Links, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import * as s from './Navigation.css';

interface Props {
  renderNavLinkComponent: RenderNavLinkComponent;
  navLinks: Links;
}

export const Navigation: FC<Props> = ({ navLinks, renderNavLinkComponent }) => {
  return (
    <Box
      display={{
        mobile: 'none',
        desktop: 'flex',
      }}
      flexShrink={0}
      fontSize="medium"
      alignItems="stretch"
      height="full"
    >
      <Stack marginRight="6x" alignItems="stretch">
        {navLinks.map((item) => {
          if (!('type' in item)) {
            return null;
          }

          return item.type === 'internal' ? (
            renderNavLinkComponent({
              key: item.key,
              className: s.item,
              activeClassName: s.itemActive,
              to: item.to,
              children: item.children,
            })
          ) : (
            <Box as="a" key={item.key} className={s.item} href={item.to}>
              {item.children}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
