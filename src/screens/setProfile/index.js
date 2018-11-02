import React, { Component } from "react";
import "./index.css";
import { Upload, Icon, Modal } from "antd";
import "antd/dist/antd.css";
import db from "../../config/firebase";
import * as firebase from "firebase";
import MenuAppBar from '../../components/appBarSetPro';

class SetProfile extends Component {
  constructor() {
    super();  
    this.state = {
      overAll: {},
      pos: 1,
      imageList: [],
      baverages: [],
      duration: [],
      localFile: null,
      imgList : [],
      uploadProcess: false,
      pageName: 'Profile Setup'
    };
    this.uploadTOFireStore = this.uploadTOFireStore.bind(this);
  }

  
  //------------------------------------RENDER()------------------------------------------
  render() {
    const {
      imageList,
      pos,
      overAll,
      nickName,
      contact,
      baverages,
      duration,
      uploadProcess,
      imgList,
      myId,
      myName,
      pageName
    } = this.state;

    return (
      <div>
        <MenuAppBar barName={pageName} />
        {pos == 1 && (
          <div className="setProPos">
            {/* <h3>Set Profile</h3> */}
            <br />
            <input
              type="text"
              className="input"
              placeholder="Enter Nick Name*"
              onChange={e => {
                this.setState({ nickName: e.target.value });
              }}
            /><br />
            <input
              type="number"
              className="input"
              placeholder="Enter Contact*"
              onChange={e => {
                this.setState({ contact: e.target.value });
              }}
            /><br />
            <button
                className="btn2"
              onClick={() => {
                // this.setState({ pos: 2 });
                var oa = overAll;
                oa.nickName = nickName;
                oa.contact = contact;
                this.setState({ overAll: oa, pos: 2,pageName: 'Add Images' });
                console.log(overAll);
              }}
            >
              NEXT
            </button>


          </div>
        )}
        {pos == 2 && (
          <div className="setProPos">
            <input
              // className="input"
              onChange={res => {
                this.showImage(res);
              }}
              type="file"
              id="inputFileButton"
              style={{ display: "none" }}
            />

            <img src="" id="image" />
            {imageList.map(res => {
              return (
                <div
                  style={{ display: "inline-block" }}
                  className="ant-upload ant-upload-select ant-upload-select-picture-card"
                >
                  <div className="imgBaseDiv">
                    <img className="imageSize" src={res.base64} />
                  </div>
                </div>
              );
            })}

            {imageList.length <= 2 && (
              <div
                onClick={() => {
                  this.addImage();
                }}
                style={{ display: "inline-block" }}
              >
                <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
                  <span className="ant-upload">
                    <div>
                      <i className="anticon anticon-plus">
                        <svg
                          viewBox="64 64 896 896"
                          className=""
                          data-icon="plus"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M848 474H550V152h-76v322H176c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h298v322h76V550h298c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
                        </svg>
                      </i>
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  </span>
                </div>
              </div>
            )}
            <br />
            <button
              className="btn2"
              onClick={() => {
                console.log(imageList);
                this.uploadTOFireStore(imageList);

                var oa = overAll;
                // oa.imageList = imageList;
                this.setState({ overAll: oa, pos: 3,
                 pageName: 'Select Beverages'});
                console.log(overAll);
              }}
            >
              NEXT
            </button>
          </div>
        )}
        {pos == 3 && (
          <div className="setProPos fontOfchkBock">
          
            <input type="checkbox" name="baverages" value="cofee" />
             Coffee
            <br />
            <input type="checkbox" name="baverages" value="juice" /> Juice
            <br />
            <input type="checkbox" name="baverages" value="cocktail" /> Cocktail
            <br />
            <button
             className="btn2"
              onClick={() => {
                var bav = document.getElementsByName("baverages");
                console.log(bav.length);
                for (var i = 0; i < bav.length; i++) {
                  if (bav[i].checked == true) {
                    baverages.push(bav[i].value);
                  }
                }
                var oa = overAll;
                oa.baverages = baverages;
                this.setState({ 
                  overAll: oa,
                   pos: 4 ,
                   pageName: 'Set Meeting Duration'
                  });
                console.log(overAll);
              }}
            >
              NEXT
            </button>
            <hr />
          </div>
        )}
        {pos == 4 && (
          <div className="setProPos fontOfchkBock">
          
            <input type="checkbox" name="duration" value="20Min" /> 20 min
            <br />
            <input type="checkbox" name="duration" value="60Min" /> 60 min
            <br />
            <input type="checkbox" name="duration" value="120Min" /> 120 min
            <br />
           {uploadProcess && <button className="btn2"
              onClick={() => {
                // this.setState({ pos: 4 });
                var dur = document.getElementsByName("duration");
                console.log(dur.length);
                for (var i = 0; i < dur.length; i++) {
                  if (dur[i].checked == true) {
                    // console.log(dur[i].value);
                    duration.push(dur[i].value);
                  }
                }
                var oa = overAll;
                oa.duration = duration;
                oa.imgList = imgList;
                this.setState({ overAll: oa, pos: 4 });
                console.log(overAll);
                this.addDataToDb();
              }}
            >
              NEXT
            </button>}
            {!uploadProcess && <button
             className="btn2"
              onClick={() => {
                alert("Let image uploading be complete first");
              }}
            >
              uploading...
            </button>}
          </div>
        )}
        <hr />
        
      </div>
    );
  }

