import React, { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import {Stock} from '../StockPage';
import config from "../config.json";
import Table from 'react-bootstrap/Table';

const WatchList = (props) => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  if (isLoading) {
    getAccessTokenSilently({
      audience: config.apiAudience,
      scope: "write:profiles"
    }).then((token) => {
      fetch(config.baseUrl + "/watchlist/" + props.id + "/calculated", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => Promise.all([res.status, res.json()]))
      .then(([code, stockInfo]) => {
        if (code === 200) {
          setStockData(stockInfo);
          setFailed(false)
          setLoading(false)
        } else {
          setFailed(true)
          setLoading(false)
        }
      })
    })
  }

  if (isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    if (isFailed) {
      return (
        <div>Error during query stockpage!</div>
      )
    }

    if (stockData === undefined || stockData === null)
    {
      return (
        <div>Server returned no data</div>
      )
    }

    return (
      <Table bordered>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Dividend Yield</th>
          </tr>
        </thead>
        <tbody>
        {stockData.map((stock) => {
          return (
            <Stock key={stock.ticker} stockData={stock}/>
          )
        })}
        </tbody>
      </Table>
    )

}

export default WatchList;