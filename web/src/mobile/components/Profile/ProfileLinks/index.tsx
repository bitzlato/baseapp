import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { ChevronIcon } from '../../../assets/images/ChevronIcon';

export interface ProfileLink {
  titleKey: string;
  route: string;
  children?: React.ReactNode;
  state?: {};
}
interface Props {
  links: ProfileLink[];
}

const ProfileLinksComponent: React.FC<Props> = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const links = props.links || [];

  const handleRedirect = (link: ProfileLink) => {
    if (history.location.pathname !== link.route) {
      history.push({
        pathname: link.route,
        state: link.state,
      });
    }
  };

  const renderLinkChildren = (link: ProfileLink) => {
    if (link.children) {
      return <div className="pg-mobile-profile-links__item__right">{link.children}</div>;
    }

    return (
      <div className="pg-mobile-profile-links__item__right">
        <ChevronIcon />
      </div>
    );
  };

  const renderLinksItem = (link: ProfileLink, index: number) => {
    return (
      <div
        key={index}
        className="pg-mobile-profile-links__item"
        onClick={() => handleRedirect(link)}
      >
        <span className="pg-mobile-profile-links__item__left">
          {intl.formatMessage({ id: link.titleKey })}
        </span>
        {renderLinkChildren(link)}
      </div>
    );
  };

  return (
    <div className="pg-mobile-profile-links">
      {links.length ? links.map(renderLinksItem) : null}
    </div>
  );
};

export const ProfileLinks = React.memo(ProfileLinksComponent);
