import classnames from 'classnames';
import * as React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import searchIcon from 'src/containers/ToolBar/icons/search.svg';
import {
  Market,
  RootState,
  selectCurrentMarket,
  selectMarketSelectorState,
} from '../../../modules';
import { MarketsList } from './MarketsList';
import { MarketsTabs } from './MarketsTabs';

interface ReduxProps {
  currentMarket?: Market | undefined;
  isOpen: boolean;
}

interface State {
  searchFieldValue: string;
  marketsTabsSelectedValue: string;
}

class MarketSelectorComponent extends React.Component<ReduxProps, State> {
  public readonly state = {
    searchFieldValue: '',
    marketsTabsSelectedValue: '',
  };

  public render() {
    const { isOpen } = this.props;
    const { searchFieldValue, marketsTabsSelectedValue } = this.state;

    const listClassName = classnames({
      'pg-trading-header-selector-list-container-open': isOpen,
      'pg-trading-header-selector-list-container-close': !isOpen,
    });
    const searchSelectorClassName = classnames({
      'pg-trading-header-selector-search': isOpen,
      'pg-trading-header-selector-search-closed': !isOpen,
    });

    return (
      <div className="pg-trading-header-selector-container">
        <div className={listClassName}>
          <MarketsTabs onSelect={this.marketsTabsSelectHandler} />
          <MarketsList search={searchFieldValue} currencyQuote={marketsTabsSelectedValue} />
          <div className="pg-trading-header-selector-search-wrapper">
            <div className={searchSelectorClassName}>
              <div className="pg-trading-header-selector-search-icon">
                <img alt="" src={searchIcon} />
              </div>
              <input
                className="pg-trading-header-selector-search-field"
                onChange={this.searchFieldChangeHandler}
                value={searchFieldValue}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private searchFieldChangeHandler = (e: any) => {
    this.setState({
      searchFieldValue: e.target.value,
    });
  };

  private marketsTabsSelectHandler = (value: string) => {
    this.setState({
      marketsTabsSelectedValue: value,
    });
  };
}

const reduxProps: MapStateToProps<ReduxProps, {}, RootState> = (state) => ({
  currentMarket: selectCurrentMarket(state),
  isOpen: selectMarketSelectorState(state),
});

export const MarketSelector = connect<ReduxProps, {}, {}, RootState>(reduxProps)(
  MarketSelectorComponent,
);
