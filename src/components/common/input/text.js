import React from 'react';

import { HOC } from 'formsy-react';

class Text extends React.Component {
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
    const errorMessage = this.props.getErrorMessage();
    let className = '';
    if (this.props.hasValue() === false) {
      className = '';
    } else if (this.props.getErrorMessage() != null) {
      className = 'invalid';
    } else {
      className = 'valid';
    }
    return (
      <div>
        <input
          className={`textInput form-control ${className}`}
          value={this.props.getValue()}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          readOnly={this.props.readOnly}
        />
        <span className="validation-error">{errorMessage}</span>
      </div>
    );
  }
}

Text.defaultProps = {
  type: 'text',
  placeholder: '',
  onChange: () => {},
  readOnly: false,
};

Text.propTypes = {
  onChange: React.PropTypes.func,
  getValue: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
  getErrorMessage: React.PropTypes.func.isRequired,
  hasValue: React.PropTypes.func.isRequired,
  type: React.PropTypes.string,
  readOnly: React.PropTypes.bool,
};

export default HOC(Text);
