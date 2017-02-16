import React from 'react';

import { HOC } from 'formsy-react';

class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.setValue(value);
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        {this.props.options.map(item =>
          <div className="radio-container">
            <input
              id={item.name}
              className={`radio ${item.name}`}
              type="radio"
              value={item.value}
              onChange={this.handleChange}
              name={this.props.name}
              checked={this.props.checked}
            />
            <label htmlFor={item.name} />
          </div>,
        )}
      </div>
    );
  }
}

Radio.defaultProps = {
  onChange: () => {},
  name: '',
};

Radio.propTypes = {
  onChange: React.PropTypes.func,
  options: React.PropTypes.func.isRequired,
  name: React.PropTypes.string,
  checked: React.PropTypes.bool.isRequired,
  setValue: React.PropTypes.func.isRequired,
};

export default HOC(Radio);
