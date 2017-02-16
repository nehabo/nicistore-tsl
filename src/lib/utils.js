import _ from 'lodash';

export const computeTotalPrice = (data) => {
  let totalPrice = 0;
  _.map(data, item =>
    totalPrice += parseInt(item.price),
  );
  return totalPrice;
};
