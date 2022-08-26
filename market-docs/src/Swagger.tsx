import { FC } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface Props {
  url: string;
}

const Swagger: FC<Props> = ({ url }) => {
  return <SwaggerUI url={url} />;
};

export default Swagger;
