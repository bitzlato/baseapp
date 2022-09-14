import { FC } from 'react';
import { RenderButtonFn } from 'web/src/components/shared/Header/Dropdown/Dropdown';
import { DropdownItemType } from 'web/src/components/shared/Header/Dropdown/DropdownItem';
import { MenuMobile } from 'web/src/components/shared/Header/MenuMobile/MenuMobile';
import { MenuMobileBody } from 'web/src/components/shared/Header/MenuMobile/MenuMobileBody';
import { MenuMobileHeader } from 'web/src/components/shared/Header/MenuMobile/MenuMobileHeader';
import { MenuMobileItem } from 'web/src/components/shared/Header/MenuMobile/MenuMobileItem';
import { MenuMobileUserHeader } from 'web/src/components/shared/Header/MenuMobile/MenuMobileUserHeader';
import { User } from 'web/src/modules/user/profile/types';

interface Props {
  links: Array<{ key: string } & DropdownItemType>;
  user?: User | undefined;
  renderButton: RenderButtonFn;
}

export const UserMenuMobile: FC<Props> = ({ links, user, renderButton }) => {
  return (
    <MenuMobile renderButton={renderButton}>
      <MenuMobileHeader>{user && <MenuMobileUserHeader user={user} />}</MenuMobileHeader>
      <MenuMobileBody>
        {links?.map((item) => (
          <MenuMobileItem {...item} />
        ))}
      </MenuMobileBody>
    </MenuMobile>
  );
};
