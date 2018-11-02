import React, { Component } from 'react'; 
import { Link, Redirect } from "react-router-dom"; 
import db from '../../config/firebase';
import * as firebase from 'firebase'; 
import './index.css';
import ButtonAppBar from '../../components/header';
import ContainedButtons from '../../components/button'
import logo from '../../assets/cma.png';
import MenuAppBar from '../../components/appBarSetPro';

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
          pageName: "LOGIN WITH FACEBOOK ",
          token: ""
        }
        this.login = this.login.bind(this);
      }
// ------------------RENDER------------------------------------------------
    render() { 
      const {pageName} = this.state;
        return ( 
            <div>
              <MenuAppBar barName={pageName} /> 
              {/* <ButtonAppBar /> */}
                {/* <h1>MEETING APPLICATION</h1> */}

                <div><img style={{maxWidth: "80%",marginTop: "50px"}} src={logo} /></div>
                <br />
          <button className="loginFbButton" onClick={this.login}>LOGIN WITH FACEBOOK</button>
            </div>
         );
    }

// ------------------FUNCTIONS------------------------------------------------


componentDidMount(){
  if(localStorage.getItem('meetingAppUserId') || localStorage.getItem('meetingAppUserName' )){
    
    this.props.history.push(`/setProfile`);
  }

  this.messageToken('dd');
}

messageToken = (id) => {
  
const messaging = firebase.messaging();
  messaging.requestPermission()
  .then(() => {
    console.log('accepted');
    console.log(messaging);
    return messaging.getToken();
  })
  .then(res => {
    console.log(res);
    this.setState({token: res});

   })
  .catch(error => {
    console.log(error);
  })
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
          email: user.email,
          uid: user.uid,
          token: th.state.token
        }).then(res => {
          console.log("added in db");
      localStorage.setItem("meetingAppUserId",user.uid);
      localStorage.setItem("meetingAppUserName",user.displayName);
      th.props.history.push(`/setProfile`);
        })
      }
      else{
        console.log("already present");
        db.collection("user").doc(user.uid).set({
          token: th.state.token
        },{merge: true}).then(resp => {
          console.log("added in db");
          localStorage.setItem("meetingAppUserId",user.uid);
          localStorage.setItem("meetingAppUserName",user.displayName);
          localStorage.setItem("meetingAppUserData",JSON.stringify(res.data()));
          th.props.history.push(`/setProfile`);
        })
      }
      
      return res;
    }).then(resp => {
      console.log(resp);
    })
  
  }).catch(function(error) {
    console.log(error);
  });
}


}
 
export default Login;