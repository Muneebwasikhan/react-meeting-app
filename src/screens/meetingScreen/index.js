import React, { Component } from "react";
import "./index.css";
import db from "../../config/firebase";
import axios from 'axios';
import {Carousel} from 'react-bootstrap';
import * as firebase from "firebase";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Routes from "../../config/routes";
import Swing from "react-swing";
import Cards, { Card } from "react-swipe-deck";
import CardComponent from "../../components/cardComponent";
import Example from "../../components/Carousel";



class MeetingScreen extends Component {
  constructor() {
    super();
    this.state = {
      list:[],
      myData:{},
      chkResA:true, 
      chkResB:true, 
    };

    this.getMyData();
  }

  logout=()=>{
    const th = this;
    firebase.auth().signOut().then(function (res) {
      localStorage.clear();
      console.log('logedOut');
      th.props.history.replace("/");
    console.log(this.props);
    }).catch(function (error) {
      console.log(error + ' -----> logouttttt');
    });
    // this.props.history.replace("/");
  }
  getData(){
    const { list,myData,chkResA,chkResB } = this.state;
    db.collection('user').get().then(resp => {
      resp.forEach(res => {

        if(res.data().email !== myData.email){
          console.log('NOt matched************************');
          
        const data = res.data();
        // console.log(myData.baverages);
        var promise1 = new Promise((resolve, reject) => {
          for(var i=0;i<data.baverages.length;i++){
          var res = data.baverages[i];
            console.log(chkResA);
              if(chkResA){
                if((data.baverages).indexOf(res) >= 0){
                  console.log('baverage mached****',res);
                  this.setState({chkResA: false});

                  resolve('matched');
                  break;
                }
                else if(i == myData.baverages.length - 1){
                  resolve('notMatched');
                }
              }
          }
        });
        
        promise1.then(value => {
          console.log(value);
          if(value !== 'matched'){
            var promise2 = new Promise((resolve, reject) => {
              for(var i=0;i<data.duration.length;i++){
              var res = data.duration[i];
                console.log(chkResB);
                  if(chkResB){
                    if((data.duration).indexOf(res) >= 0){
                      console.log('baverage mached****',res);
                      this.setState({chkResB: false});
    
                      resolve('matched');
                      break;
                    }
                    else if(i == myData.duration.length - 1){
                      resolve('notMatched');
                    }
                  }
              }
            });
            promise2.then(value => {
              if(value == 'matched'){
                list.push(res.data());
              }
            })
          }
          else  if(value == 'matched'){
            list.push(res.data());
          }
          
        });
        
      }
      })
    }
    
    ).then(res => {
      this.setState({list});
      console.log(list);
    }).catch(res => {
      console.log(res);
    })
  }
  getMyData(){
    this.state.myData = JSON.parse(localStorage.getItem('meetingAppUserData'));
    console.log(this.state.myData);
  }
componentDidMount() {
  this.getData();
}
meetuplocation=(res)=>{
  console.log(res);
  this.props.history.push(res.location,[res]);
}

  render() {
    const { list } = this.state;
    return (
      <div>
        {/* <Example /> */}
        <h1>Meeting Screen</h1>
        {list.length && 
        <CardComponent list={list} meetuplocation={(res) => this.meetuplocation(res)}/>
        }
        <button onClick={() => {this.logout()}}>LOGOUT</button>
       


      </div>
    );
  }
}

export default MeetingScreen;
