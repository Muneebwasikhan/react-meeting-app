import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from '../src/config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../src/config/routes';



class App extends Component {

 

  // login(){
  //   firebase.auth().signInWithPopup(provider).then(function(result) {
  //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //     var token = result.credential.accessToken;
  //     // The signed-in user info.
  //     var user = result.user;
  //     console.log(user);
  //     // console.log(db.collection("user").doc().get());
  //     db.collection("user").doc(user.email).get().then(res => {
  //       console.log(res.data());
  //       if(!res.data()){
  //         db.collection("user").doc(user.email).set({
  //           name: user.displayName,
  //           email: user.email
  //         }).then(res => {
  //           console.log("added in db");
  //           localStorage.setItem("userId",user.email);
  //         })
  //       }
  //       else{
  //         console.log("already present");
  //       }
  //     })
    
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // The email of the user's account used.
  //     var email = error.email;
  //     // The firebase.auth.AuthCredential type that was used.
  //     var credential = error.credential;
  //     // ...
  //   });
  // }

  render() {
    return (
      <div className="App ">
         <Routes />
      </div>
    );
  }
}

export default App;