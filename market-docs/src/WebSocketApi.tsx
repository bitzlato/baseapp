import Markdown from 'markdown-to-jsx';
import { FC, useEffect, useState } from 'react';

const DOC_API_URL =
  'https://raw.githubusercontent.com/bitzlato/peatio/master/docs/api/websocket_api.md';

const WebSocketApi: FC = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch(DOC_API_URL);
      const text = await response.text();

      setContent(text);
    })();
  }, []);

  return <Markdown>{content}</Markdown>;
};

export default WebSocketApi;
