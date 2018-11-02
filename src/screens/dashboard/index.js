import React, { Component } from 'react';
import './index.css';
import db from '../../config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../../config/routes';
import MenuAppBar from '../../components/appBarSetPro';
import SimpleExpansionPanel from '../../components/expandablePanel';
import SimpleExpansionPanel2 from '../../components/expandablePanel2';
import CircularIndeterminate from '../../components/progress';
import SwipeableTemporaryDrawer from '../../components/swipableDrawer';


// const messaging = firebase.messaging();

// messaging.onMessage(payload => {
//   console.log('messagePayload*********',payload);
// });

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      pageName: 'Dashboard',
      loading: true,
      meetUpData: [],
      meetUpData2: [],
      showUR: false,
      showMR: false
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
  this.getMeetups2();
  // this.messageToken();
}
// messageToken = () => {
//   messaging.requestPermission()
//   .then(() => {
//     console.log('accepted');
//     console.log(messaging);
//     return messaging.getToken();
//   })
//   .then(res => {
//     console.log(res);
//    })
//   .catch(error => {
//     console.log(error);
//   })
// }
getMeetups = () => {
  let { meetUpData,loading } = this.state;
  var myId = localStorage.getItem('meetingAppUserId');
  // console.log(myId);
  db.collection('meetUps').where("meetUPWithId", "==", myId).onSnapshot(res => {
    let newArr = [];
    console.log(res);
    // this.state.meetUpData = [];
    // this.setState({meetUpData: []},() => {
      console.log(meetUpData);
      res.forEach(resp => {
        newArr.push(resp.data());
        console.log(resp.data());
      });
      
      // })
      
      console.log(newArr)
      this.setState({meetUpData: newArr,loading: false});

    });
    // setInterval(() => {
    //   this.setState({loading: false});
    // },5000)
    // this.setState({loading: false});

}
getMeetups2 = () => {
  let { meetUpData2,loading } = this.state;
  var myId = localStorage.getItem('meetingAppUserId');
  // console.log(myId);
  db.collection('meetUps').where("userId", "==", myId).onSnapshot(res => {
    let newArr = [];
    console.log(res);
    // this.state.meetUpData = [];
    // this.setState({meetUpData: []},() => {
      console.log(meetUpData2);
      res.forEach(resp => {
        newArr.push(resp.data());
        console.log(resp.data());
      });
      
      // })
      
      console.log(newArr)
      this.setState({meetUpData2: newArr,loading: false});

    });

}
   
    render() {
     let { pageName,meetUpData,meetUpData2,loading,showUR,showMR } = this.state;
     console.log(meetUpData);
      return (
       <div>
        <MenuAppBar barName={pageName} /> 
         {loading && <CircularIndeterminate />}
         {!loading && meetUpData.length && <div style={{backgroundColor : "#3f51b5b0"}} onClick={() => {this.setState({showUR: !showUR})}}>
         <hr />
         <h4>Requests From Users !</h4>
         <hr />
         </div>}
         {!loading && meetUpData.length && showUR && <SimpleExpansionPanel meetUpData={meetUpData} />}
          {/* {meetUpData && <SimpleExpansionPanel />} */}
          {!loading && !meetUpData.length && <div className="setProPos">
         <h4>“You haven't done any meeting yet!”</h4>
         <button
         className="button"
         onClick={() => {
           this.props.history.push('/meetingScreen');
         }
         }>
         “Set a meeting!”
         </button>
         </div>}
         {/* <SwipeableTemporaryDrawer /> */}
         {/* <button onClick={() => {
           this.props.history.push('/direction');
         }}>get direction</button>
         <button onClick={() => {
           this.props.history.push('/dir');
         }}>get dir</button> */}

         {!loading && meetUpData.length && <div style={{backgroundColor : "#7a87cc8f"}} onClick={() => {this.setState({showMR: !showMR})}}>
         <hr />
         <h4>Sended Requests !</h4>
         <hr />
         </div>}
         {!loading && meetUpData.length && showMR && <SimpleExpansionPanel2 meetUpData={meetUpData2} />}

         {!loading && meetUpData.length && <div className="setProPos spp2">
         
         <button
         className="button b2"
         onClick={() => {
           this.props.history.push('/meetingScreen');
         }
         }>
         
         “Set more meetings!”
         </button>
         </div>}
       </div>
      );
    }
}
 
export default Dashboard;