import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import db from '../../config/firebase';
import * as firebase from 'firebase'; 
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Routes from '../../config/routes';
import swal from 'sweetalert';
import SimpleList from '../../components/list';
import PrimarySearchAppBar from '../../components/appBarSearch';
import DateTimePicker from '../../components/dateTimePicker';




class MeetUpLoc extends Component {
  constructor(){
    super();
    this.state = {
      nearLocations : null,
      text: "",
      showDTPicker: false,
      // moment: moment()
    }
  }


  
  showPicker(){
    this.setState({showDTPicker: true});
  }
  disablePicker(){
    this.setState({showDTPicker: false});

  }

  searchFunc=(res)=>{
    console.log(res);
    this.setState({text: res},()=>{
      this.getVenues();
    });
    

  }
componentDidMount() {
  
  this.setState({data: this.props.location.state[0]},()=>{
    console.log(this.state.data);
    this.getVenues();

  })

}



getTime = (res) => {
  const { forDb } = this.state;
  const th = this;
  console.log('getTime****************');
  console.log(res._d);
  forDb.time = res._d;
  forDb.status = 'Pending';
  
  this.setState({forDb},() => {
    console.log(forDb);
    db.collection('meetUps').doc().set(forDb).then(res => {
      console.log('added to db');
      th.props.history.replace("/dashboard");
    }).then(res => {



      var key = 'AIzaSyBZbCXphJzY5jdA5kuo_Ljbd9OHUijmCws';
	var notification = {
	'title': "Let's have a new Meetup",
	'body': "Meetup request from " + forDb,
	'icon': forDb.meetUPWithData.imgList[0],
	'click_action': "/dashboard"
};
			fetch('https://fcm.googleapis.com/fcm/send', {
	'method': 'POST',
	'headers': {
		'Authorization': 'key=' + key,
		'Content-Type': 'application/json'
	},
	'body': JSON.stringify({
		'notification': notification,
		'to': forDb.meetUPWithData.token
	})
}).then(function(response) {
	console.log(response);
}).catch(function(error) {
	console.error(error);
});




    })
  })
}

clickedLocation=(res)=>{
  const { data } = this.state;
swal(`“Are your sure for this location”`, {
  buttons: {
    direction: {
      text: "Get Direction",
      value: "get_direction",
    },
    yes: {
      text: "Yes",
      value: "yes",
    },
    cancel: "Cancel",
  },
})
.then((value) => {
  
  if(value == 'get_direction'){
    console.log('get_direction');
  }
  else if(value == 'yes'){
    console.log('yes');
    console.log(data.userData);
    console.log(res);
    this.setState({forDb: {userId: data.myData.uid,userData: data.myData,meetUPWithId: data.userData.uid,meetUPWithData: data.userData,location: res}},()=>{
      this.showPicker();
    });
  }
  else{
    console.log('else');
  }
  
});
}

getVenues=()=>{
  const { data,text,nearLocations } = this.state;
  console.log(data.myData.location.latitude);
  const endPoing = 'https://api.foursquare.com/v2/venues/explore?';
      const params = {
        client_id: 'SOAJ33EDA1HZAQD0G3XCISOPKH143ALGVQUI41PJD54J30QA',
        client_secret: 'JTGWAIFEQKNOQJLHCTYDNVB3VGTI3QS3UACLV4N12H41GR03',
        ll: `${data.myData.location.latitude},${data.myData.location.longitude}`,
        query: text,
        v: "20182507"
      };
      axios.get(endPoing + new URLSearchParams(params)).then(resp => {
        if(text == ""){
          this.setState({nearLocations:resp.data.response.groups[0].items.slice(0,3)},
            ()=>{
              console.log(nearLocations);
              this.setState({show: true})
            });
        }else{
          
        this.setState({nearLocations:resp.data.response.groups[0].items},
          ()=>{
            console.log(nearLocations);
            this.setState({show: true})
          });
        }
        
      })
}


   
    render() {
     const {nearLocations,show,showDTPicker} = this.state;

      return (
       <div>
         <PrimarySearchAppBar searchFunc={(res) => {this.searchFunc(res)}} />
        {show && <SimpleList locations={ nearLocations } clickedLocation={(res) => {this.clickedLocation(res)}} />} 
        
{
  showDTPicker && <DateTimePicker disablePicker={() => {this.disablePicker()}} getTime={(res) => {this.getTime(res)}}/>
}
      
        {this.state.date && <p>{this.state.date}</p>}
       </div>
      );
    }
}
 
export default MeetUpLoc;