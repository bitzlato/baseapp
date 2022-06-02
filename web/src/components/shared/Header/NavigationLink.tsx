import { FC } from 'react';
import cn from 'classnames';
import { CommonLink, LinkNav, RenderNavLinkComponent } from 'web/src/components/shared/sharedTypes';
import * as s from './NavigationLink.css';

interface Props {
  link: LinkNav | CommonLink;
  variant?: keyof typeof s.item;
  open?: boolean;
  active?: boolean;
  renderNavLinkComponent: RenderNavLinkComponent;
}

export const NavigationLink: FC<Props> = ({
  link,
  variant = 'default',
  open = false,
  active = false,
  renderNavLinkComponent,
}) => {
  const className = cn(s.item[variant], !open && active && s.itemActive, open && s.itemHover);

  if (!('type' in link)) {
    return (
      <button type="button" className={className}>
        {link.children}
      </button>
    );
  }

  switch (link.type) {
    case 'internal':
      return renderNavLinkComponent({
        key: link.key,
        className,
        activeClassName: s.itemActive,
        to: link.to,
        children: link.children,
      });

    case 'external':
      return (
        <a className={className} href={link.to}>
          {link.children}
        </a>
      );

    default:
      return null;
  }
};
