import React, { Component } from 'react';
import './index.css';
import db from '../../config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../../config/routes';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    // defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
  
    {props.isMarkerShown && <Marker
     draggable 
      position={{ lat: props.coords.latitude, lng: props.coords.longitude }}
      // position.latLng.lat
      onDragEnd = {(position) => {props.setPos(position.latLng.lat(),position.latLng.lng())}}
      // position={{ lat: -34.397, lng: 150.644 }}
      />}
  </GoogleMap>
  
));

class Map extends Component {
  constructor(){
    super();
    this.state = {
      coords : null,
    }
    this.setPos = this.setPos.bind(this);
  }
    componentDidMount(){
      this.getLocation();
    }
    getLocation(){
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords)
        var coord = position.coords;
        this.setState({coords: coord});
      });
    }
  
    setPos(latitude,longitude){
      console.log(latitude,longitude);
        // const {coords} = this.state;
        // var cor = coords;
        // cor.latitude = lat;
        // cor.longitude = lng;
      this.setState({coords: {latitude,longitude}});
    }
   
    render() {
      const { coords } = this.state;
      return (
        <div className="App ">
         <button className="mapBtn" onClick={() => {
           const myId = localStorage.getItem('meetingAppUserId');
           db.collection('user').doc(myId).set({location: coords},{merge:true}).then(res => {
             console.log('added to db'); 
           });
          //  console.log(coords);
         }}>SELECT</button>
          {coords && 
          <MyMapComponent
    isMarkerShown
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `100vh` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    coords={coords}
    setPos = {this.setPos}
    // draggable 
  />
   } 
        </div>
      );
    }
}
 
export default Map;