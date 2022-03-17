import { FC } from 'react';
import { useT, strong } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/ui/Box';
import { getBitzlatoLink } from 'web/src/components/shared/Footer/Footer';
import { selectCurrentLanguage } from 'web/src/modules';
import { useSelector } from 'react-redux';
import { Spinner } from 'web/src/components/ui/Spinner';
import { Status } from 'use-mutation';
import * as s from './FreezeAccount.css';

interface Props {
  status: Status;
}

export const FreezeAccountContent: FC<Props> = ({ status }) => {
  const t = useT();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const supportLink = getBitzlatoLink(currentLanguage, 'knowledgebase/');

  if (status === 'running') {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" className={s.spinnerBox}>
        <Spinner />
      </Box>
    );
  }

  if (status === 'success') {
    return (
      <>
        <p>
          {t('Freeze Completed', {
            br: <br />,
            strong,
          })}
        </p>
        <p>
          <a href={supportLink} target="_blank" rel="noopener noreferrer">
            {supportLink}
          </a>
        </p>
      </>
    );
  }

  return (
    <>
      {t('Freeze Info', {
        br: <br />,
        strong,
      })}
    </>
  );
};
