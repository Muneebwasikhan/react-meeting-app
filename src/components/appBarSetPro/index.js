import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {  Avatar } from "@material-ui/core";

import * as firebase from "firebase";
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {withRouter} from 'react-router-dom';


import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    width: 60,
    height: 60,
    top: 60,
    left: 10
  },
  drawerText: {
    paddingLeft: '10px',
    // backgroundColor: '#e0f2f111',
    color: "white"
  }
};

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
    left: false,
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      left: open,
    });
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  sideMenu = () => {
    console.log('sid menu');
  }

  editPro = () => {
    console.log(this.props);
    this.props.history.push("/editProfile");
  }
  logOut=()=>{
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
  componentDidMount(){
    if(localStorage.getItem("meetingAppUserData")){
      this.setState({myData: JSON.parse(localStorage.getItem("meetingAppUserData"))});
    }
  }
  render() {
    const { classes } = this.props;
    const { auth, anchorEl,myData } = this.state;
    const open = Boolean(anchorEl);
    const {barName} = this.props;
    console.log(this.props);


    const sideList = (
      // <div className={classes.list}>
      //   <List>
      //   <ListItem button key="Dashboard">
      //         <ListItemIcon><InboxIcon /></ListItemIcon>
      //         <ListItemText primary="Dashboard" />
      //       </ListItem>
      //   </List>
      //   <Divider />
      //   <List>
      //   <ListItem button key="Logout">
      //         <ListItemIcon><MailIcon /></ListItemIcon>
      //         <ListItemText primary="Logout" />
      //       </ListItem>
      //   </List>
      // </div>
      <div>
      {myData && <div className={classes.list}>
        <div style={{ width: "100%", height: "200px", backgroundImage: `url(https://img3.goodfon.ru/wallpaper/big/3/2f/poligony-linii-grani-ugol.jpg)`, backgroundRepeat: 'no-repeat', backgroundSize: "cover" }}>
          <span>
            <Avatar src={myData.imgList[0]} className={classes.avatar} alt="Profile Picture" />
            <br />
            <br />
            <br />
            <Typography className={classes.drawerText} variant='overline'>{myData.name}</Typography>
            <Typography className={classes.drawerText} variant='body2'>{myData.email}</Typography>
          </span>
        </div>
    <List onClick={() => {this.props.history.push("/dashboard")}}>
  <ListItem button key="Dashboard">
        <ListItemIcon><InboxIcon /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
  </List>
  <Divider />
  
  <List onClick={this.editPro}>
  <ListItem button key="Edit_Profile">
        <ListItemIcon><MailIcon /></ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItem>
  </List>
  <List>
  <ListItem button key="Logout" onClick={this.logOut}>
        <ListItemIcon><MailIcon /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
  </List>
      </div>}
      </div>
    );


    return (
      <div className={classes.root}>
        
         {/* <SwipeableTemporaryDrawer /> */}
         
        <AppBar position="static">
          <Toolbar>
          <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
        <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', true)}
            onKeyDown={this.toggleDrawer('left', true)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
            <IconButton 
             onClick={this.toggleDrawer('left', true)}
            className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {barName}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.editPro}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MenuAppBar));