import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import { Stack } from 'web/src/components/ui/Stack';
import { HeaderContext } from './HeaderContext';
import * as s from './Navigation.css';

export const Navigation: FC = () => {
  const { navLinks, renderNavLinkComponent } = useContext(HeaderContext);

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
