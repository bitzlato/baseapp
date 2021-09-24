import { mount, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { SinonSpy, spy } from 'sinon';
import { Order, OrderComponentProps } from './';
import { TestComponentWrapper } from 'lib/test/wrapper';

// tslint:disable:no-magic-numbers

const defaultProps: OrderComponentProps = {
    onSubmit: spy(),
    priceMarketBuy: 5,
    priceMarketSell: 10,
    currentMarketAskPrecision: 4,
    currentMarketBidPrecision: 5,
    availableBase: 200,
    availableQuote: 12,
    from: 'btc',
    to: 'eth',
    asks: [['10', '1']],
    bids: [['10', '1']],
    currentMarketFilters: [],
    translate: jest.fn(),
};

const setup = (props: Partial<OrderComponentProps> = {}) =>
    shallow(
        <TestComponentWrapper>
            <Order {...{ ...defaultProps, ...props }} />
        </TestComponentWrapper>
    );

describe('Order', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    it('should match snapshot', () => {
        expect(wrapper.render()).toMatchSnapshot();
    });

    it('button should be disabled', () => {
        // tslint:disable: no-shadowed-variable
        const wrapper = mount(
            <TestComponentWrapper>
                <Order {...{ ...defaultProps }} />
            </TestComponentWrapper>
        );
        wrapper.find('input').at(2).simulate('click');
        expect((defaultProps.onSubmit as SinonSpy).calledOnceWith()).toBeFalsy();
        wrapper.unmount();
    });
});
