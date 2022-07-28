import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import { Text } from 'web/src/components/ui/Text';
import { fontSizeVars } from 'web/src/theme/vars.css';
import * as s from './CollapsibleText.css';

type Props = {
  text: string;
  fontSize?: keyof typeof fontSizeVars;
};

export const CollapsibleText: FC<Props> = ({ text, fontSize = 'medium' }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <Box
      backgroundColor="transparent"
      display="flex"
      flexDirection="row"
      w="full"
      justifyContent="space-between"
    >
      <Box
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        pr="4x"
        className={s.collapseTextContent[collapse ? 'collapse' : 'expand']}
      >
        <Text
          as="span"
          whiteSpace={collapse ? 'nowrap' : 'pre-line'}
          fontSize={fontSize}
          color="tradeMainComponentTradeCounterDetailsColor"
        >
          {text}
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-end"
        flexDirection="column"
        pl="2x"
        pr="3x"
      >
        <Box
          cursor="pointer"
          color="collapsibleTextExpandControls"
          className={s.chevrone[collapse ? 'down' : 'up']}
          onClick={() => setCollapse((c) => !c)}
        >
          <ChevronDownIcon />
        </Box>
      </Box>
    </Box>
  );
};
