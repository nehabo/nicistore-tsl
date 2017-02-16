import React from 'react';
import { geolocated } from 'react-geolocated';

class LocateMe extends React.Component {
  handleClick(event) {
    event.preventDefault();
    const coords = this.props.coords;
    this.props.onClick(coords);
  }

  render() {
    return (
      <a href="#" onClick={event => this.handleClick(event)}>
        <i className="fa fa-location-arrow" />
        Locate Me
      </a>
    );
  }
}

LocateMe.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(LocateMe);
