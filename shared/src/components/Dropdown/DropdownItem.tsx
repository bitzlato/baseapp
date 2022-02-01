import { FC } from 'react';
import cn from 'classnames';
import { LinkType, RenderLinkComponent, RenderNavLinkComponent } from 'shared/src/types';
import { Box } from 'shared/src/components/Box';
import { Icon, IconName } from 'shared/src/components/Icon';
import * as s from './DropdownItem.css';

type Props = {
  icon?: IconName | undefined;
  children: string;
  closeMenu: () => void;
} & (
  | ({
      type: LinkType;
      to: string;
    } & (
      | {
          renderNavLinkComponent: RenderNavLinkComponent;
        }
      | {
          renderLinkComponent: RenderLinkComponent;
        }
    ))
  | { isActive?: boolean | undefined; onClick: () => void }
);

export const DropdownItem: FC<Props> = (props) => {
  const { icon, children, closeMenu, ...rest } = props;

  const handleClick = () => {
    if ('onClick' in props) {
      const { onClick } = props;
      onClick();
    }
    closeMenu();
  };

  const body = (
    <>
      {icon && (
        <Box as="span" className={s.icon}>
          <Icon name={icon} />
        </Box>
      )}
      {children}
    </>
  );

  if ('onClick' in rest) {
    return (
      <Box
        as="button"
        className={cn(s.item, rest.isActive && s.itemActive)}
        type="button"
        onClick={handleClick}
      >
        {body}
      </Box>
    );
  }

  if (rest.type === 'internal') {
    const { to } = rest;
    if ('renderNavLinkComponent' in rest) {
      const { renderNavLinkComponent } = rest;

      return (
        <>
          {renderNavLinkComponent({
            className: s.item,
            activeClassName: s.itemActive,
            to,
            onClick: handleClick,
            children: body,
          })}
        </>
      );
    }

    const { renderLinkComponent } = rest;
    return (
      <>
        {renderLinkComponent({
          className: s.item,
          to,
          onClick: handleClick,
          children: body,
        })}
      </>
    );
  }

  return (
    <Box as="a" className={s.item} href={rest.to} onClick={handleClick}>
      {body}
    </Box>
  );
};
