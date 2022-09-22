import { FC } from 'react';
import { useT, strong } from 'web/src/hooks/useT';
import { Box } from 'web/src/components/ui/Box';
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
  const supportLink = currentLanguage === 'ru' ? '/ru/knowledgebase/' : '/knowledgebase/';

  if (status === 'running') {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" className={s.spinnerBox}>
        <Spinner />
      </Box>
    );
  }

  if (status === 'success') {
    return (
      <div>
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
      </div>
    );
  }

  return (
    <div>
      {t('Freeze Info', {
        br: <br />,
        strong,
      })}
    </div>
  );
};
