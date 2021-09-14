import * as React from 'react';

import Markdown from 'markdown-to-jsx';

import websocket_api from './websocket_api.md';

export const WebSocket: React.FC = () => {
    return <Markdown>{websocket_api}</Markdown>;
};
