import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import FormCards from "./components/cards/FormCard";
import Home from "./components/home/Home";
import MenuVG from "./components/menu/MenuVG";
import ClanList from "./data/ClanList";
import CollectionList from "./data/CollectionList";

class App extends Component {
  constructor(){
    super();
    this._clanList = new ClanList();
    this._colectionList = new CollectionList();
  }


  render() {
    return(
      <Router>
        <MenuVG/>
        <Switch>
          <Route path="/card/new">
            <FormCards clanList={this._clanList} collectionList={this._colectionList} />) 
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;

