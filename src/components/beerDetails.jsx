import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  imgMain: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 50px",
  },
  media: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    borderRadius: 5,
    marginLeft: 1,
    marginTop: 1,
    objectFit: "cover",
    height: "500px",
    maxWidth: "380px",
    width: "320px",
  },
  rating: {
    display: "flex",
    alignItems: "center",
  },
  starIcon: {
    color: "#fc0",
  },
  content: {
    padding: 20,
  },
}));

export default function BeerDetails(props) {
  const classes = useStyles();
  const { beers } = props;
  const beer = beers.filter(
    (beer) => beer.id === parseInt(props.match.params.id)
  );
  const obj = beer[0]?.ingredients;
  const ingredients = {};
  for (let key in obj) {
    if (typeof obj[key] !== "object") {
      ingredients[key] = obj[key];
    } else {
      ingredients[key] = [];
      for (let i = 0; i < obj[key].length; i++) {
        ingredients[key].push(obj[key][i].name);
      }
    }
  }
  return (
    <>
      {beer.map((beer) => (
        <Paper className={classes.root} elevation={0}>
          <div className={classes.imgMain}>
            <span
              height="500"
              className={classes.media}
              style={{ backgroundImage: "url(" + beer.image + ")" }}
            ></span>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h2" component="h2">
              <Box fontWeight="fontWeightBold">{beer.name}</Box>
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {beer.tagLine}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="div">
              {beer.dictionary}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              <Box mt={3}>{beer.description}</Box>
            </Typography>
            <Typography variant="body2" component="div">
              <Box mt={3}>Likes: {beer.likes}</Box>
            </Typography>
            <Typography variant="h6" ml={10} color="textPrimary" lm={5}>
              <Box mt={3}>Food Pairing:</Box>
            </Typography>
            <ul>
              {beer.food_pairing.map((pair, index) => (
                <li key={pair + "" + index}>
                  <Typography variant="body2" component="div">
                    {pair}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography variant="h6" ml={10} color="textPrimary" lm={5}>
              <Box mt={3}>Ingredients:</Box>
            </Typography>

            {Object.keys(ingredients).map((key) => (
              <>
                <Typography key={key} variant="body1" component="div">
                  {key.charAt(0).toUpperCase() + key.substring(1, key.length)}
                </Typography>
                <ul>
                  {typeof ingredients[key] === "object" ? (
                    ingredients[key].map((item, index) => (
                      <li key={item + "" + index}>
                        <Typography variant="body2" component="div">
                          {item}
                        </Typography>
                      </li>
                    ))
                  ) : (
                    <li>
                      <Typography variant="body2" component="div">
                        {ingredients[key]}
                      </Typography>
                    </li>
                  )}
                </ul>
              </>
            ))}
          </CardContent>
        </Paper>
      ))}
    </>
  );
}
