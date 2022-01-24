import { FC } from 'react';
import ApiIcon from 'assets/svg/ApiIcon.svg';
import HistoryIcon from 'assets/svg/HistoryIcon.svg';
import LogoutIcon from 'assets/svg/LogoutIcon.svg';
import OrdersIcon from 'assets/svg/OrdersIcon.svg';
import P2PIcon from 'assets/svg/P2PIcon.svg';
import ProfileIcon from 'assets/svg/ProfileIcon.svg';
import QuickExchangeIcon from 'assets/svg/QuickExchangeIcon.svg';
import SignupIcon from 'assets/svg/SignupIcon.svg';
import TrandingIcon from 'assets/svg/TrandingIcon.svg';
import WalletsIcon from 'assets/svg/WalletsIcon.svg';
import QuestionIcon from 'assets/svg/QuestionIcon.svg';
import NotificationsIcon from 'assets/svg/NotificationsIcon.svg';
import FacebookIcon from 'assets/svg/FacebookIcon.svg';
import InstagramIcon from 'assets/svg/InstagramIcon.svg';
import TelegramIcon from 'assets/svg/TelegramIcon.svg';
import TwitterIcon from 'assets/svg/TwitterIcon.svg';
import YoutubeIcon from 'assets/svg/YoutubeIcon.svg';
import EnIcon from 'assets/svg/en.svg';
import RuIcon from 'assets/svg/ru.svg';

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
