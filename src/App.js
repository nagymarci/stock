import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import StockPage from './StockPage.js';
import WatchLists from './WatchLists';
import config from "./config.json";
import Admin from "./Admin"
import './App.css';

function App() {
  return (
    <Router>
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
