import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import * as s from './Rules.css';

export const Limits = () => {
  const { t } = useAdapterContext();

  const rulesList = [
    { key: 0, title: t('createAd.limits.0') },
    { key: 1, title: t('createAd.limits.1') },
    { key: 2, title: t('createAd.limits.2') },
  ];

  return (
    <Box as="ul" className={s.list}>
      {rulesList.map(({ key, title }) => {
        return (
          <Box key={key} as="li" py="2x">
            <Text variant="label">{title}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
