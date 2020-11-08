import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import GridItem from "./gridItem";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "15px",
  },
  control: {
    padding: theme.spacing(2),
  },
  input: {
    padding: "12px 10px",
    margin: "10px",
    justifyContent: "center",
    width: "45%",
  },
  filter: {
    margin: "10px",
    padding: "12px 10px",
    width: "15%",
  },
}));

function Dashboard(props) {
  const history = useHistory();
  const classes = useStyles();
  const { beers } = props;
  const [searchData, setSearchData] = useState("");
  const [selectedValue, setSelectedValue] = useState("All");

  const handleChange = (event) => {
    console.log(event.target.value);
    setSearchData(event.target.value);
  };

  const handleClick = (id) => {
    console.log(history);
    history.push(history.location.pathname + "/" + id);
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
    if (event.target.value === "Sort By Likes") {
      beers.sort((a, b) => b.likes - a.likes);
    }
  };
  return (
    <div className={classes.root}>
      <div>
        <input
          type="text"
          value={searchData}
          placeholder="Search...."
          className={`${classes.margin} ${classes.input}`}
          onChange={(event) => handleChange(event)}
        />
        <label htmlFor="filter">Filter:</label>
        <select
          name="filter"
          val={selectedValue}
          className={classes.filter}
          onChange={(event) => handleSelectChange(event)}
        >
          <option value="All">All</option>
          <option value="Sort By Likes">Sort By Likes</option>
        </select>
      </div>
      <Grid container spacing={1}>
        {beers
          .filter((item) =>
            item.name.toLowerCase().includes(searchData.toLowerCase())
          )
          .map((beer) => (
            <Grid item xs={12} sm={4} md={3} key={beer.id}>
              <GridItem
                key={beer.id}
                id={beer.id}
                name={beer.name}
                handleClick={handleClick}
                description={beer.description}
                tagLine={beer.tagLine}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Dashboard;
