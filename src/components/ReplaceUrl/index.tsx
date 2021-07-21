import React from 'react';

interface Props {
    url: string;
}

export const ReplaceUrl: React.FC<Props> = ({ url }) => {
    window.location.replace(url);

    return null;
};
