import { FC, ReactNode, useState } from 'react';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import { useSharedT } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import * as s from './CollapsibleBox.css';

export interface CollapsibleBoxProps {
  visible: ReactNode;
  hidden?: ReactNode;
}

export const CollapsibleBox: FC<CollapsibleBoxProps> = ({ visible, hidden }) => {
  const [expand, setExpand] = useState<boolean>();
  const t = useSharedT();

  return (
    <Box w="full" borderRadius="2x" backgroundColor="block">
      <Box w="full" px="4x" pt="2x">
        {visible}
        {hidden && (
          <Box className={s.collapseContent[expand ? 'expand' : 'collapse']}>{hidden}</Box>
        )}
      </Box>
      {hidden && (
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
            <Text fontWeight="strong" color="collapsibleBoxExpandControls">
              {expand ? t('Collapse') : t('Show more')}
            </Text>
          </Box>
          <Box
            cursor="pointer"
            color="collapsibleBoxExpandControls"
            className={s.chevrone[expand ? 'up' : 'down']}
          >
            <ChevronDownIcon />
          </Box>
        </Box>
      )}
    </Box>
  );
};
