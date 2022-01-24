import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const addRootElement = (rootElem: Element) => {
  document.body.insertBefore(rootElem, document.body.lastElementChild?.nextElementSibling ?? null);
};

const usePortal = () => {
  const rootElemRef = useRef<Element>();

  useEffect(() => {
    if (rootElemRef.current) {
      addRootElement(rootElemRef.current);
    }

    return () => {
      if (rootElemRef.current) {
        rootElemRef.current.remove();
      }
    };
  }, []);

  const getRootElem = () => {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement('div');
    }

    return rootElemRef.current;
  };

  return getRootElem();
};

export const Portal: FC = ({ children }) => {
  const target = usePortal();

  return createPortal(children, target);
};
