import React, { Component } from 'react'; 
import { Link, Redirect } from "react-router-dom"; 
import db from '../../config/firebase';
import * as firebase from 'firebase'; 
import './index.css';
import ButtonAppBar from '../../components/header';
import ContainedButtons from '../../components/button'

//--------GLOBALSS--------------


var provider = new firebase.auth.FacebookAuthProvider();
// provider.addScope('user_birthday');
// firebase.auth().languageCode = 'fr_FR';
// provider.setCustomParameters({
//   'display': 'popup'
// });

class Login extends Component {
    constructor(){
        super();
        this.state = {
        }
        this.login = this.login.bind(this);
      }
// ------------------RENDER------------------------------------------------
    render() { 
        return ( 
            <div className="backImg">
              <ButtonAppBar />
                <h1>MEETING APPLICATION</h1>
          <button className="loginFbButton" onClick={this.login}>LOGIN WITH FACEBOOK</button>
            </div>
         );
    }

// ------------------FUNCTIONS------------------------------------------------


componentDidMount(){
  if(localStorage.getItem('meetingAppUserId') || localStorage.getItem('meetingAppUserName' )){
    
    this.props.history.push(`/setProfile`);
  }
}


login(){
  const th = this;
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    // console.log(db.collection("user").doc().get());
    db.collection("user").doc(user.uid).get().then(res => {
      console.log(res.data());
      if(!res.data()){
        db.collection("user").doc(user.uid).set({
          name: user.displayName,
          email: user.email
        }).then(res => {
          console.log("added in db");
          
      localStorage.setItem("meetingAppUserId",user.uid);
      localStorage.setItem("meetingAppUserName",user.displayName);
      th.props.history.push(`/setProfile`);
        })
      }
      else{
        console.log("already present");
        
      localStorage.setItem("meetingAppUserId",user.uid);
      localStorage.setItem("meetingAppUserName",user.displayName);
      localStorage.setItem("meetingAppUserData",JSON.stringify(res.data()));
      th.props.history.push(`/setProfile`);
      }
      
      return res;
    }).then(resp => {
      console.log(resp);
    })
  
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}


}
 
export default Login;