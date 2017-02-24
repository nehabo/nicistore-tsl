/**
 * Imports
 */
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
// import {FormattedMessage, FormattedNumber} from 'react-intl';
import {Link} from 'react-router';

// Flux
import IntlStore from '../../../stores/Application/IntlStore';

// Required components
import AddressPreview from '../forms/AddressPreview';
import Breakpoint from '../../core/Breakpoint';
import Heading from '../typography/Heading';
import Table from '../tables/Table';
import Text from '../typography/Text';

import OrderStatus from './OrderStatus';

// Translation data for this component
import intlData from './OrderDetails.intl';

/**
 * Component
 */
class OrderDetails extends React.Component {

    static contextTypes = {
        getStore: React.PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./OrderDetails.scss');
    }

    //*** Template ***//

    render() {

        //
        // Helper methods & variables
        //
        let intlStore = this.context.getStore(IntlStore);
        let routeParams = {locale: this.context.getStore(IntlStore).getCurrentLocale()}; // Base route params

        // Order products list table
        let headings = [
            intlStore.getMessage(intlData, 'nameHeading'),
            <span>ID</span>,
            intlStore.getMessage(intlData, 'skuHeading'),
            intlStore.getMessage(intlData, 'quantityHeading'),
            intlStore.getMessage(intlData, 'priceHeading'),
        ];
        let rows = this.props.order.checkout.cart.products.map((product) => {
            return {
                data: [
                    <Text size="medium">
                        {intlStore.getMessage(product.details.name)}
                    </Text>,
                    <span className="order-details__link">
                        <Link to="product" params={_.assign({productId: product.id}, routeParams)}>
                            <Text size="small">{product.id}</Text>
                        </Link>
                    </span>,
                    <Text size="medium">{product.details.sku}</Text>,
                    <Text size="medium">{product.quantity}</Text>,
                    <Text size="medium">{product.details.pricing.retail}</Text>,
                ]
            };
        });

        //
        // Return
        //
        return (
            <div className="order-details">
                <div className="order-details__overview">
                    {this.props.customerDetails !== false ?
                        <div className="order-details__overview-item">
                            <div className="order-details__overview-item-label">
                                <Text size="medium" weight="bold">
                                  {intlStore.getMessage(intlData, 'customer')}:
                                </Text>
                            </div>
                            <div className="order-details__overview-item-value">
                                <Text size="medium">
                                    {this.props.order.customer.name} ({this.props.order.customer.email})
                                    {this.props.order.customer.userId ?
                                        <span className="order-details__user-icon">
                                        <i className="fa fa-user" aria-hidden="true" />
                                    </span>
                                        :
                                        null
                                    }
                                </Text>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'createdAt')}:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <Text size="medium">
                                {moment(this.props.order.createdAt).format('YYYY/MM/DD HH:mm:ss')}
                            </Text>
                        </div>
                    </div>
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'id')}:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <Text size="small">
                                {this.props.order.id}
                            </Text>
                        </div>
                    </div>
                    <div className="order-details__overview-item">
                        <div className="order-details__overview-item-label">
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'status')}:
                            </Text>
                        </div>
                        <div className="order-details__overview-item-value">
                            <OrderStatus status={this.props.order.status} />
                        </div>
                    </div>
                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                      {intlStore.getMessage(intlData, 'billingDetails')}:
                    </Heading>
                    <div className="order-details__detail-content">
                        <div>
                            <AddressPreview address={this.props.order.checkout.billingAddress} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'paymentMethod')}:
                            </Text>
                            <br />
                            <Text size="medium">{this.props.order.checkout.paymentMethod}</Text>
                        </div>
                    </div>

                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                      {intlStore.getMessage(intlData, 'shippingDetails')}
                    </Heading>
                    <div className="order-details__detail-content">
                        <div>
                            <AddressPreview address={this.props.order.checkout.shippingAddress} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                {intlStore.getMessage(intlData, 'shippingMethod')}:
                            </Text>
                            <br />
                            <Text size="medium">{this.props.order.checkout.shippingMethod}</Text>
                            <br />
                            <br />
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'shippingCost')}:
                            </Text>
                            <br />
                            <Text size="medium">
                                ${this.props.order.checkout.shippingCost}
                            </Text>
                        </div>
                    </div>
                </div>
                <div className="order-details__detail">
                    <Heading size="medium">
                      {intlStore.getMessage(intlData, 'products')}
                    </Heading>
                    <div className="order-details__detail-content">
                        <Breakpoint point="handhelds">
                            {rows.map(function (row, idx) {
                                return (
                                    <div key={idx} className="order-details__product-block">
                                        <div className="order-details__product-name">
                                            {row.data[0]}
                                        </div>
                                        <div className="order-details__product-quantity">
                                            {row.data[3]}&nbsp;x&nbsp;{row.data[4]}
                                        </div>
                                    </div>
                                );
                            })}
                        </Breakpoint>
                        <Breakpoint point="medium-screens">
                            <Table headings={headings} rows={rows} />
                        </Breakpoint>
                        <Breakpoint point="wide-screens">
                            <Table headings={headings} rows={rows} />
                        </Breakpoint>
                    </div>
                    <div className="order-details__detail-content order-details__detail-content--column">
                        <div>
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'subTotal')}:
                            </Text>
                            <br />
                            ${this.props.order.checkout.subTotal}
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                {intlStore.getMessage(intlData, 'shipping')}:
                            </Text>
                            <br />
                            <FormattedNumber value={this.props.order.checkout.shippingCost}
                                             style="currency"
                                             currency={this.props.order.checkout.currency} />
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                                {intlStore.getMessage(intlData, 'vat')}:
                            </Text>
                            <br />
                            ${this.props.order.checkout.vatTotal}
                        </div>
                        <div>
                            <Text size="medium" weight="bold">
                              {intlStore.getMessage(intlData, 'total')}:
                            </Text>
                            <br />
                            ${this.props.order.checkout.total}
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
export default OrderDetails;
