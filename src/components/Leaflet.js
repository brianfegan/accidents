import React from "react";
import L from 'leaflet';

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
    //this.mapRef = React.createRef();
  }
  componentDidMount() {
    //console.log(this.mapRef);
    this.map = L.map(this.refs.leaflet_map);
    L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.fitBounds(this.props.bounds);
    this.layer = L.geoJSON(this.props.features, {
      style: this.myStyle
    }).addTo(this.map);
  }
  shouldComponentUpdate(nextProps){
    this.map.removeLayer(this.layer);
    this.layer = L.geoJSON(nextProps.features, {
      style: this.myStyle
    }).addTo(this.map);
    return false;
  }
  render() {
    return <div id="map" ref="leaflet_map" />;
  }
}

export default Leaflet;
