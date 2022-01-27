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
  const { icon, children, closeMenu } = props;

  const handleClick = () => {
    if ('onClick' in props) {
      props.onClick();
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

  if ('onClick' in props) {
    return (
      <Box
        as="button"
        className={cn(s.item, props.isActive && s.itemActive)}
        type="button"
        onClick={handleClick}
      >
        {body}
      </Box>
    );
  }

  if (props.type === 'internal') {
    return (
      <>
        {'renderNavLinkComponent' in props
          ? props.renderNavLinkComponent({
              className: s.item,
              activeClassName: s.itemActive,
              to: props.to,
              onClick: handleClick,
              children: body,
            })
          : props.renderLinkComponent({
              className: s.item,
              to: props.to,
              onClick: handleClick,
              children: body,
            })}
      </>
    );
  }

  return (
    <Box as="a" className={s.item} href={props.to} onClick={handleClick}>
      {body}
    </Box>
  );
};
