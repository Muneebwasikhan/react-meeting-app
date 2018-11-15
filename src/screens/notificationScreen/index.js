import React, { Component } from "react";
import "./index.css";
import db from "../../config/firebase";
import * as firebase from "firebase";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import Routes from "../../config/routes";
import MenuAppBar from "../../components/appBarSetPro";
import SimpleExpansionPanel from "../../components/expandablePanel";
import SimpleExpansionPanel2 from "../../components/expandablePanel2";
import CircularIndeterminate from "../../components/progress";
import SwipeableTemporaryDrawer from "../../components/swipableDrawer";

// const messaging = firebase.messaging();

// messaging.onMessage(payload => {
//   console.log('messagePayload*********',payload);
// });



class NotificationScreen extends Component {
  constructor() {
    super();
    this.state = {
      notificationScr: [],
      showNOt: true,
    };
    
  }


  componentDidMount() {
    // localStorage.setItem("notif","false");
    
      this.changeStatus();
    
    
  }

  changeStatus() {
    const {notificationScr,showNOt,firstTime} =this.state;
    const th = this;
    var userId = localStorage.getItem("meetingAppUserId");
    db.collection("meetUps")
      .where("meetUPWithId", "==", userId)
      // .where("userId", "==", userId)
      .onSnapshot(res => {
        const chk = localStorage.getItem("notif");
        const arr = [];
        if(chk == "true"){
          // this.state.showNOt =true;
         
        this.setState({showNOt:true},() => {
          console.log("dddd------------------")
        })
        }
        
        
        res.forEach(res => {
    localStorage.setItem("notif","true");

          console.log(res.data());
          console.log("-----------------------chlgya baiii");
          arr.push(res.data());
          this.setState({notificationScr:arr});
        });
      });
  }
  
  clickOn = () => {
    var box = document.querySelector(".bg-modal2");
    const th = this;
    // Detect all clicks on the document
    document.addEventListener("click", function(event) {
    
    // If user clicks inside the element, do nothing
    if (event.target.closest(".notifi")) return;
    
    // If user clicks outside the element, hide it!
        // box.classList.add("js-is-hidden");
        console.log("clicked");
        th.setState({showNOt: false});
    });
  }
 


  render() {
    const {notificationScr,showNOt} = this.state;
    return (
      <div>

{showNOt &&
        <div className="bg-modal2" onClick={this.clickOn}>
        <div className="modal-contents2">
      {notificationScr.length &&
      notificationScr.map(res => {
        return(
          
        
          <div className="notifi">
            <div>
              <div className="parentNot">
                <div className="lightCir lightCir1">
                  <div className="lightCirb1" />
                </div>
                <div className="lightCir lightCir2">
                  <div className="lightCirb2" />
                </div>
              </div>

              <div className="childNot">
                <div
                  className="lightCir lightCir1"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div
                    className="lightCirb1"
                    style={{ backgroundColor: "transparent" }}
                  >

                    <div className="imgDivNot imgDivNot2" style={{overflow: "hidden"}}>
                        <img src={res.userData.imgList[0]}style={{
                          width:"150%"
                        }}/>
                  </div>
                  </div>

                </div>
                <div
                  className="lightCir lightCir2"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div
                    className="lightCirb2"
                    style={{ backgroundColor: "transparent" }}
                  >
                <div className="imgDivNot imgDivNot2" style={{overflow: "hidden"}}>
                        <img src={res.userData.imgList[0]}style={{
                          width:"150%"
                        }}/>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="notiP">{res.meetUPWithData.nickName}</p>
            <div className="infoDivNoti">
              <p>Duration : {res.userData.duration[0]}</p>
              <p>Location : {res.location.venue.name}</p>
              <p>Time : 18/5/19 - 05:30</p>
            </div>
            <div className="btnDivNoti">
              <button>Direction</button>
              <button>Confirm</button>
            </div>
          </div>
        )
      
    
    })
        
    }
    </div>
     </div>
      }
      
      </div>
    );
  }
}

export default NotificationScreen;
