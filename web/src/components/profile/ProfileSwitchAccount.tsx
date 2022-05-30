import { FC, useCallback, useRef, useState } from 'react';
import cn from 'classnames';
import { Box } from 'web/src/components/ui/Box';
import { Text } from 'web/src/components/ui/Text';
import { Button } from 'web/src/components/ui/Button';
import { useChangeAuthSubject } from 'web/src/hooks/mutations/useChangeAuthSubject';
import { useEscapeKeyDown } from 'web/src/hooks/useEscapeKeyDown';
import { useOnClickOutside } from 'web/src/hooks/useOnClickOutside';
import { AuthSubject } from 'web/src/modules/user/profile/types';
import { useT } from 'web/src/hooks/useT';
import * as s from './ProfileSwitchAccount.css';

interface AccountProps {
  authSubject: AuthSubject;
  isActive: boolean;
}

const Account: FC<AccountProps> = ({
  authSubject: { subject, profile_name },
  isActive = false,
}) => {
  const t = useT();
  const changeAuthSubject = useChangeAuthSubject();
  const handleClick = () => {
    changeAuthSubject(subject);
  };

  return (
    <Box as="button" type="button" className={s.account} onClick={handleClick}>
      <Box as="span" color="text" fontSize="small">
        {profile_name}

        {isActive && (
          <Text as="span" color="textHighlighted" fontWeight="strong">
            {' '}
            ({t("It's you")})
          </Text>
        )}
      </Box>
      <Box as="span" fontSize="caption">
        {subject}
      </Box>
    </Box>
  );
};

interface Props {
  authSubjects: ReadonlyArray<AuthSubject>;
  currentSubject?: string | undefined;
}

export const ProfileSwitchAccount: FC<Props> = ({ authSubjects, currentSubject }) => {
  const t = useT();
  const elementRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleOnOutsideClick = useCallback(() => {
    if (open) {
      setOpen(false);
    }
  }, [open]);

  useOnClickOutside(elementRef, handleOnOutsideClick);
  useEscapeKeyDown(handleOnOutsideClick);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box ref={elementRef} position="relative">
      <Button color="secondary" onClick={handleClick}>
        {t('Switch account')} <span className={cn(s.triangle, open && s.triangleOpened)} />
      </Button>
      <Box
        className={cn(s.dropdown, open && s.dropdownOpened)}
        display="flex"
        flexDirection="column"
        bg="statBg"
        borderRadius="2x"
        fontSize="medium"
        boxShadow="dropdown"
      >
        {authSubjects.map((authSubject) => (
          <Account
            key={authSubject.subject}
            authSubject={authSubject}
            isActive={authSubject.subject === currentSubject}
          />
        ))}
      </Box>
    </Box>
  );
};
