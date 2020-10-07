import React from 'react';
import StockPage from './StockPage.js';
import WatchLists from './WatchLists';
import config from "./config.json";
import './App.css';

function App() {
  return (
    <div>
      <WatchLists />
      <StockPage url={config.baseUrl + "/stocks/calculated"}/>
    </div>
  )
}


export default App;
