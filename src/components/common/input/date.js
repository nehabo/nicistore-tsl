import React from 'react';
import DatePicker from 'react-datepicker';
import { HOC } from 'formsy-react';

require('react-datepicker/dist/react-datepicker.css');

class Date extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.setValue(date);
    this.props.onChange(date);
  }

  render() {
    return (
      <div>
        <DatePicker
          className="textInput form-control"
          selected={this.props.getValue()}
          placeholderText={this.props.placeholder}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

Date.defaultProps = {
  onChange: () => {},
  placeholder: '',
};

Date.propTypes = {
  onChange: React.PropTypes.func,
  getValue: React.PropTypes.func.isRequired,
  setValue: React.PropTypes.func.isRequired,
  placeholder: React.PropTypes.string,
};

export default HOC(Date);
