import { FC, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { ReportDownload } from 'web/src/components/profile/reports/ReportDownload';
import { Reports } from 'web/src/components/profile/reports/Reports';

export const ReportsMobileScreen: FC = () => {
  return <Reports />;
};

export const ReportDownloadScreen: FC = () => {
  const { code } = useParams<{ code: string }>();
  const history = useHistory();

  const handleDownloded = useCallback(() => {
    history.replace('/profile');
  }, [history]);

  return <ReportDownload code={parseInt(code, 10)} onDownloded={handleDownloded} />;
};
