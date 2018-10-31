import React, { Component } from 'react';
import './index.css';
import db from '../../config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../../config/routes';
import MenuAppBar from '../../components/appBarSetPro';
import SimpleExpansionPanel from '../../components/expandablePanel';



class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      pageName: 'Dashboard'
    }
  }
  getMyData(){
    const { list } = this.state;
    var myId = localStorage.getItem('meetingAppUserId');
    db.collection('user').doc(myId).get().then(resp => {
      console.log(resp.data());
      localStorage.setItem('meetingAppUserData',JSON.stringify(resp.data()));
    })
    .catch(res => {
      console.log(res);
    })
  }
componentDidMount() {
  this.getMyData();
  this.getMeetups();
}

getMeetups(){
  var myId = localStorage.getItem('meetingAppUserId');
  db.collection('meetUps').where("meetUPWithId", "==", myId).onSnapshot(res => {
    res.forEach(resp => {
      if(resp.data().status == "Pending"){
        console.log('Pending****');
        console.log(resp.data());
      }
      if(resp.data().status == "Accepted"){
        console.log('Accepted****');
        console.log(resp.data());
      }
      if(resp.data().status == "Canceled"){
        console.log('Canceled****');
        console.log(resp.data());
      }
      if(resp.data().status == "Done"){
        console.log('Done****');
        console.log(resp.data());
      }
    })
  })
}
   
    render() {
     const { pageName } = this.state;
      return (
       <div>
         <MenuAppBar barName={pageName} />
         <SimpleExpansionPanel />
         <div className="setProPos">
         <h4>“You haven't done any meeting yet!”</h4>
         <button
         className="button"
         onClick={() => {
           this.props.history.push('/meetingScreen');
         }
         }>
         “Set a meeting!”
         </button>
         </div>
         
       </div>
      );
    }
}
 
export default Dashboard;