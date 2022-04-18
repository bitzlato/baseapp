import { FC, useState, MouseEvent, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useFetchP2PReports } from 'web/src/hooks/data/useFetchP2PReports';
import { useT } from 'web/src/hooks/useT';
import { selectMobileDeviceState } from 'web/src/modules/public/globalSettings/selectors';
import { Card } from 'web/src/components/Card/Card';
import { Box } from 'web/src/components/ui/Box';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Text } from 'web/src/components/ui/Text';
import { Container } from 'web/src/components/Container/Container';
import DownloadIcon from 'web/src/assets/svg/DownloadIcon.svg';
import { useHistory } from 'react-router-dom';
import { Subheader } from 'web/src/mobile/components/Subheader';
import LinkIcon from 'web/src/assets/svg/LinkIcon.svg';
import { selectUserInfo } from 'web/src/modules/user/profile/selectors';
import * as s from './Reports.css';
import { ReportDownload } from './ReportDownload';

interface ReportLinkProps {
  name: string;
  reportCode?: number | undefined;
  url?: string | undefined;
  icon?: ReactNode | undefined;
}

export const ReportLink: FC<ReportLinkProps> = ({
  name,
  reportCode,
  url,
  icon = <DownloadIcon />,
}) => {
  const [download, setDownload] = useState<Boolean>(false);

  const handleClick = (event: MouseEvent) => {
    if (reportCode) {
      event.preventDefault();

      setDownload(true);
    }
  };
  const handleDownloded = () => {
    setDownload(false);
  };

  return (
    <Box
      as="a"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg={{ hover: 'reportBgHover' }}
      color={{ default: 'text', hover: 'text' }}
      textDecoration={{ hover: 'none' }}
      p="6x"
      borderBottomWidth="1x"
      borderBottomStyle="solid"
      borderBottomColor="cardHeaderBorderBottom"
      onClick={handleClick}
      {...(url
        ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
        : { href: `/reports/${reportCode}` })}
    >
      <Text variant="title" fontWeight="strong">
        {name}
      </Text>
      {icon}

      {download && reportCode && (
        <ReportDownload code={reportCode} silent onDownloded={handleDownloded} />
      )}
    </Box>
  );
};

export const Reports: FC = () => {
  const t = useT();
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
  const user = useSelector(selectUserInfo);
  const { data: reports, error } = useFetchP2PReports();

  if (error) {
    return null;
  }

  const body = (
    <Card header={!isMobileDevice ? <h4>{t('Reports')}</h4> : undefined}>
      {!reports ? (
        <Box display="flex" justifyContent="center">
          <Spinner />
        </Box>
      ) : (
        <Box className={s.body} display="flex" flexDirection="column">
          <ReportLink
            name={t('Account Statement')}
            url={user.account_statements_url}
            icon={<LinkIcon />}
          />
          {reports.map((report) => (
            <ReportLink
              key={report.code}
              name={`${t(`reports.report_${report.code}`)}.${report.format}`}
              reportCode={report.code}
            />
          ))}
        </Box>
      )}
    </Card>
  );

  return isMobileDevice ? (
    <Box my="1x">
      <Subheader
        title={t('Reports')}
        backTitle={t('page.body.profile.header.account')}
        onGoBack={() => history.push('/profile')}
      />
      {body}
    </Box>
  ) : (
    <Container maxWidth="xl" my="4">
      {body}
    </Container>
  );
};
