import * as React from 'react';
import { MarketSelectorTab } from 'src/containers/MarketSelector/MarketSelectorTabs/MarketSelectorTab';
import { DocumentationEndpoints, DocumentationHeader, DocumentationModels } from '../../components';
import { useDocumentationFetch } from '../../hooks';

export const DocumentationScreen: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState('0');

    return (
        <div className="pg-documentation">
            <div className="pg-documentation__content">
                <div className='cr-row'>
                    <MarketSelectorTab id="0" onClick={setActiveTab} activeId={activeTab}>
                        {'API'}
                    </MarketSelectorTab>
                    <MarketSelectorTab id="1" onClick={setActiveTab} activeId={activeTab}>
                        {'Swagger UI'}
                    </MarketSelectorTab>
                </div>
                {activeTab === '0' && <Doc />}
                {activeTab === '1' && (
                    <React.Suspense fallback>
                        <Swagger />
                    </React.Suspense>
                )}
            </div>
        </div>
    );
};

const Doc: React.FC = () => {
    useDocumentationFetch();
    return (
        <>
            <DocumentationHeader />
            <DocumentationEndpoints />
            <DocumentationModels />
        </>
    );
};

const Swagger = React.lazy(() =>
    import(/* webpackChunkName: "swagger" */ './Swagger').then(m => ({ default: m.Swagger }))
);
