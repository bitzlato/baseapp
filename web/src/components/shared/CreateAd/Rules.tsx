import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { useAdapterContext } from 'web/src/components/shared/Adapter';
import { useAppContext } from 'web/src/components/app/AppContext';
import * as s from './Rules.css';

export const Rules = () => {
  const { t, Link } = useAdapterContext();
  const { lang } = useAppContext();

  const rulesList = [
    { key: 0, title: t('createAd.rules.0') },
    { key: 1, title: t('createAd.rules.1') },
    {
      key: 2,
      title: (
        <>
          {t('createAd.rules.2')}{' '}
          <Box
            as={Link}
            to={`/${lang}/price/`}
            target="_blank"
            rel="noopener noreferrer"
            color={{ default: 'advertsAlertInfoLink', hover: 'advertsAlertInfoLinkHover' }}
          >
            {t('createAd.rules.2.page')}
          </Box>
          {t('createAd.rules.2.end')}
        </>
      ),
    },
    {
      key: 3,
      title: t('createAd.rules.3'),
    },
    {
      key: 4,
      title: t('createAd.rules.4'),
    },
    {
      key: 5,
      title: t('createAd.rules.5'),
    },
    {
      key: 6,
      title: t('createAd.rules.6'),
    },
    {
      key: 7,
      title: t('createAd.rules.7'),
    },
    {
      key: 8,
      title: t('createAd.rules.8'),
    },
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
