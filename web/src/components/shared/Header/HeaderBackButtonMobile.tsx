import { FC } from 'react';
import { createTeleporter } from 'react-teleporter';
import { Logo } from './Logo';

export const BackButtonMobileTeleporter = createTeleporter();

export const HeaderBackButtonMobile: FC = () => (
  <>
    <BackButtonMobileTeleporter.Target />
    <BackButtonMobileTeleporter.Source>
      <Logo />
    </BackButtonMobileTeleporter.Source>
  </>
);
