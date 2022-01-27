import { FC } from 'react';
import ApiIcon from 'shared/src/assets/svg/ApiIcon.svg';
import HistoryIcon from 'shared/src/assets/svg/HistoryIcon.svg';
import LogoutIcon from 'shared/src/assets/svg/LogoutIcon.svg';
import OrdersIcon from 'shared/src/assets/svg/OrdersIcon.svg';
import P2PIcon from 'shared/src/assets/svg/P2PIcon.svg';
import ProfileIcon from 'shared/src/assets/svg/ProfileIcon.svg';
import QuickExchangeIcon from 'shared/src/assets/svg/QuickExchangeIcon.svg';
import SignupIcon from 'shared/src/assets/svg/SignupIcon.svg';
import TrandingIcon from 'shared/src/assets/svg/TrandingIcon.svg';
import WalletsIcon from 'shared/src/assets/svg/WalletsIcon.svg';
import QuestionIcon from 'shared/src/assets/svg/QuestionIcon.svg';
import NotificationsIcon from 'shared/src/assets/svg/NotificationsIcon.svg';
import FacebookIcon from 'shared/src/assets/svg/FacebookIcon.svg';
import InstagramIcon from 'shared/src/assets/svg/InstagramIcon.svg';
import TelegramIcon from 'shared/src/assets/svg/TelegramIcon.svg';
import TwitterIcon from 'shared/src/assets/svg/TwitterIcon.svg';
import YoutubeIcon from 'shared/src/assets/svg/YoutubeIcon.svg';
import EnIcon from 'shared/src/assets/svg/en.svg';
import RuIcon from 'shared/src/assets/svg/ru.svg';

const icons = {
  profile: <ProfileIcon />,
  signup: <SignupIcon />,
  quickExchange: <QuickExchangeIcon />,
  trading: <TrandingIcon />,
  wallets: <WalletsIcon />,
  orders: <OrdersIcon />,
  history: <HistoryIcon />,
  p2p: <P2PIcon />,
  api: <ApiIcon />,
  logout: <LogoutIcon />,
  question: <QuestionIcon />,
  notifications: <NotificationsIcon />,
  en: <EnIcon />,
  ru: <RuIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  telegram: <TelegramIcon />,
  twitter: <TwitterIcon />,
  youtube: <YoutubeIcon />,
};
export type IconName = keyof typeof icons;

interface Props {
  name: IconName;
}

export const Icon: FC<Props> = ({ name }: Props) => icons[name];
