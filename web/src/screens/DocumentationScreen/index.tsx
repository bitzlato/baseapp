import { FC, Suspense, lazy } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'src/components/Tabs';

import { DocumentationEndpoints, DocumentationHeader, DocumentationModels } from '../../components';
import { useDocumentationFetch } from '../../hooks';

export const DocumentationScreen: FC = () => (
  <div className="pg-documentation">
    <div className="pg-documentation__content">
      <Tabs defaultValue="0">
        <TabList>
          <Tab size="large" value="0">
            API
          </Tab>
          <Tab size="large" value="1">
            Swagger UI
          </Tab>
          <Tab size="large" value="2">
            WebSocket API
          </Tab>
        </TabList>
        <TabPanel value="0">
          <ApiDoc />
        </TabPanel>
        <TabPanel value="1">
          <Suspense fallback>
            <Swagger />
          </Suspense>
        </TabPanel>
        <TabPanel value="2">
          <Suspense fallback>
            <WebSocketApi />
          </Suspense>
        </TabPanel>
      </Tabs>
    </div>
  </div>
);

const ApiDoc: FC = () => {
  useDocumentationFetch();

  return (
    <>
      <DocumentationHeader />
      <DocumentationEndpoints />
      <DocumentationModels />
    </>
  );
};

const Swagger = lazy(() => import('marketDocs/Swagger'));

const WebSocketApi = lazy(() => import('marketDocs/WebSocketApi'));
