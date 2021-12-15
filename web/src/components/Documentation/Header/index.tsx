import * as React from 'react';
import { useSelector } from 'react-redux';
import { useT } from 'src/hooks/useT';
import { selectDocumentationData } from '../../../modules';

export const DocumentationHeader: React.FC = () => {
  const t = useT();
  const documentation = useSelector(selectDocumentationData);

  return (
    <div className="pg-documentation-item pg-documentation-header">
      <h1>{documentation?.info?.title}</h1>
      <div className="pg-documentation-header__description">
        <span>{documentation?.info?.description}</span>
      </div>
      <div className="pg-documentation-header__version">
        <div>
          {t('page.documentation.header.version.title')}&nbsp;
          {documentation?.info?.version}
        </div>
        <div>
          {t('page.documentation.header.version.ui')}&nbsp;
          {process.env.REACT_APP_GIT_SHA}
        </div>
      </div>
      <div className="pg-documentation-header__contact-info">
        <span>{t('page.documentation.header.contactInfo.title')}</span>
        <a href={documentation?.info?.contact?.url} target="_blank" rel="noopener noreferrer">
          {documentation?.info?.contact?.name}
        </a>
        <a href={`mailto: ${documentation?.info?.contact?.email}`}>
          {documentation?.info?.contact?.email}
        </a>
      </div>
      <div className="pg-documentation-header__license">
        <span>{t('page.documentation.header.license.title')}</span>
        <a href={documentation?.info?.license?.url} target="_blank" rel="noopener noreferrer">
          {documentation?.info?.license?.url}
        </a>
      </div>
    </div>
  );
};
