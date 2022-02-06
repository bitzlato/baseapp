import * as React from 'react';
import Markdown from 'markdown-to-jsx';
import { makeRequest } from 'src/api/requestBuilder';

export const WebSocketApi: React.FC = () => {
  const [content, setContent] = React.useState('');
  React.useEffect(() => {
    makeRequest(
      {
        method: 'get',
        url: 'https://raw.githubusercontent.com/bitzlato/peatio/master/docs/api/websocket_api.md',
      },
      {} as any,
    ).then((d: any) => {
      setContent(d);
    });
  });
  return <Markdown>{content}</Markdown>;
};
