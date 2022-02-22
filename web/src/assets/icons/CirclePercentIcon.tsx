import { FC } from 'react';

interface CirclePercentIconProps {
  percent?: number | undefined | 25 | 50 | 75 | 100;
}

export const CirclePercentIcon: FC<JSX.IntrinsicElements['svg'] & CirclePercentIconProps> = ({
  percent,
  ...rest
}) => (
  <svg width="24" height="25" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <circle stroke="#DADADA" fill="none" cx="32" cy="32" r="32" />
    {percent === 75 && (
      <path
        fill="#DADADA"
        d="M32,0.57V32H0.57c0,17.36,14.07,31.43,31.43,31.43S63.43,49.36,63.43,32S49.36,0.57,32,0.57z"
      />
    )}
    {percent === 50 && (
      <path
        fill="#DADADA"
        d="M63.43,32C63.43,14.64,49.36,0.57,32,0.57v62.87C49.36,63.43,63.43,49.36,63.43,32z"
      />
    )}
    {percent === 25 && <path fill="#DADADA" d="M32,32h31.43C63.43,14.64,49.36,0.57,32,0.57V32z" />}
    {percent === 100 && <circle fill="#DADADA" cx="32" cy="32" r="32" />}
  </svg>
);
