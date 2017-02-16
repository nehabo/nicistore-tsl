import BaseStore from 'fluxible/addons/BaseStore';
import _ from 'lodash';
import productActions from '../../constants/products';

class SearchStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.options = [];
    this.selected = [];
    this.products = [];
  }
  handleSelect(payload) {
    if (typeof payload.items == 'string') {
      return state;
    }
    const selected = _.uniq(this.selected.concat([payload.items]));
    const options = _.without(this.options, payload.items);
    this.selected = selected;
    this.options = options;
    this.emitChange();
  }
  handleRemove(payload) {
    if (!payload.items) return;
    const selectedOptions = _.uniq(_.without(this.selected, payload.items));
    const filteredOptions = this.options.concat([payload.items]);
    this.selected = selectedOptions;
    this.options = filteredOptions;
    this.emitChange();
  }
  handleInput(payload) {
    const filter = new RegExp(`^${payload.items}`, 'i');
    const filteredNames = _.filter(this.options, item =>
      filter.test(item.name.en),  // || filter.test(state.id);
    ).filter(item =>
        _.map(this.selected, filteredItem => filteredItem.name.en)
        .indexOf(item.name.en) === -1);
    this.options = filteredNames;
    this.emitChange();
  }
  getSearchData(payload) {
    console.log(payload);
    this.options = payload.items;
    this.emitChange();
  }
  handleCheckout(products) {
    this.products = products;
    this.emitChange();
  }
  getSelectedItems() {
    return this.selected;
  }
  getOptionsList() {
    return this.options;
  }
  getItems() {
    return this.products;
  }
  dehydrate() {
    return {
      selected: this.selected,
      options: this.options,
      products: this.products,
    };
  }
  rehydrate(state) {
    this.selected = state.selected;
    this.options = state.options;
    this.products = state.products;
  }
}

SearchStore.storeName = 'SearchStore';
SearchStore.handlers = {
  'HANDLE_SELECT': 'handleSelect',
  'HANDLE_REMOVE': 'handleRemove',
  'HANDLE_INPUT': 'handleInput',
  [productActions.PRODUCTS_FIND_SUCCESS]: 'getSearchData',
  'HANDLE_CHECKOUT': 'handleCheckout',
};

export default SearchStore;
