/* eslint-disable react/destructuring-assignment */
import { useState, FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'web/src/components/Box/Box';
import { useT } from 'web/src/hooks/useT';
import { entropyPasswordFetch } from 'web/src/modules/user/auth/actions';
import { PasswordStrengthMeter } from 'web/src/components/PasswordStrengthMeter';
import { passwordMinEntropy } from 'web/src/api/config';
import { selectCurrentPasswordEntropy } from 'web/src/modules/user/auth/selectors';
import { PasswordInput } from 'web/src/components/Input/PasswordInput';

interface Props {
  className?: string | undefined;
  label: string;
  labelVisible?: boolean | undefined;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  error?: string | undefined;
}

export const PasswordWithMeter: FC<Props> = (props) => {
  const [passwordPopUp, setPasswordPopUp] = useState(false);
  const timeout = useRef<number>();
  const dispatch = useDispatch();
  const t = useT();
  const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);

  useEffect(() => {
    return () => window.clearTimeout(timeout.current);
  }, [dispatch]);

  const handleChange = (v: string) => {
    props.onChange(v);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      dispatch(entropyPasswordFetch({ password: v }));
    }, 500);
  };

  return (
    <Box col className={props.className}>
      <PasswordInput
        autoComplete="off"
        label={props.label}
        labelVisible={props.labelVisible}
        value={props.value}
        onChange={handleChange}
        onFocus={() => setPasswordPopUp(true)}
        onBlur={() => setPasswordPopUp(false)}
        autoFocus={props.autoFocus}
        error={props.error}
      />
      <PasswordStrengthMeter
        minPasswordEntropy={passwordMinEntropy()}
        currentPasswordEntropy={currentPasswordEntropy}
        password={props.value}
        passwordPopUp={passwordPopUp}
        translate={t}
      />
    </Box>
  );
};
