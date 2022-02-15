import { FC } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const Swagger: FC = () => {
  return <SwaggerUI url="api/v2/peatio/swagger" />;
};

export default Swagger;
