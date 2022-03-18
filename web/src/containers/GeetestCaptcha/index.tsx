import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { Language } from 'src/types';
import {
  geetestCaptchaFetch,
  GeetestCaptchaKeys,
  GeetestCaptchaResponse,
  RootState,
  selectCaptchaKeys,
  selectCurrentLanguage,
} from '../../modules';

const initGeetest = require('../../helpers/geetest.js');

interface OwnProps {
  shouldCaptchaReset?: boolean | undefined;
  onSuccess?: (value?: GeetestCaptchaResponse) => void | undefined;
}

interface ReduxProps {
  lang: Language;
  geetestCaptchaKeys?: GeetestCaptchaKeys | undefined;
}

interface DispatchProps {
  geetestCaptchaFetch: typeof geetestCaptchaFetch;
}

type Props = ReduxProps & DispatchProps & OwnProps;

class GeetestCaptchaComponent extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);
    this.captchaContainerRef = React.createRef<HTMLDivElement>();
  }

  private captchaContainerRef;

  private captcha: any;

  public componentDidMount() {
    this.props.geetestCaptchaFetch();
  }

  public UNSAFE_componentWillReceiveProps(next: Props) {
    if (
      this.props.geetestCaptchaKeys !== next.geetestCaptchaKeys &&
      next.geetestCaptchaKeys !== undefined
    ) {
      const { geetestCaptchaKeys, lang } = next;
      initGeetest(
        {
          gt: geetestCaptchaKeys.gt,
          challenge: geetestCaptchaKeys.challenge,
          offline: false,
          new_captcha: true,
          product: 'popup',
          width: '100%',
          https: true,
          lang,
        },
        this.captchaComingHandler,
      );
    }

    if (next.shouldCaptchaReset && !this.props.shouldCaptchaReset) {
      this.reset();
    }
  }

  public validate = () => {
    return this.captcha && this.captcha.getValidate();
  };

  public reset = () => {
    return this.captcha && this.captcha.reset();
  };

  public render() {
    return <div ref={this.captchaContainerRef} />;
  }

  private captchaComingHandler = (captcha: any) => {
    this.captcha = captcha;
    this.captcha.appendTo(this.captchaContainerRef.current);
    this.captcha.onSuccess(this.captchaSuccessHandler);
  };

  private captchaSuccessHandler = () => {
    if (this.props.onSuccess) {
      this.props.onSuccess(this.validate());
    }
  };
}

const mapDispatchProps = {
  geetestCaptchaFetch,
};

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (
  state: RootState,
): ReduxProps => ({
  lang: selectCurrentLanguage(state),
  geetestCaptchaKeys: selectCaptchaKeys(state),
});

export const GeetestCaptcha = connect(mapStateToProps, mapDispatchProps, null, {
  forwardRef: true,
})(GeetestCaptchaComponent as any);
