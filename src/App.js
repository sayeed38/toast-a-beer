import React, {useEffect, useState} from "react";
import axios from "axios";
import NavBar from "./components/navBar";
import { makeStyles } from "@material-ui/core/styles";
import {Route, Switch} from "react-router-dom";
import Feed from "./components/feed";
import Dashboard from "./components/dashboard";
import SideBar from "./components/SideBar";
import BeerDetails from "./components/beerDetails";
import Error from "./components/error";

const useStyles = makeStyles((theme) => ({
  root : {
    display: "flex"
  }
}));

const URL = "https://api.punkapi.com/v2/beers";
let count = 26;
function App() {
  const classes = useStyles();
  const [beers, setBeers] = useState([]);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    async function getBeers(id){
      const request = await axios.get(`${URL}/${id === undefined ? "" : id}`);
      if(id !== undefined){
        const data = formatData([...request.data]);
        setBeers(beers => [...data, ...beers]);
      }else{
        setBeers(formatData([...request.data]));
      }
      return request;
    }
    getBeers();

    const interval = setInterval(() => {
      getBeers(count++);
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  function formatData(data){
    let arr = [];
    for(let i=0; i<data.length; i++){
      let obj = {};
      obj["id"] = data[i].id;
      obj["name"] = data[i].name;
      obj["image"] = data[i].image_url;
      obj["tagLine"] = data[i].tagline;
      obj["description"] = data[i].description;
      obj["likes"] = 0;
      obj["comments"] = [];
      obj["ingredients"] = data[i].ingredients;
      obj["food_pairing"] = data[i].food_pairing;
      obj["brewer_tips"] = data[i].brewers_tips;
      arr.push(obj);
    }
    return arr;
  }


  const handleDrawerToggle = () => {
    setToggle(!toggle);
  };

  const handleLike = (id) => {
    //let objCopy = {...beers};
    const objCopy = [...beers].map(el => {
      const obj = {...el};
      if(obj.id === id){
        obj.likes++;
      }
      return obj;
    });
    setBeers(objCopy);
  }

  const addComments = (id, input) => {
    if(input === ""){
      return;
    }
    const objCopy = [...beers].map(el => {
      const obj = {...el};
      if(obj.id === id){
        obj.comments.push(input);
      }
      return obj;
    });
    setBeers(objCopy);
  }


  return (
    <>
      <NavBar handleDrawerToggle={handleDrawerToggle}/>
      <div className={classes.root}>
      <SideBar toggle={toggle} handleDrawerToggle={handleDrawerToggle}/>
      <Switch>
        <Route path="/dashboard/:id" component={(props, beer) => <BeerDetails beers ={beers} {...props}/>}/>
        <Route path="/dashboard"><Dashboard beers={beers}/></Route>
        <Route path="/" exact><Feed handleLike={handleLike} addComments={addComments}
        beers={beers}/></Route>
        <Route component={Error}/>
      </Switch>
    </div>
    </>
  );
}

export default App;
