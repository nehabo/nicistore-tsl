import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const PopUpMap = withGoogleMap(
    props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={16}
        center={props.coordinates}
        onClick={props.onMapClick}
      >
        {props.markers.map(marker => (
          <Marker
            {...marker}
          />
        ))}
      </GoogleMap>
  ),
);

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.props.onMapClick(event.latLng);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  render() {
    return (
      <div className="map container" style={{ height: '300px', width: '1000px', left: '150px' }}>
        <PopUpMap
          containerElement={
            <div style={{ height: '300px', width: '1000px', align: 'center' }} />
          }
          mapElement={
            <div style={{ height: '300px', width: '1000px', align: 'center' }} />
          }
          onMapLoad={this.handleMapLoad}
          coordinates={this.props.coords}
          onMapClick={this.onClick}
          markers={this.props.markers}
        />
      </div>
    );
  }
}

Map.propTypes = {
  onMapClick: React.PropTypes.func.isRequired,
  coords: React.PropTypes.func.isRequired,
  markers: React.PropTypes.func.isRequired,
};

export default Map;
