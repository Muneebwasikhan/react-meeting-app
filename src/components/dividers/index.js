import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import TextButtons from '../button';
import db from '../../config/firebase';
import TimelineItem from 'antd/lib/timeline/TimelineItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});


function changeStatus(meetUPWithId,userId,time,status){
  console.log(meetUPWithId);
  console.log(userId);
  console.log(status);
  db.collection('meetUps').where('meetUPWithId', "==", meetUPWithId).where('userId', "==", userId).where('time', "==", time).get().then(res => {
    res.forEach(res => {
      console.log(res.id);
      console.log(res.data().status);

      db.collection('meetUps').doc(res.id).set({status: status},{merge: true}).then(res => {
        console.log(res);
      })
    })
  })
}



function InsetDividers(props) {
  const { classes } = props;
  const { show } = props;
  const { docOf } = props;
  // const { changeStatus } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <img src={show.userData.imgList[0]} style={{width: "100%"}} />
          </Avatar>
          <ListItemText primary={show.userData.name}  secondary={new Date(show.time.nanoseconds).toLocaleTimeString() +" - " + new Date(show.time.nanoseconds).toLocaleDateString() + ' / - at ' + show.location.venue.name +"-"+ show.location.venue.location.address} />
          {docOf.status == "Pending" && 
          <span onClick={() => {changeStatus(show.meetUPWithId,show.userId,show.time,'Accepted')}}><TextButtons btnArgs={{text: "Accept",type: "primary"}} /></span>
        }
        {docOf.status == "Pending" && 
          <span onClick={() => {changeStatus(show.meetUPWithId,show.userId,show.time,'Canceled')}}><TextButtons btnArgs={{text: "Cancel",type: "secondary"}} /></span>
          }
          {docOf.status == "Accepted" && 
          <span onClick={() => {changeStatus(show.meetUPWithId,show.userId,show.time,'Done')}}><TextButtons btnArgs={{text: "Done",type: "secondary"}} /></span>
          }

        </ListItem>
        <li>
          <Divider inset />
        </li>
      </List>
    </div>
  );
}

InsetDividers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetDividers);