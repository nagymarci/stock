import React, { useState, useEffect } from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import StockTable from './StockTable';
import { getCalculatedWatchlist } from '../api';
import { Container } from 'react-bootstrap';

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
      <Container>
      {
        stockData &&
        <StockTable stockData={stockData} />
      }
      </Container>
    )

}

export default WatchList;