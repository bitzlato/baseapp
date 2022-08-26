import { FC, Suspense } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'web/src/components/Tabs';
import { lazyRetry } from 'web/src/helpers/lazyRetry';
import {
  DocumentationEndpoints,
  DocumentationHeader,
  DocumentationModels,
} from 'web/src/components';
import { useDocumentationFetch } from 'web/src/hooks';

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

const Swagger = lazyRetry(() => import('marketDocs/Swagger'));

const WebSocketApi = lazyRetry(() => import('marketDocs/WebSocketApi'));

export const DocumentationScreen: FC = () => (
  <div className="pg-documentation">
    <div className="pg-documentation__content">
      <Tabs defaultValue="0">
        <TabList>
          <Tab size="large" value="0">
            Peatio API
          </Tab>
          <Tab size="large" value="1">
            Peatio Swagger UI
          </Tab>
          <Tab size="large" value="2">
            WebSocket API
          </Tab>
          <Tab size="large" value="3">
            P2P Swagger UI
          </Tab>
        </TabList>
        <TabPanel value="0">
          <ApiDoc />
        </TabPanel>
        <TabPanel value="1">
          <Suspense fallback>
            <Swagger url="api/v2/peatio/swagger" />
          </Suspense>
        </TabPanel>
        <TabPanel value="2">
          <Suspense fallback>
            <WebSocketApi />
          </Suspense>
        </TabPanel>
        <TabPanel value="3">
          <Suspense fallback>
            <Swagger url="v2/api-docs?group=default" />
          </Suspense>
        </TabPanel>
      </Tabs>
    </div>
  </div>
);
