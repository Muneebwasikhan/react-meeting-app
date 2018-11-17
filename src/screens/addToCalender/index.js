import React, { Component } from "react";
import "./index.css";
import { Upload, Icon, Modal } from "antd";
import "antd/dist/antd.css";
import db from "../../config/firebase";
import * as firebase from "firebase";
import MenuAppBar from '../../components/appBarSetPro';
import {connect} from 'react-redux';
import { setMeetingAppUserId,setMeetingAppUserName,setMeetingAppUserData} from '../../redux/actions/authActions';
import AddToCalendar from 'react-add-to-calendar';
import {withRouter} from 'react-router-dom';

class AddToCalender extends Component {
  constructor() {
    super();  
    this.state = {
      event: {
      },
      pageName:"Add event to calender"
    };
  }

  
  //------------------------------------RENDER()------------------------------------------
  render() {
    const {
      pageName
    } = this.state;

    return (
      <div>
        <MenuAppBar barName={pageName} />
        {/* <button onClick={() => {console.log(this)}}>chk</button> */}
          <div className="setProPos">
            {/* <h3>Set Profile</h3> */}
            <br />
           
            <AddToCalendar event={this.state.event}/>
            <button
                className="btn2"
              onClick={() => {
                this.props.history.push("/dashboard");
              }}
            >
            
              GO TO HOME
            </button>
            <button
                className="btn2"
              onClick={() => {
                
              }}
            >
            
              ADD TO CALENDER
            </button>
            

          </div>
        

        <hr />
        
      </div>
    );
  }

  //------------------------------------FUNCTIONS------------------------------------------

  
  
  componentDidMount(){
    console.log(this.props.data);
    var event = {
      title: 'Meeting Time With ' +this.props.data.meetUPWithData.nickName,
      description: 'you have a meetup with '+this.props.data.meetUPWithData.nickName+ " at "+this.props.data.location.venue.name ,
      location: this.props.data.location.venue.name,
      startTime:this.props.data.time
    }
    console.log(event);
    this.setState({event})
    
  }

}



const mapStateToProps = (state) => {
  return{
    data: state.authReducers.data,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCalender);
