import { FC, useState } from 'react';
import { ChevronIcon } from 'web/src/assets/images/ChevronIcon';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useT } from 'web/src/hooks/useT';
import * as s from './CollapsibleBox.css';

export interface CollapsibleBoxProps {
  visible: React.ReactElement;
  hidden: React.ReactElement;
}

export const CollapsibleBox: FC<CollapsibleBoxProps> = ({ visible, hidden }) => {
  const [expand, setExpand] = useState<boolean>();
  const t = useT();

  return (
    <Box w="full" borderRadius="2x" backgroundColor="dropdown">
      <Box w="full" px="4x" pt="2x">
        {visible}
        <Box className={s.collapseContent[expand ? 'expand' : 'collapse']}>{hidden}</Box>
      </Box>
      <Box
        onClick={() => setExpand(!expand)}
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        borderTopStyle="solid"
        borderTopWidth="1x"
        borderColor="traderBorder"
        px="4x"
        py="4x"
      >
        <Box>
          <Text fontWeight="strong" color="variantSwitcherItemBgActive">
            {expand ? t('collapese') : t('expand')}
          </Text>
        </Box>
        <Box
          cursor="pointer"
          color="variantSwitcherItemBgActive"
          className={s.chevrone[expand ? 'up' : 'down']}
        >
          <ChevronIcon />
        </Box>
      </Box>
    </Box>
  );
};
