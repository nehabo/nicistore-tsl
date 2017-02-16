import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  }

  render() {
    return (
      <div className={this.props.wrapperClass}>
        <button
          className={this.props.className}
          style={this.props.style}
          value={this.props.value}
          type={this.props.type}
          onClick={this.handleClick}
        >{this.props.children}
        </button>
      </div>
    );
  }
}

Button.defaultProps = {
  type: 'button',
  children: '',
  className: 'btn submit',
  wrapperClass: '',
  value: '',
  onClick: () => {},
};

Button.propTypes = {
  onClick: React.PropTypes.func,
  wrapperClass: React.PropTypes.string,
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  type: React.PropTypes.string,
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

export default Button;
