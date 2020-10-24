import React from 'react';
import {
  /*BrowserRouter as */Router,
  Switch,
  Route
} from "react-router-dom";
import StockPage from './StockPage.js';
import WatchLists from './views/WatchLists';
import config from "./config.json";
import Admin from "./Admin"
import history from "./history";
import NavBar from "./components/Nav"

import { useAuth0 } from "@auth0/auth0-react";

import './App.css';
import Container from 'react-bootstrap/Container';

function App() {
  const {isLoading, error} = useAuth0();

  if (error) {
    return <div>Error {error.message}</div>
  }

  if (isLoading) {
    //return <div>Loading</div>
  }
  return (
    <Router history={history}>
      <div>
        <NavBar />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Container>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/watchlist">
              <WatchLists />
            </Route>
            <Route path="/">
              <StockPage url={config.baseUrl + "/stocks/calculated"}/>
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  )
}


export default App;
