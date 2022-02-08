import { FC } from 'react';

interface Props {
  href: string;
}

export const ExternalLink: FC<Props> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);
