import { FC, useState } from 'react';
import { Box } from 'web/src/components/ui/Box';
import ChevronDownIcon from 'web/src/assets/svg/ChevronDownIcon.svg';
import { Text } from 'web/src/components/ui/Text';
import { fontSizeVars, vars } from 'web/src/theme/vars.css';
import * as s from './CollapsibleText.css';

type Props = {
  title?: string;
  text: string;
  titleColor?: keyof typeof vars.colors;
  textColor?: keyof typeof vars.colors;
  controlColor?: keyof typeof vars.colors;
  fontSize?: keyof typeof fontSizeVars;
};

export const CollapsibleText: FC<Props> = ({
  title,
  text,
  titleColor,
  textColor,
  controlColor,
  fontSize = 'medium',
}) => {
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
        display="flex"
        flexDirection="column"
      >
        {title && (
          <Box pb="2x" pt="1x">
            <Text as="span" color={titleColor} fontWeight="strong" fontSize="medium">
              {title}
            </Text>
          </Box>
        )}
        <Text
          as="span"
          fontSize={fontSize}
          color={textColor}
          whiteSpace={collapse ? 'nowrap' : 'pre-line'}
          textOverflow={collapse ? 'ellipsis' : undefined}
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
          color={controlColor}
          className={s.chevrone[collapse ? 'down' : 'up']}
          onClick={() => setCollapse((c) => !c)}
        >
          <ChevronDownIcon />
        </Box>
      </Box>
    </Box>
  );
};
