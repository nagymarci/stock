import React from 'react';
import StockPage from './StockPage.js';
import WatchLists from './WatchLists';
import config from "./config.json";
import Admin from "./Admin"
import './App.css';

function App() {
  return (
    <div>
      <Admin />
      <WatchLists />
      {//<StockPage url={config.baseUrl + "/stocks/calculated"}/>
      }
    </div>
  )
}


export default App;
