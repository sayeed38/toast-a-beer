import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "10px",
    height: 140,
    transition: "transform 400ms",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.08)",
      opacity: 1,
    },
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function GridItem(props) {
  const { id, name, description, handleClick, tagLine } = props;
  const classes = useStyles();
  return (
    <Paper onClick={() => handleClick(id)} className={classes.paper}>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="body1">{tagLine}</Typography>
      <Typography variant="body2">
        {description.slice(0, 80) + "...."}
      </Typography>
    </Paper>
  );
}

export default GridItem;
