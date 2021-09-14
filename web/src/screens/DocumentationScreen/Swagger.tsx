import * as React from 'react';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export const Swagger: React.FC = () => {
    return <SwaggerUI url="api/v2/peatio/swagger" />;
};