  //------------------------------------FUNCTIONS------------------------------------------
  
  addDataToDb(){
    const { overAll,myId } = this.state;
    const th = this;
    console.log(overAll);
    db.collection('user').doc(myId).set(overAll,{merge: true}).then(res => {
      console.log('added to db');
      db.collection('user').doc(myId).get().then(res => {
        console.log(res.data());
        localStorage.setItem('meetingAppUserData',JSON.stringify(res.data()));
      })
      th.props.history.push('/setLocation');
    })
  }
  
  componentDidMount(){
    const { myId } = this.state;
    const th = this;
    if(!localStorage.getItem('meetingAppUserId') || !localStorage.getItem('meetingAppUserName')){
    this.props.history.push(`/`);
    }
    this.setState({myId: localStorage.getItem('meetingAppUserId')});
    this.setState({myName:localStorage.getItem('meetingAppUserName')});

    if(localStorage.getItem('meetingAppUserId') && localStorage.getItem('meetingAppUserName') && localStorage.getItem('meetingAppUserData')){
      var data = JSON.parse(localStorage.getItem('meetingAppUserData'));
      if(data.imgList && data.nickName){
        this.props.history.replace('/dashboard');
      }
    }
    
    // if(localStorage.getItem('meetingAppUserId') || localStorage.getItem('meetingAppUserName')){
    //  var id = localStorage.getItem('meetingAppUserId');
    //   db.collection("user").doc(id).get().then(res => {
    //     console.log(res.data().imgList);
    //     console.log(res.data().nickName);
    //     if(res.data().imgList || res.data().nickName){
    //       th.props.history.push('/dashboard');
    //     }
    //   })
    
  }

  showImage(res) {
    const { imageList } = this.state;
    var reader = new FileReader();
    var th = this;
    reader.onload = function() {
      // console.log("dddd ---- "+document.getElementById('inputFileButton').value);
      var obj = {
        url: document.getElementById("inputFileButton").files[0],
        base64: reader.result
      };

      //  var output = document.getElementById('image');
      //  output.src = reader.result;
      imageList.push(obj);
      th.setState({ imageList });
      console.log(imageList);
    };
    reader.readAsDataURL(res.target.files[0]);
  }
  uploadTOFireStore(resp){
    console.log(resp);
    const { myId } = this.state;
    console.log(myId);
    const th = this;
const arr = [];
let uploadPromiseImgs = resp.map(function (pics, index) {
  var pic = pics.url;
    var fbStorage = firebase.storage();
        return new Promise(function (resolve, reject) {
            var n = new Date().getTime();
            debugger;
            var storageRef = fbStorage.ref('images/' + myId + '/'+ n + pic.name);
             var uploadTask = storageRef.put(pic);
            uploadTask.on('state_changed', null, null, function () {
                var downloadUrl = storageRef.getDownloadURL().then(url => {
                  arr.push(url);
                  console.log(url);
                                })
                resolve(downloadUrl);
            })
        })
    });
    Promise.all(uploadPromiseImgs).then(function (data) {
      console.log(arr);
      th.setState({imgList : arr,uploadProcess: true});
    }).catch(function (err) {
            console.log(err)
        });
  }

  addImage() {
    document.getElementById("inputFileButton").click();
  }
}

export default SetProfile;
