import { FC, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { MarketName } from 'src/components/MarketName/MarketName';

import { TabPanel } from '../../components/TabPanel';
import { selectCurrentMarket } from '../../modules';
import { MarketDepthsComponent } from '../index';
import { TradingChart } from '../TradingChart/TradingChart';

export const Charts: FC = () => {
  const intl = useIntl();
  const currentMarket = useSelector(selectCurrentMarket);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const renderTabs = () => [
    {
      content: currentTabIndex === 0 ? <TradingChart /> : null,
      label: intl.formatMessage({ id: 'page.body.charts.tabs.chart' }),
    },
    {
      content: currentTabIndex === 1 ? <MarketDepthsComponent /> : null,
      label: intl.formatMessage({ id: 'page.body.charts.tabs.depth' }),
    },
  ];

  return (
    <div className="pg-charts">
      <TabPanel
        optionalHead={
          currentMarket?.name !== undefined ? <MarketName name={currentMarket.name} /> : null
        }
        panels={renderTabs()}
        currentTabIndex={currentTabIndex}
        onCurrentTabChange={setCurrentTabIndex}
      />
    </div>
  );
};
