import React, { PureComponent, PropTypes } from 'react';
import { immutableChildrenToJS } from 'binary-utils';
import { P } from 'binary-components';
import { actions } from '../_store';
import TradeViewChart from './trade-chart/TradeViewChart';
import TradeParams from '../trade-params/TradeParams';
import ContractReceipt from '../contract-details/ContractReceipt';

type Props = {
    compact: boolean,
    contractReceiptProps: Object,
    chartProps: Object,
    index: number,
    paramsProps: Object,
};

export default class TradeCard extends PureComponent {

    props: Props;
    shouldFireZoomEvent: boolean;

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    constructor(props: Props) {
        super(props);
        this.shouldFireZoomEvent = false;
    }

    componentDidUpdate(prevProps) {
        // ugly hack to ensure event is fired after chart is back to trade view
        if (prevProps.contractReceiptProps && !this.props.contractReceiptProps && this.shouldFireZoomEvent) {
            this.fireZoomEvent();
            this.shouldFireZoomEvent = false;
        }
    }

    tradeAgain = () => {
        const { index } = this.props;
        actions.closeContractReceipt(index);
        this.shouldFireZoomEvent = true;
    }

    fireZoomEvent = () => {
        const { index } = this.props;
        const domID = `trade-chart${index}`;
        const zoomToLatestEv = new CustomEvent('zoom-to-latest');
        document.getElementById(domID).dispatchEvent(zoomToLatestEv);
    }

    sellAtMarket = () => {
        const { contractReceiptProps } = this.props;
        actions.sellContract(contractReceiptProps.toJS().contract_id, 0);
    }

    render() {
        const { chartProps, contractReceiptProps, compact, paramsProps } = this.props;
        const contractReceiptInJS = contractReceiptProps && contractReceiptProps.toJS();
        if (contractReceiptInJS && Object.keys(contractReceiptInJS).length === 0) {
            return <P text="Asset not available" />;
        }

        return (
            <div className="trade-panel">
                <div className="trade-chart-container">
                    <TradeViewChart {...immutableChildrenToJS(chartProps)} />
                </div>
                {contractReceiptInJS &&
                    <ContractReceipt
                        contract={contractReceiptInJS}
                        showLongcode
                        onTradeAgainClicked={this.tradeAgain}
                    />
                }
                {paramsProps.tradeParams &&
                    <TradeParams
                        {...immutableChildrenToJS(paramsProps)}
                        compact={compact}
                        style={contractReceiptInJS ? { display: 'none' } : undefined}
                    />
                }
            </div>
        );
    }
}
