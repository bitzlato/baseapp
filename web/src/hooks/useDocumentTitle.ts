import * as React from 'react';
import { setDocumentTitle } from 'src/helpers/setDocumentTitle';

export const useDocumentTitle = (title: string) => {
  React.useEffect(() => {
    setDocumentTitle(title);
  }, [title]);
};
