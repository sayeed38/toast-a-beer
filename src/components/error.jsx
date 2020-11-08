import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  alertStyle: {
    margin: 20,
  },
}));

export default function Error() {
  const classes = useStyles();
  return (
    <Alert severity="error" className={classes.alertStyle}>
      404 Not Found!
    </Alert>
  );
}
