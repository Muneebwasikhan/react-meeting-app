import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from '../src/config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../src/config/routes';
import NotificationScreen from './screens/notificationScreen';



class App extends Component {

 constructor(){
   super();
   this.state = {
     
   }
 }

//  hideNOtification=()=>{
// console.log("hide");
//  }

  render() {
    return (


      <div className="App ">
      <NotificationScreen />
         <Routes />
      </div>
    );
  }
}

export default App;