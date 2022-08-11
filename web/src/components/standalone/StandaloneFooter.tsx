import { FC } from 'react';
import { RenderLinkComponent } from 'web/src/components/shared/sharedTypes';
import { Footer } from 'web/src/components/shared/Footer/Footer';
import { StandaloneComponentProps } from './types';

interface Props extends StandaloneComponentProps {}

// eslint-disable-next-line jsx-a11y/anchor-has-content
const renderLink: RenderLinkComponent = ({ to, ...props }) => <a href={to} {...props} />;

export const StandaloneFooter: FC<Props> = ({ theme, language }) => (
  <Footer theme={theme} language={language} renderMarketLink={renderLink} />
);
