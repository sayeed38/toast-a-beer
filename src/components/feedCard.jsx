import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Collapse,
  Divider,
  Button,
} from "@material-ui/core";
import "./../styles.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    margin: "25px 100px 5px 100px",
    width: "65%",
  },
  cardContent: {
    display: "flex",
    height: "175px",
  },
  details: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  poster: {
    margin: "5px",
    objectFit: "cover",
    width: "45px",
    minHeight: "100px",
    borderRadius: "5px",
    // marginRight: "10px",
    //width: "25%",
  },
  likeIcon: {
    marginBottom: "5px",
  },
  commentIcon: {
    marginBottom: "5px",
  },
  divider: {
    margin: "10px 0px",
  },
  input: {
    padding: "12px 10px",
    width: "45%",
  },
  margin: {
    margin: theme.spacing(1),
  },
  comments: {
    margin: "0px 10px",
  },
}));

export default function FeedCard(props) {
  const classes = useStyles();
  const {
    id,
    name,
    image,
    comments,
    likes,
    tagLine,
    description,
    handleLike,
    addComments,
  } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [input, setInput] = React.useState("");
  const handleClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleComments = () => {
    addComments(id, input);
    setInput("");
  };

  return (
    <Card key={id} className={classes.root}>
      <div className={classes.cardContent}>
        <CardMedia className={classes.poster} image={image} title={name} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {tagLine}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {description.substring(0, 200) + "...."}
            </Typography>
            <div>
              <IconButton
                className={classes.likeIcon}
                aria-label="like"
                onClick={() => handleLike(id)}
              >
                <FavoriteBorderIcon fontSize="small" />
                <Typography variant="body2" color="textSecondary">
                  {likes === 0 ? null : likes}
                </Typography>
              </IconButton>
              <IconButton
                className={classes.commentIcon}
                aria-label="like"
                onClick={handleClick}
              >
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
            </div>
          </CardContent>
        </div>
      </div>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider className={classes.divider} />
        <Typography variant="h6" ml={10} color="textPrimary" lm={5}>
          Comments:
        </Typography>
        <div>
          <input
            type="text"
            value={input}
            className={`${classes.margin} ${classes.input}`}
            onChange={(event) => handleChange(event)}
          />
          <Button variant="contained" color="primary" onClick={handleComments}>
            Save
          </Button>
        </div>
        {comments.map((comment) => (
          <>
            <Divider className={classes.divider} />
            <Typography className={classes.comments}>{comment}</Typography>
          </>
        ))}
      </Collapse>
    </Card>
  );
}
