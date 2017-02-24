/**
 * Imports
 */
import React from 'react';
// import {FormattedMessage, FormattedNumber} from 'react-intl';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import Breakpoint from '../../core/Breakpoint';
import Text from '../../common/typography/Text';

// Translation data for this component
import intlData from './OrderSummary.intl';

/**
 * Component
 */
class OrderSummary extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./OrderSummary.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);

        //
        // Return
        //
        return (
            <div className="order-summary">
                <div className="order-summary__list">
                    <div className="order-summary__row order-summary__item-labels">
                        <div className="order-summary__list-name">
                            <Text size="small">
                              {intlStore.getMessage(intlData, 'name')}
                            </Text>
                        </div>
                        <div className="order-summary__list-quantity-price">
                            <Text size="small">
                              {intlStore.getMessage(intlData, 'quantityAndPrice')}
                            </Text>
                        </div>
                        <div className="order-summary__list-total">
                            <Text size="small">
                              {intlStore.getMessage(intlData, 'total')}
                            </Text>
                        </div>
                    </div>
                    {this.props.checkout.cart.products.map(function (product, idx) {
                        return (
                            <div key={idx} className="order-summary__row order-summary__item">
                                <div className="order-summary__list-name">
                                    <Breakpoint point="handhelds">
                                        <Text size="small">
                                            {intlStore.getMessage(product.details.name)}
                                        </Text>
                                    </Breakpoint>
                                    <Breakpoint point="medium-screens">
                                        <Text>
                                            {intlStore.getMessage(product.details.name)}
                                        </Text>
                                    </Breakpoint>
                                    <Breakpoint point="wide-screens">
                                        <Text>
                                            {intlStore.getMessage(product.details.name)}
                                        </Text>
                                    </Breakpoint>
                                </div>
                                <div className="order-summary__list-quantity-price">
                                    <Text>
                                        {product.quantity}
                                    </Text>
                                    &nbsp;x&nbsp;
                                    <Text>
                                      {product.details.pricing.retail}
                                    </Text>
                                </div>
                                <div className="order-summary__list-total">
                                    <Text>
                                    {product.quantity * product.details.pricing.retail}
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="order-summary__totals">
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text>
                              {intlStore.getMessage(intlData, 'subTotal')}
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            <Text>
                              ${this.props.checkout.subTotal}
                            </Text>
                        </div>
                    </div>
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text>
                                {intlStore.getMessage(intlData, 'shipping')}
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            {this.props.checkout.hasOwnProperty('shippingCost') ?
                                <Text>
                                  {this.props.checkout.shippingCost}
                                </Text>
                                :
                                <Text>-</Text>
                            }
                        </div>
                    </div>
                    <div className="order-summary__row">
                        <div className="order-summary__totals-label">
                            <Text weight="bold">
                                {intlStore.getMessage(intlData, 'total')}
                            </Text>
                        </div>
                        <div className="order-summary__totals-value">
                            <Text weight="bold">
                              ${this.props.checkout.total}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Exports
 */
export default OrderSummary;
