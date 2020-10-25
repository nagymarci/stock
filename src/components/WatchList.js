import React, { useState, useEffect } from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import {Stock} from '../StockPage';
import Table from 'react-bootstrap/Table';
import { getCalculatedWatchlist } from '../api';

const WatchList = (props) => {

  const [isFailed, setFailed] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isLoading) {
      getCalculatedWatchlist(getAccessTokenSilently, props.id)
      .then(([code, stockInfo]) => {
        if (code === 200) {
          setStockData(stockInfo);
          setFailed(false)
          setLoading(false)
        } else {
          setFailed(true)
          setLoading(false)
        }
      });
    }
  }, [isLoading, getAccessTokenSilently, props.id]);  

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