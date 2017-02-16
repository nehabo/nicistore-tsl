import React from 'react';
import Table from '../../common/views/table/table';
import Button from '../../common/input/button';
// import { computeTotalPrice } from '../../lib/utils';

class Cart extends React.Component {
  // const totalPrice = computeTotalPrice(props.data);
  render() {
    const totalPrice = 50;
    return (
      <div className="cart-page">
        <h2>Diagnostics Selected</h2>
        <Table
          headers={this.props.headers}
          data={this.props.data}
        />
        <h4>TOTAL <b>Rs. {totalPrice}</b></h4>
        <Button className="btn purchase" onClick={this.props.onClick}>Checkout</Button>
      </div>
    );
  }
}

export default Cart;
