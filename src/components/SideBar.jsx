import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
}));
function SideBar(props) {
  const { toggle, handleDrawerToggle, history } = props;
  const classes = useStyles();
  return (
    <nav aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          //container={container}
          variant="temporary"
          open={toggle}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <List>
            <ListItem button key="Feeds" onClick={() => history.push("/")}>
              <ListItemText primary="Feeds" />
            </ListItem>
            <ListItem
              button
              key="Dashboard"
              onClick={() => history.push("/dashboard")}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default withRouter(SideBar);
