import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InsetDividers2 from "../dividers2";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

function SimpleExpansionPanel2(props) {
  const { classes } = props;
  console.log("props********************");
  console.log(props);
  const { meetUpData } = props;
  console.log(meetUpData);
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Pending</Typography>
        </ExpansionPanelSummary>
        {meetUpData.map(res => {
          if (res.status == "Pending") {
            return (
              <div style={{ width: "100%" }}>
                <InsetDividers2 show={res} docOf={{ status: "Pending" }} />
                {/* <h1>{res.userData.name}</h1> */}
                <br />
              </div>
            );
          }
        })}
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Canceled</Typography>
        </ExpansionPanelSummary>

        {meetUpData.map(res => {
          if (res.status == "Canceled") {
            return (
              <div style={{ width: "100%" }}>
                <InsetDividers2 show={res} docOf={{ status: "Canceled" }} />
                {/* <h1>{res.userData.name}</h1> */}
              </div>
            );
          }
        })}
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Accepted</Typography>
        </ExpansionPanelSummary>
        {meetUpData.map(res => {
          if (res.status == "Accepted") {
            return (
              <div style={{ width: "100%" }}>
                <InsetDividers2 show={res} docOf={{ status: "Accepted" }} />
                {/* <h1>{res.userData.name}</h1> */}
              </div>
            );
          }
        })}
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Done</Typography>
        </ExpansionPanelSummary>
        {meetUpData.map(res => {
          if (res.status == "Done") {
            return (
              <div style={{ width: "100%" }}>
                <InsetDividers2 show={res} docOf={{ status: "Done" }} />
                {/* <h1>{res.userData.name}</h1> */}
              </div>
            );
          }
        })}
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel2);
