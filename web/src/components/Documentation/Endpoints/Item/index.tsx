import * as React from 'react';
import { RequestTypeItem } from './RequestTypeItem';

interface ItemInterface {
  item: any;
  title: string;
}
export const DocumentationEndpointsItem: React.FC<ItemInterface> = (props: ItemInterface) => {
  const { title, item } = props;

  return (
    <div className="pg-documentation-item">
      <h2 className="text-transform--initial">{title}</h2>
      {item && Object.keys(item).length
        ? Object.keys(item).map((key) => <RequestTypeItem item={item[key]} key={key} title={key} />)
        : null}
    </div>
  );
};
