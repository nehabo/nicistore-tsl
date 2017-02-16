import React from 'react';
import TokenInput, { Option } from 'react-tokeninput';
import _ from 'lodash';
import Options from './options';

class Selection extends React.Component {
  renderComboboxOptions() {
    return _.map(this.props.options, item =>
      (
        <Option
          key={item.id}
          value={item.name.en}
        >{item.name.en}</Option>
      ),
    );
  }

  render() {
    const options = this.props.options.length ?
      this.renderComboboxOptions() : [];
    return (
      <div className="container search">
        <div className="row">
          <TokenInput
            menuContent={options}
            onInput={this.props.onInput}
            onSelect={this.props.onSelect}
            onRemove={this.props.onRemove}
            selected={this.props.selected}
            placeholder="Add tests"
          />
        </div>
        <div className="row">
          <Options onSelect={this.props.onSelect} options={this.props.options || []} />
        </div>
      </div>
    );
  }
}

Selection.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onInput: React.PropTypes.func.isRequired,
  onSelect: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  selected: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default Selection;
