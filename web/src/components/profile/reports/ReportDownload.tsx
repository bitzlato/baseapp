import { FC, useEffect } from 'react';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Box } from 'web/src/components/ui/Box';
import { useFetchP2PReport, useFetchP2PReports } from 'web/src/hooks/data/useFetchP2PReports';

interface Props {
  code: number;
  silent?: boolean;
  onDownloded: () => void;
}

export function downloadFile(
  base64Content: string,
  filename: string = 'File.csv',
  innerHTML: string = 'Download',
) {
  const link = document.createElement('a');
  link.innerHTML = innerHTML;
  link.download = filename;
  link.href = `data:application/octet-stream;base64,${base64Content}`;
  const downloadLink = document.body.appendChild(link);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export const ReportDownload: FC<Props> = ({ code, silent = false, onDownloded }) => {
  const { data: reports } = useFetchP2PReports();
  const { data: reportContent } = useFetchP2PReport(code);

  useEffect(() => {
    if (reportContent && reports) {
      const report = reports.find((item) => item.code === code);
      if (report) {
        downloadFile(
          Buffer.from(reportContent).toString('base64'),
          `${report.description}.${report.format}`,
        );

        onDownloded();
      }
    }
  }, [reportContent, reports, code, onDownloded]);

  return !silent ? (
    <Box display="flex" justifyContent="center" p="14x">
      <Spinner />
    </Box>
  ) : null;
};
