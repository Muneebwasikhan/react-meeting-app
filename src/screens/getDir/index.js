/* eslint-disable no-undef */
/* global google */
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer, withScriptjs } from "react-google-maps"

class GetDir extends Component {
  constructor() {
    super()
    
    this.state = {
      coords: {},
      directions: {}
    };

    this.updateCoords = this.updateCoords.bind(this);
    this.updateDirections = this.updateDirections.bind(this);
    this.getDirections = this.getDirections.bind(this);
  }

  componentDidMount() {
    // this.setPosition();
    this.updateCoords({lat:24.84491585714221, lng:67.07121600502262});
    this.updateDirections({lat:24.8861479, lng:67.0595196});
  }


  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({coords: position.coords})
    });
  }

//   updateCoords({latitude, longitude}) {
//     this.setState({coords: {latitude, longitude}})
//   }
  updateCoords({lat, lng}) {
    this.setState({coords: {lat, lng}})
  }
  updateDirections({lat, lng}) {
    this.setState({coords: {lat, lng}})
  }

  getDirections() {
      const {coords,directions} = this.state;
    const DirectionsService = new google.maps.DirectionsService();
   
      DirectionsService.route({
        origin: new google.maps.LatLng(coords.lat, coords.lng),
        destination: new google.maps.LatLng(directions.lat, directions.lat),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          alert("Sorry! Can't calculate directions!")
        }
      });
  }

  render() {
    const {coords, directions} = this.state;
    
    return(
      <div>
        <MyMapComponent 
          isMarkerShown 
          coords={coords}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmoQ5z8cyXsRAbhczmpzjoE5hnGq8v3-k&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          directions={directions}
          />

          <button onClick={this.getDirections}><h1>Get Directions</h1></button>
      </div>
   )
 }

}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    center={props.coords}
  >

  <Marker position={props.coords} />
  <Marker position={props.directions} />

  {props.directions && <DirectionsRenderer directions={props.directions} />}

  </GoogleMap>
))

export default GetDir;