import { FC, useState, MouseEvent } from 'react';
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
import { P2PReport } from 'web/src/modules/user/profile/types';
import * as s from './Reports.css';
import { ReportDownload } from './ReportDownload';

interface ReportLinkProps {
  report: P2PReport;
}

export const ReportLink: FC<ReportLinkProps> = ({ report: { code, description, format } }) => {
  const [download, setDownload] = useState<Boolean>(false);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    setDownload(true);
  };
  const handleDownloded = () => {
    setDownload(false);
  };

  return (
    <Box
      key={code}
      as="a"
      href={`/reports/${code}`}
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
    >
      <Text variant="title" fontWeight="strong">
        {description}.{format}
      </Text>
      <DownloadIcon />

      {download && <ReportDownload code={code} silent onDownloded={handleDownloded} />}
    </Box>
  );
};

export const Reports: FC = () => {
  const t = useT();
  const history = useHistory();
  const isMobileDevice = useSelector(selectMobileDeviceState);
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
          {reports.map((report) => (
            <ReportLink report={report} />
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
