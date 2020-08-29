import React from "react";
import L from 'leaflet';


function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
}

class Leaflet extends React.Component{
  constructor(props) {
    super(props);
    this.myStyle = {
      weight: 2,
      color: "#999",
      opacity: 1,
      fillColor: "#c00",
      fillOpacity: 0.8
    };
    this.mapRef = React.createRef();
  }
  componentDidMount() {
    this.map = L.map(this.mapRef.current);
    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.fitBounds(this.props.bounds);
    this.layer = L.geoJSON(this.props.features, {
      onEachFeature,
      style: this.myStyle
    }).addTo(this.map);
  }
  shouldComponentUpdate(nextProps, nextState){
    this.map.removeLayer(this.layer);
    this.layer = L.geoJSON(nextProps.features, {
      onEachFeature,
      style: this.myStyle
    }).addTo(this.map);
    return false;
  }
  render() {
    return <div id="map" ref={this.mapRef} />;
  }
}

export default Leaflet;
