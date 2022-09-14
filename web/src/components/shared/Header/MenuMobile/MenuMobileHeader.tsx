import { FC, useContext } from 'react';
import { Box } from 'web/src/components/ui/Box';
import CrossIcon from 'web/src/assets/svg/CrossIcon.svg';
import { Button } from 'web/src/components/ui/Button';
import { MenuMobileContext } from 'web/src/components/shared/Header/MenuMobile/MenuMobile';

export const MenuMobileHeader: FC = ({ children }) => {
  const { onClose } = useContext(MenuMobileContext);

  return (
    <Box
      display="flex"
      py="2x"
      px="4x"
      mb="4x"
      borderBottomWidth="1x"
      borderBottomStyle="solid"
      borderBottomColor="menuMobileHeaderBorder"
    >
      {children}
      <Box ml="auto">
        <Button variant="text" color="clarified" size="icon" onClick={onClose}>
          <CrossIcon width="14px" height="14px" />
        </Button>
      </Box>
    </Box>
  );
};
