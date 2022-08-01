import { FC } from 'react';
import { useAppContext } from 'web/src/components/app/AppContext';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { CollapsibleBox } from 'web/src/components/collapsibleBox/CollapsibleBox';

type Props = {
  terms: string | undefined;
};

export const AdTerms: FC<Props> = ({ terms }) => {
  const { isMobileDevice } = useAppContext();
  const { t } = useAdapterContext();

  if (isMobileDevice) {
    return (
      <Box pr="5x" pl="3x" backgroundColor="adBg" borderRadius="1.5x">
        <CollapsibleBox
          visible={
            <Box py="2x">
              <Box as="span" fontWeight="strong" fontSize="medium" color="tradeMobileInfoBoxKey">
                {t('trade.terms.history')}
              </Box>
            </Box>
          }
          hidden={
            <Box pb="4x">
              <Box
                as="span"
                whiteSpace="pre-line"
                fontSize="medium"
                color="tradeMobileInfoBoxValue"
              >
                {terms || t('trade.terms.history.empty')}
              </Box>
            </Box>
          }
          transparent
        />
      </Box>
    );
  }

  return (
    <Box p="6x" backgroundColor="adBg" borderRadius="1.5x">
      <Text variant="title">{t('Trade terms')}</Text>
      <Box marginTop="6x" whiteSpace="pre-line">
        {terms ? (
          <Text>{terms}</Text>
        ) : (
          <Text
            color="secondary"
            textTransform="uppercase"
            fontWeight="strong"
            fontSize="medium"
            textAlign="center"
          >
            {t('Missing.plural')}
          </Text>
        )}
      </Box>
    </Box>
  );
};
