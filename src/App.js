import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from '../src/config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../src/config/routes';
import NotificationScreen from './screens/notificationScreen';
import {Provider} from 'react-redux';
import {store,persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';



class App extends Component {

 constructor(){
   super();
   this.state = {
     
   }
 }


  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <div className="App ">
      <NotificationScreen />
         <Routes />
      </div>
      </PersistGate>
      </Provider>
    );
  }
}

export default App;