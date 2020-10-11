import React from 'react';
import {
  /*BrowserRouter as */Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StockPage from './StockPage.js';
import WatchLists from './WatchLists';
import config from "./config.json";
import Admin from "./Admin"
import history from "./history";

import { useAuth0 } from "@auth0/auth0-react";

import './App.css';

function App() {
  const {isLoading, error, isAuthenticated, logout} = useAuth0();

  const logoutHandler = () =>
    logout({
      returnTo: window.location.origin,
    });

  if (error) {
    return <div>Error {error.message}</div>
  }

  if (isLoading) {
    //return <div>Loading</div>
  }
  return (
    <Router history={history}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">WatchLists</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            {
              isAuthenticated && 
              (
                <li>
                <button onClick={() => logoutHandler()}>Logout</button>
                </li>)
            }
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
      </div>
    </Router>
  )
}


export default App;
