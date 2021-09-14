import * as React from 'react';
import { useIntl } from 'react-intl';
import { ParametersItem } from './ParametersItem';
import { ResponsesItem } from './ResponsesItem';

interface ItemInterface {
    item: any;
    title: string;
}

export const RequestTypeItem: React.FC<ItemInterface> = (props: ItemInterface) => {
    const { title, item } = props;
    const intl = useIntl();

    return (
        <div className="pg-documentation-item">
            <h2 className="text-transform--uppercase">{title}</h2>
            <h3>{intl.formatMessage({ id: 'page.documentation.endpoints.requestTypeItem.description.title' })}</h3>
            <span>{item.description}</span>
            <ParametersItem item={item} />
            <ResponsesItem item={item} />
        </div>
    );
};
