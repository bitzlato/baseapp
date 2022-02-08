import classnames from 'classnames';
import * as React from 'react';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { ArrowIcon } from '../../../containers/ToolBar/icons/ArrowIcon';

interface Props {
  isOpen: boolean;
  onClose?: (() => void) | undefined;
  header?: React.ReactNode | undefined;
  title?: React.ReactNode | undefined;
  backTitle?: string | undefined;
  onBack?: (() => void) | undefined;
}

export const MobileModal: React.FC<Props> = (props) => {
  const [shouldAnimate, setShouldAnimate] = React.useState(false);

  React.useEffect(() => {
    if (props.isOpen) {
      setTimeout(() => {
        setShouldAnimate(true);
      }, 200);
    }

    return () => setShouldAnimate(false);
  }, [props.isOpen]);

  const handleOnClose = (event: React.MouseEvent, strictTarget?: boolean) => {
    if (event) {
      event.preventDefault();

      if (strictTarget && event.target !== event.currentTarget) {
        return;
      }

      setShouldAnimate(false);

      setTimeout(() => {
        props.onClose && props.onClose();
      }, 200);
    }
  };

  const handleOnBack = () => {
    setShouldAnimate(false);

    setTimeout(() => {
      props.onBack?.();
    }, 200);
  };

  const renderDefaultHeader = (
    <div className="cr-mobile-modal__header">
      <div className="cr-mobile-modal__header-back" onClick={handleOnBack}>
        {props.backTitle ? (
          <>
            <ArrowIcon />
            <span>{props.backTitle}</span>
          </>
        ) : null}
      </div>
      <div className="cr-mobile-modal__header-title">{props.title}</div>
      <div className="cr-mobile-modal__header-close" onClick={handleOnClose}>
        <CloseIcon />
      </div>
    </div>
  );

  const modalClassName = classnames('cr-mobile-modal', {
    'cr-mobile-modal--open': shouldAnimate,
  });
  const bodyClassName = classnames('cr-mobile-modal__block', {
    'cr-mobile-modal__block--open': shouldAnimate,
  });

  return (
    <div className={modalClassName} onClick={(e) => handleOnClose(e, true)}>
      <div className={bodyClassName}>
        {props.header || renderDefaultHeader}
        <div className="cr-mobile-modal__body">{props.children}</div>
      </div>
    </div>
  );
};
