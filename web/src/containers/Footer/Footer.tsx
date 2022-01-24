import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentColorTheme, selectCurrentLanguage } from 'src/modules';
import { Footer as SharedFooter } from 'shared/Footer';

export const Footer: FC = () => {
  const language = useSelector(selectCurrentLanguage);
  const theme = useSelector(selectCurrentColorTheme);

  return (
    <SharedFooter
      theme={theme}
      language={language}
      renderMarketLink={(props: any) => <Link {...props} />}
    />
  );
};
